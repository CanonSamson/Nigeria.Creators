'use client'

import { useSettingModal } from '@/context/model-settings'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function MoreFilterModal () {
  const { modals, toggleModal } = useSettingModal()
  const isOpen = modals?.mobileMoreModal
  const [available, setAvailable] = useState(true)
  const [pro, setPro] = useState(false)
  const [fast, setFast] = useState(false)
  const [agencies, setAgencies] = useState(false)

  const close = () => toggleModal('mobileMoreModal')

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
          <h2 className='text-[18px] md:text-[20px] font-bold text-black'>Other Filters</h2>
          <button aria-label='Close' className='h-8 w-8 rounded-full bg-[#F1F1F1] flex items-center justify-center' onClick={close}>×</button>
        </div>
        <div className='p-5 space-y-4'>
          <label className='flex items-center justify-between gap-3'>
            <span className='text-[14px] text-black'>Available for work</span>
            <input type='checkbox' checked={available} onChange={e => setAvailable(e.target.checked)} className='peer sr-only' />
            <span className='h-6 w-11 rounded-full bg-[#E5E7EB] peer-checked:bg-[#7C3AED] relative transition-all'>
              <span className='absolute top-1 left-1 h-4 w-4 rounded-full bg-white peer-checked:left-6 transition-all' />
            </span>
          </label>
          <label className='flex items-center justify-between gap-3'>
            <span className='text-[14px] text-black'>PRO Designers</span>
            <input type='checkbox' checked={pro} onChange={e => setPro(e.target.checked)} className='peer sr-only' />
            <span className='h-6 w-11 rounded-full bg-[#E5E7EB] peer-checked:bg-[#141522] relative transition-all'>
              <span className='absolute top-1 left-1 h-4 w-4 rounded-full bg-white peer-checked:left-6 transition-all' />
            </span>
          </label>
          <label className='flex items-center justify-between gap-3'>
            <span className='text-[14px] text-black'>Responds Quickly</span>
            <input type='checkbox' checked={fast} onChange={e => setFast(e.target.checked)} className='peer sr-only' />
            <span className='h-6 w-11 rounded-full bg-[#E5E7EB] peer-checked:bg-[#141522] relative transition-all'>
              <span className='absolute top-1 left-1 h-4 w-4 rounded-full bg-white peer-checked:left-6 transition-all' />
            </span>
          </label>
          <label className='flex items-center justify-between gap-3'>
            <span className='text-[14px] text-black'>Agencies</span>
            <input type='checkbox' checked={agencies} onChange={e => setAgencies(e.target.checked)} className='peer sr-only' />
            <span className='h-6 w-11 rounded-full bg-[#E5E7EB] peer-checked:bg-[#141522] relative transition-all'>
              <span className='absolute top-1 left-1 h-4 w-4 rounded-full bg-white peer-checked:left-6 transition-all' />
            </span>
          </label>
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

