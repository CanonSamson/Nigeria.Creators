'use client'

import { useSettingModal } from '@/context/model-settings'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function BudgetFilterModal () {
  const { modals, toggleModal } = useSettingModal()
  const isOpen = modals?.mobileBudgetModal
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')

  const close = () => toggleModal('mobileBudgetModal')

  return (
    <div
      className={cn(
        'fixed top-0 right-0 w-full h-screen z-50 items-end justify-center',
        '!h-[100dvh]',
        isOpen ? 'flex' : 'hidden'
      )}
    >
      <div className='fixed inset-0 bg-black/50' onClick={close} />
      <div className='bg-white font-sans rounded-[16px] shadow-lg w-full lg:max-w-[640px] overflow-hidden z-10 flex flex-col max-h-[85vh]'>
        <div className='p-5 border-b border-[#EFEFEF] flex items-center justify-between'>
          <h2 className='text-[18px] md:text-[20px] font-bold text-black'>Budget</h2>
          <button aria-label='Close' className='h-8 w-8 rounded-full bg-[#F1F1F1] flex items-center justify-center' onClick={close}>×</button>
        </div>
        <div className='p-5'>
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
        <div className='p-5 border-t border-[#EFEFEF]'>
          <button
            type='button'
            className='w-full h-11 rounded-[12px] bg-primary text-white text-[14px]'
            onClick={close}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
