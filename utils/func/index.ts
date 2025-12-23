export   const formatAmount = (v?: string) => {
    const n = Number(v || '')
    if (!Number.isFinite(n) || n <= 0) return ''
    return `₦${n.toLocaleString('en-NG')}`
  }