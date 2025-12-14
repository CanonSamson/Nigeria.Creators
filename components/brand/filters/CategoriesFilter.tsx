import DropdownBase from './DropdownBase'
import useAppStore from '@/store/useAppStore'
import { categories as allCategories } from '@/utils/options'
import { cn } from '@/lib/utils'

export default function CategoriesFilter () {
  const filters = useAppStore(s => s.brandFilters)
  const toggle = useAppStore(s => s.toggleBrandCategory)
  const toggleOthers = useAppStore(s => s.toggleOthersFilter)
  const items = allCategories.map(o => {
    const isOthers = o.toLowerCase() === 'others'
    const active = isOthers ? filters.others : filters.categories.includes(o)
    const cls = cn(
      'inline-flex items-center h-9 px-4 rounded-full border justify-center text-[13px]',
      active
        ? 'bg-primary border-primary text-white'
        : 'bg-white border-[#EAEAEA] text-black'
    )
    const onClick = () => (isOthers ? toggleOthers() : toggle(o))
    return (
      <button
        key={o}
        type='button'
        className={cls}
        role='menuitem'
        data-focusable='true'
        onClick={onClick}
      >
        {o}
      </button>
    )
  })
  return (
    <DropdownBase label='Categories'>
      <div className='flex flex-wrap gap-2 max-h-[240px] overflow-y-auto'>
        {items}
      </div>
    </DropdownBase>
  )
}
