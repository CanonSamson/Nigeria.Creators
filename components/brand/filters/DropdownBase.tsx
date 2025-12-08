import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type DropdownBaseProps = {
  label: string
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

export default function DropdownBase ({ label, children, onOpenChange }: DropdownBaseProps) {
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
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open, onOpenChange])

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
        className='inline-flex items-center gap-2 px-3 py-2 rounded-[10px] border border-[#EAEAEA] bg-white text-[13px] md:text-[14px] text-black hover:bg-[#F8F8F8]'
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        {label}
        <ChevronDown className='w-4 h-4' />
      </button>
      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role='menu'
          aria-label={`${label} options`}
          className='absolute mt-2 min-w-[280px] bg-white border border-[#EFEFEF] shadow-lg rounded-[12px] p-3 z-30'
        >
          {children}
        </div>
      )}
    </div>
  )
}
