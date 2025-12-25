export const formatAmount = (v?: string) => {
  const n = Number(v || '')
  if (!Number.isFinite(n) || n <= 0) return ''
  return `₦${n.toLocaleString('en-NG')}`
}

export const getPlatform = (
  url: string
): 'tiktok' | 'instagram' | 'youtube' | 'other' => {
  if (!url) return 'other'
  const u = url.trim()
  try {
    const parsed = new URL(u)
    const host = parsed.hostname.toLowerCase()
    if (host.includes('tiktok.com')) return 'tiktok'
    if (host.includes('instagram.com')) return 'instagram'
    if (host.includes('youtube.com') || host.includes('youtu.be'))
      return 'youtube'
    return 'other'
  } catch {
    return 'other'
  }
}
