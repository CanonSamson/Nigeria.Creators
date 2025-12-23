import DropdownBase from './DropdownBase'
import { useState } from 'react'

export type BudgetRange = {
  min?: number
  max?: number
}

export type BudgetsFilterProps = {
  onChange?: (value: BudgetRange) => void
}

export default function BudgetsFilter ({ onChange }: BudgetsFilterProps) {
  const [range, setRange] = useState<BudgetRange>({})
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    const num = value ? Number(value) : undefined
    const next = { ...range, [name]: num }
    setRange(next)
  }
  const apply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onChange?.(range)
  }
  return (
    <DropdownBase label='Budget' closeOnChildSubmit keepMounted>
      <form className='w-[360px] space-y-3' aria-label='Budget range' onSubmit={apply}>
        <div className='flex items-center gap-3'>
          <label className='flex-1'>
            <span className='sr-only'>Min</span>
            <input
              id='min'
              name='min'
              inputMode='numeric'
              className='w-full h-10 border border-[#EAEAEA] rounded-[12px] px-3 text-[14px] outline-none focus:ring-2 focus:ring-[#4A74F5]'
              placeholder='₦  Min'
              onChange={handle}
            />
          </label>
          <span className='text-[#9AA0A6] text-[13px]'>–</span>
          <label className='flex-1'>
            <span className='sr-only'>Max</span>
            <input
              id='max'
              name='max'
              inputMode='numeric'
              className='w-full h-10 border border-[#EAEAEA] rounded-[12px] px-3 text-[14px] outline-none focus:ring-2 focus:ring-[#4A74F5]'
              placeholder='₦  Max'
              onChange={handle}
            />
          </label>
        </div>
        <div className='flex justify-end'>
          <button type='submit' className='px-4 h-10 rounded-[12px] bg-primary text-white text-[13px]'>
            Filter
          </button>
        </div>
      </form>
    </DropdownBase>
  )
}
