import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type DropdownBaseProps = {
  label: string
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
  closeOnChildSubmit?: boolean
  keepMounted?: boolean
}

export default function DropdownBase ({ label, children, onOpenChange, closeOnChildSubmit = false, keepMounted = false }: DropdownBaseProps) {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!open) return
      const t = e.target as Node
      if (panelRef.current && panelRef.current.contains(t)) return
      if (btnRef.current && btnRef.current.contains(t)) return
      setOpen(false)
      onOpenChange?.(false)
    }
    document.addEventListener('mousedown', onDocClick)
    const panel = panelRef.current
    const onSubmit = () => {
      if (!closeOnChildSubmit) return
      if (!open) return
      setOpen(false)
      onOpenChange?.(false)
    }
    if (panel && closeOnChildSubmit) {
      panel.addEventListener('submit', onSubmit)
    }
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      if (panel && closeOnChildSubmit) {
        panel.removeEventListener('submit', onSubmit)
      }
    }
  }, [open, onOpenChange, closeOnChildSubmit])

  const toggle = () => {
    const next = !open
    setOpen(next)
    onOpenChange?.(next)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
    if (e.key === 'Escape') {
      setOpen(false)
      onOpenChange?.(false)
    }
    if ((e.key === 'ArrowDown' || e.key === 'Down') && open) {
      const first = panelRef.current?.querySelector<HTMLElement>('[data-focusable="true"]')
      first?.focus()
    }
  }

  const panelId = `${label.replace(/\s+/g, '-')}-panel`

  return (
    <div className='relative inline-block'>
      <button
        ref={btnRef}
        type='button'
        aria-haspopup='menu'
        aria-expanded={open}
        aria-controls={panelId}
        className='inline-flex h-[45px] md:h-[45px] items-center gap-2 px-3 py-2 rounded-[12px] md:rounded-[16px] border border-[#EAEAEA] bg-white text-[13px] md:text-[14px] text-black hover:bg-[#F8F8F8]'
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        {label}
        <ChevronDown className='w-4 h-4' />
      </button>
      {keepMounted ? (
        <div
          ref={panelRef}
          id={panelId}
          role='menu'
          aria-label={`${label} options`}
          aria-hidden={!open}
          className={`absolute mt-2 min-w-[280px] bg-white border border-[#EFEFEF] shadow-lg rounded-[12px] p-3 z-30 ${open ? '' : 'hidden'}`}
        >
          {children}
        </div>
      ) : (
        open && (
          <div
            ref={panelRef}
            id={panelId}
            role='menu'
            aria-label={`${label} options`}
            className='absolute mt-2 min-w-[280px] bg-white border border-[#EFEFEF] shadow-lg rounded-[12px] p-3 z-30'
          >
            {children}
          </div>
        )
      )}
    </div>
  )
}
