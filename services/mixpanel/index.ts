import mixpanel from 'mixpanel-browser'

export class MixpanelService {
  track (eventName: string, data: any) {
    try {
      if (typeof window !== 'undefined') {
        mixpanel.track(eventName, {
          ...data
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  private handlers: {
    click?: (e: MouseEvent) => void
    input?: (e: Event) => void
    submit?: (e: Event) => void
    scroll?: () => void
    popstate?: () => void
  } = {}

  private rageClicks: { t: number; x: number; y: number }[] = []
  private lastScrollCheckpoint: number | null = null
  private lastUrl: string | null = null

  startAutocapture (opts?: {
    click?: boolean
    dead_click?: boolean
    rage_click?: boolean
    input?: boolean
    pageview?: 'full-url' | 'path' | 'path+query' | false
    scroll?: boolean
    submit?: boolean
    capture_text_content?: boolean
    capture_extra_attrs?: string[]
    scroll_depth_percent_checkpoints?: number[]
    scroll_capture_all?: boolean
    block_url_regexes?: (RegExp | string)[]
    allow_url_regexes?: (RegExp | string)[]
    block_selectors?: string[]
    allow_selectors?: string[]
    block_attrs?: string[]
    allow_element_callback?: (el: Element, ev: Event) => boolean
    block_element_callback?: (el: Element, ev: Event) => boolean
    dead_click_options?: { timeout_ms?: number }
    rage_click_options?: {
      click_count?: number
      time_ms?: number
      radius_px?: number
    }
  }) {
    if (typeof window === 'undefined') return
    const o = {
      click: true,
      dead_click: true,
      rage_click: true,
      input: true,
      pageview: 'full-url' as const,
      scroll: true,
      submit: true,
      capture_text_content: false,
      capture_extra_attrs: [] as string[],
      scroll_depth_percent_checkpoints: [25, 50, 75, 100] as number[],
      scroll_capture_all: false,
      block_url_regexes: [] as (RegExp | string)[],
      allow_url_regexes: [] as (RegExp | string)[],
      block_selectors: [] as string[],
      allow_selectors: [] as string[],
      block_attrs: [] as string[],
      allow_element_callback: undefined,
      block_element_callback: undefined,
      dead_click_options: { timeout_ms: 500 },
      rage_click_options: { click_count: 3, time_ms: 1000, radius_px: 30 },
      ...(opts || {})
    }

    const toRegex = (r: RegExp | string) =>
      r instanceof RegExp ? r : new RegExp(r)
    const urlAllowed = () => {
      const href = window.location.href
      const blocks = o.block_url_regexes.map(toRegex)
      if (blocks.some(r => r.test(href))) return false
      const allows = o.allow_url_regexes.map(toRegex)
      if (allows.length && !allows.some(r => r.test(href))) return false
      return true
    }
    const matchesSelectors = (el: Element, sels: string[]) =>
      sels.some(s => {
        try {
          return el.matches(s)
        } catch {
          return false
        }
      })
    const shouldTrack = (el: Element, ev: Event) => {
      if (!urlAllowed()) return false
      if (o.block_selectors.length && matchesSelectors(el, o.block_selectors))
        return false
      if (o.allow_selectors.length && !matchesSelectors(el, o.allow_selectors))
        return false
      if (o.block_element_callback && o.block_element_callback(el, ev))
        return false
      if (o.allow_element_callback) return !!o.allow_element_callback(el, ev)
      return true
    }

    const elemInfo = (el: Element) => {
      const info: Record<string, unknown> = {
        tag: el.tagName.toLowerCase(),
        id: (el as HTMLElement).id || null,
        classes: (el as HTMLElement).className || null,
        name: el.getAttribute('name'),
        role: el.getAttribute('role')
      }
      if (o.capture_text_content) {
        const t = (el as HTMLElement).innerText || el.textContent || ''
        info.text = (t || '').trim().slice(0, 500)
      }
      if (o.capture_extra_attrs.length) {
        const attrs: Record<string, string | null> = {}
        for (const k of o.capture_extra_attrs) {
          if (o.block_attrs.includes(k)) continue
          attrs[k] = el.getAttribute(k)
        }
        if (Object.keys(attrs).length) info.attrs = attrs
      }
      return info
    }

    const pageUrl = () => {
      const { pathname, search, href } = window.location
      if (o.pageview === false) return null
      if (o.pageview === 'full-url') return href
      if (o.pageview === 'path+query') return pathname + search
      if (o.pageview === 'path') return pathname
      return href
    }

    if (o.pageview) {
      this.lastUrl = pageUrl()
      if (this.lastUrl) this.track('Pageview', { url: this.lastUrl })
      const notify = () => {
        const u = pageUrl()
        if (u && u !== this.lastUrl) {
          this.lastUrl = u
          this.track('Pageview', { url: u })
        }
      }
      this.handlers.popstate = notify
      window.addEventListener('popstate', notify)
      window.addEventListener('hashchange', notify)
    }

    if (o.scroll) {
      const onScroll = () => {
        const doc = document.documentElement
        const max = Math.max(1, doc.scrollHeight - doc.clientHeight)
        const pct = Math.min(
          100,
          Math.max(0, Math.round((doc.scrollTop / max) * 100))
        )
        if (o.scroll_capture_all) {
          this.track('Page Scroll', { percent: pct })
          return
        }
        const cps = [...o.scroll_depth_percent_checkpoints].sort(
          (a, b) => a - b
        )
        const next = cps.find(
          c =>
            pct >= c &&
            (this.lastScrollCheckpoint === null ||
              c > this.lastScrollCheckpoint)
        )
        if (typeof next === 'number') {
          this.lastScrollCheckpoint = next
          this.track('Page Scroll', { percent: next })
        }
      }
      this.handlers.scroll = onScroll
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    if (o.click || o.dead_click || o.rage_click) {
      const onClick = (e: MouseEvent) => {
        const el = e.target as Element
        if (!el || !shouldTrack(el, e)) return
        if (o.click)
          this.track('Click', { url: window.location.href, ...elemInfo(el) })
        if (o.dead_click) {
          const beforeTop = document.documentElement.scrollTop
          const beforeActive = document.activeElement
          const beforeUrl = window.location.href
          setTimeout(() => {
            const changed =
              window.location.href !== beforeUrl ||
              Math.abs(document.documentElement.scrollTop - beforeTop) > 2 ||
              document.activeElement !== beforeActive
            if (!changed)
              this.track('Dead Click', {
                url: window.location.href,
                ...elemInfo(el)
              })
          }, o.dead_click_options.timeout_ms || 500)
        }
        if (o.rage_click) {
          const now = Date.now()
          const x = e.clientX
          const y = e.clientY
          this.rageClicks = this.rageClicks.filter(
            c => now - c.t <= (o.rage_click_options.time_ms || 1000)
          )
          this.rageClicks.push({ t: now, x, y })
          const near = (
            a: { x: number; y: number },
            b: { x: number; y: number }
          ) =>
            Math.hypot(a.x - b.x, a.y - b.y) <=
            (o.rage_click_options.radius_px || 30)
          const count = this.rageClicks.reduce(
            (acc, c) => acc + (near(c, { x, y }) ? 1 : 0),
            0
          )
          if (count >= (o.rage_click_options.click_count || 3)) {
            this.rageClicks = []
            this.track('Rage Click', {
              url: window.location.href,
              ...elemInfo(el)
            })
          }
        }
      }
      this.handlers.click = onClick
      document.addEventListener('click', onClick, true)
    }

    if (o.input) {
      const onInput = (e: Event) => {
        const el = e.target as Element
        if (!el || !shouldTrack(el, e)) return
        this.track('Input', { url: window.location.href, ...elemInfo(el) })
      }
      this.handlers.input = onInput
      document.addEventListener('input', onInput, true)
    }

    if (o.submit) {
      const onSubmit = (e: Event) => {
        const el = e.target as Element
        if (!el || !shouldTrack(el, e)) return
        this.track('Submit', { url: window.location.href, ...elemInfo(el) })
      }
      this.handlers.submit = onSubmit
      document.addEventListener('submit', onSubmit, true)
    }
  }

  stopAutocapture () {
    if (typeof window === 'undefined') return
    if (this.handlers.click)
      document.removeEventListener('click', this.handlers.click, true)
    if (this.handlers.input)
      document.removeEventListener('input', this.handlers.input, true)
    if (this.handlers.submit)
      document.removeEventListener('submit', this.handlers.submit, true)
    if (this.handlers.scroll)
      window.removeEventListener('scroll', this.handlers.scroll)
    if (this.handlers.popstate) {
      window.removeEventListener('popstate', this.handlers.popstate)
      window.removeEventListener('hashchange', this.handlers.popstate)
    }
    this.handlers = {}
    this.lastUrl = null
    this.lastScrollCheckpoint = null
    this.rageClicks = []
  }
}

export const mixpanelService = new MixpanelService()
