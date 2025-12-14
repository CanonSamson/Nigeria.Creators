import { cn } from '@/lib/utils'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import useAppStore from '@/store/useAppStore'
import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function CategoryTabs () {
  const currentUser = useContextSelector(UserContext, s => s.currentUser)
  const filters = useAppStore(s => s.brandFilters)
  const toggle = useAppStore(s => s.toggleBrandCategory)
  const clear = useAppStore(s => s.clearBrandFilters)
  const loadDefaults = useAppStore(s => s.loadBrandDefaultCategories)

  useEffect(() => {
    const id = currentUser?.id || ''
    if (id) loadDefaults(id)
  }, [currentUser?.id, loadDefaults])

  const categories = Array.isArray(filters.defaultCategories)
    ? filters.defaultCategories
    : []

  return (
    <div className='w-full overflow-x-auto max-md:px-2 scroll-smooth'>
      <div className='flex flex-nowrap md:flex-wrap gap-2 mt-4 min-w-max'>
        {categories.length > 0 ? (
          <button
            onClick={() => clear()}
            className='px-3 py-2 inline-flex items-center gap-1 rounded-full border text-[12px] md:text-[13px] bg-white border-[#EAEAEA] text-black'
          >
            <X className='h-3 w-3 md:h-4 md:w-4' />
            Clear
          </button>
        ) : null}
        {categories.map((c, i) => (
          <button
            key={`${c}-${i}`}
            className={cn(
              'px-3 py-2 cursor-pointer rounded-full border text-[12px] md:text-[13px]',
              filters.categories.includes(c)
                ? 'bg-primary border-primary text-white'
                : 'bg-white border-[#EAEAEA] text-black'
            )}
            role='button'
            aria-label={`Filter by ${c}`}
            onClick={() => toggle(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
