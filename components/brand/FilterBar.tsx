import CategoriesFilter from './filters/CategoriesFilter'
import BudgetsFilter from './filters/BudgetsFilter'
import LocationFilter from './filters/LocationFilter'
import CustomFilter from './filters/CustomFilter'
import { Settings2 } from 'lucide-react'
import type { BudgetRange } from './filters/BudgetsFilter'
import type { CustomOption } from './filters/CustomFilter'
import { useSettingModal } from '@/context/model-settings'

export type FilterChange<T> = {
  type: 'categories' | 'budget' | 'location' | 'custom'
  value: T
}

type Props = {
  onChange?: (
    e: FilterChange<string[] | BudgetRange | string | CustomOption[]>
  ) => void
}

export default function FilterBar ({ onChange }: Props) {
  const { toggleModal } = useSettingModal()
  return (
    <div className='w-full max-md:overflow-x-auto  max-md:overflow-y-hidden max-md:px-2'>
      <div className='flex flex-nowrap md:flex-wrap items-center gap-2 min-w-max'>
        <button
          type='button'
          aria-label='Filters'
          className='w-10 h-10 rounded-[10px] border border-[#EAEAEA] bg-white flex items-center justify-center md:hidden'
        >
          <Settings2 className='w-5 h-5' />
        </button>
        <button
          type='button'
          className='md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-[10px] border border-[#EAEAEA] bg-white text-[13px] text-black'
          onClick={() => toggleModal('mobileCategoriesModal')}
        >
          Categories
        </button>
        <div className='hidden md:block'>
        <CategoriesFilter
         
        />
        </div>
        <button
          type='button'
          className='md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-[10px] border border-[#EAEAEA] bg-white text-[13px] text-black'
          onClick={() => toggleModal('mobileBudgetModal')}
        >
          Budget
        </button>
        <div className='hidden md:block'>
        <BudgetsFilter
          onChange={(value: BudgetRange) =>
            onChange?.({ type: 'budget', value })
          }
        />
        </div>
        <button
          type='button'
          className='md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-[10px] border border-[#EAEAEA] bg-white text-[13px] text-black'
          onClick={() => toggleModal('mobileLocationModal')}
        >
          Location
        </button>
        <div className='hidden md:block'>
        <LocationFilter
          onChange={(value: string) => onChange?.({ type: 'location', value })}
        />
        </div>
        <div className='hidden md:block'>
        <CustomFilter
          label='More'
          options={dummyCustom}
          onChange={(value: CustomOption[]) =>
            onChange?.({ type: 'custom', value })
          }
        />
        </div>
        <button
          type='button'
          className='md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-[10px] border border-[#EAEAEA] bg-white text-[13px] text-black'
          onClick={() => toggleModal('mobileMoreModal')}
        >
          More
        </button>
      </div>
    </div>
  )
}

const dummyCategories = [
  'Logo & Branding',
  'Web Design',
  'Illustration',
  'Product Design',
  'Mobile',
  'Animation',
  'Typography',
  'Print'
]

const dummyCustom = [
  { id: 'available', label: 'Available for work', value: true },
  { id: 'pro', label: 'Designers PRO', value: false },
  { id: 'fast', label: 'Responds Quickly', value: false },
  { id: 'agencies', label: 'Agencies', value: false }
]
