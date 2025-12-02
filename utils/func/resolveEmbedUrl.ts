export 
  const resolveEmbedUrl = (url: string): string | null => {
    if (!url) return null
    const u = url.trim()
    try {
      const parsed = new URL(u)
      const host = parsed.hostname.toLowerCase()
      if (host.includes('tiktok.com')) {
        const m = u.match(/\/video\/(\d+)/)
        const id = m?.[1]
        if (id) return `https://www.tiktok.com/embed/v2/video/${id}`
      }
      if (host.includes('youtube.com')) {
        const id = parsed.searchParams.get('v')
        if (id) return `https://www.youtube.com/embed/${id}`
      }
      if (host.includes('youtu.be')) {
        const id = parsed.pathname.split('/').filter(Boolean)[0]
        if (id) return `https://www.youtube.com/embed/${id}`
      }
      if (host.includes('instagram.com')) {
        const parts = parsed.pathname.split('/').filter(Boolean)
        const type = parts[0]
        const code = parts[1]
        if ((type === 'p' || type === 'reel') && code) {
          return `https://www.instagram.com/${type}/${code}/embed`
        }
      }
      return u
    } catch {
      return u
    }
  }