'use client'

import { useSettingModal } from '@/context/model-settings'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type Option = { label: string }

const categories: Option[] = [
  { label: 'Logo & Branding' },
  { label: 'Web Design' },
  { label: 'Illustration' },
  { label: 'Product Design' },
  { label: 'Mobile' },
  { label: 'Animation' },
  { label: 'Typography' },
  { label: 'Print' }
]

export default function MobileFiltersModal () {
  const { modals, toggleModal } = useSettingModal()
  const isOpen = modals?.mobileFiltersModal
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [loc, setLoc] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  const toggleCategory = (label: string) => {
    setSelected(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    )
  }

  const close = () => toggleModal('mobileFiltersModal')

  const apply = () => {
    close()
  }

  return (
    <div
      className={cn(
        'fixed top-0 right-0 w-full h-screen z-50 items-end justify-center',
        '!h-[100dvh]',
        isOpen ? 'flex' : 'hidden'
      )}
    >
      <div className='fixed inset-0 bg-black/50' onClick={close} />
      <div className='bg-white font-sans rounded-t-[16px] shadow-lg w-full max-w-[640px] overflow-hidden z-10 flex flex-col max-h-[85vh]'>
        <div className='p-5 border-b border-[#EFEFEF]'>
          <h2 className='text-[18px] md:text-[20px] font-bold text-black'>
            Filters
          </h2>
        </div>
        <div className='p-5 space-y-6 overflow-y-auto'>
          <div className='space-y-2'>
            <p className='text-[13px] font-semibold text-black'>Categories</p>
            <div className='flex flex-wrap gap-2'>
              {categories.map(c => (
                <button
                  key={c.label}
                  type='button'
                  className={cn(
                    'inline-flex items-center h-9 px-4 rounded-full border text-[13px]',
                    selected.includes(c.label)
                      ? 'border-black bg-[#F1F1F1] text-black'
                      : 'border-[#EAEAEA] bg-white text-black'
                  )}
                  onClick={() => toggleCategory(c.label)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className='space-y-2'>
            <p className='text-[13px] font-semibold text-black'>Budget</p>
            <div className='flex items-center gap-3'>
              <input
                inputMode='numeric'
                placeholder='₦  Min'
                className='flex-1 h-10 border border-[#EAEAEA] rounded-[12px] px-3 text-[14px] outline-none'
                value={min}
                onChange={e => setMin(e.target.value)}
              />
              <span className='text-[#9AA0A6] text-[13px]'>–</span>
              <input
                inputMode='numeric'
                placeholder='₦  Max'
                className='flex-1 h-10 border border-[#EAEAEA] rounded-[12px] px-3 text-[14px] outline-none'
                value={max}
                onChange={e => setMax(e.target.value)}
              />
            </div>
          </div>
          <div className='space-y-2'>
            <p className='text-[13px] font-semibold text-black'>Location</p>
            <input
              placeholder='Enter Location'
              className='w-full h-10 border border-[#EAEAEA] rounded-[12px] px-3 text-[14px] outline-none'
              value={loc}
              onChange={e => setLoc(e.target.value)}
            />
          </div>
        </div>
        <div className='p-5 border-t border-[#EFEFEF] flex justify-end gap-2'>
          <button
            type='button'
            className='px-4 h-10 rounded-[12px] border border-[#EAEAEA] bg-white text-[13px]'
            onClick={close}
          >
            Cancel
          </button>
          <button
            type='button'
            className='px-4 h-10 rounded-[12px] bg-primary text-white text-[13px]'
            onClick={apply}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
