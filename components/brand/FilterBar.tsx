import CategoriesFilter from './filters/CategoriesFilter'
import BudgetsFilter from './filters/BudgetsFilter'
import CustomFilter from './filters/CustomFilter'
import { Settings2 } from 'lucide-react'
import type { BudgetRange } from './filters/BudgetsFilter'
import type { CustomOption } from './filters/CustomFilter'
import { useSettingModal } from '@/context/model-settings'
import CustomSelect from '@/components/input/CustomSelect'
import { statesInNIgeriaByValue, statesInNIgeriaOptions } from '@/utils/options'
import { useState } from 'react'
import useAppStore from '@/store/useAppStore'

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
  const [locationValue, setLocationValue] = useState('')
  const setBrandLocation = useAppStore(s => s.setBrandLocation)
  const setBrandBudgetRange = useAppStore(s => s.setBrandBudgetRange)
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
          <CategoriesFilter />
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
            onChange={(value: BudgetRange) => {
              setBrandBudgetRange(value)
              onChange?.({ type: 'budget', value })
            }}
          />
        </div>
        <CustomSelect
          placeholder={statesInNIgeriaByValue[locationValue] || 'Location'}
          value={locationValue}
          onChange={(v: string) => {
            setLocationValue(v)
            const label = statesInNIgeriaByValue[v] || v
            setBrandLocation(label)
            onChange?.({ type: 'location', value: label })
          }}
          options={statesInNIgeriaOptions}
          isSearchable
          className=' inline-block'
          selectTriggerClassName='h-[45px] !min-w-[40px] md:h-[45px]  inline-flex items-center gap-2 px-3 py-2 rounded-[10px] border border-[#EAEAEA] bg-white text-[13px] md:text-[14px] text-black hover:bg-[#F8F8F8]inline-flex items-center gap-2 px-3 py-2 rounded-[10px] border border-[#EAEAEA] bg-white text-[13px] md:text-[14px] text-black hover:bg-[#F8F8F8]'
          optionPlaceHolder='Select a state'
        />
        {/* <div className='hidden md:block'>
          <LocationFilter
            onChange={(value: string) =>
              onChange?.({ type: 'location', value })
            }
          />
        </div> */}
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

const dummyCustom = [
  { id: 'available', label: 'Available for work', value: true },
  { id: 'pro', label: 'Creators PRO', value: false },
  { id: 'fast', label: 'Responds Quickly', value: false },
  { id: 'agencies', label: 'Agencies', value: false }
]
