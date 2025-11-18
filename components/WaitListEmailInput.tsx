'use client'

import { useSettingModal } from '@/context/model-settings'
import { BsArrowRight } from 'react-icons/bs'
import { useState } from 'react'
import { Toaster, toast } from 'sonner'

const WaitListEmailInput = () => {
  const { openModal } = useSettingModal()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validate = (value: string) => {
    if (!value.trim()) return 'Email is required'
    const re = /\S+@\S+\.\S+/
    if (!re.test(value)) return 'Enter a valid email'
    return ''
  }

  const handleSubmit = () => {
    const v = validate(email)
    if (v) {
      setError(v)
      toast.error(v)
      return
    }
    setError('')
    openModal('waitListModal', { email })
  }

  return (
    <div
      className={` w-full max-w-[450px] items-center flex justify-between rounded-[16px] md:rounded-[20px] p-[8px] bg-[#F8F8F8] border ${
        error ? 'border-red-500' : 'border-[#EFEFEF]'
      }`}
    >
      <Toaster />
      <input
        type='email'
        required
        value={email}
        onChange={e => {
          setEmail(e.target.value)
          if (error) setError('')
        }}
        placeholder='email Address'
        aria-label='Email Address'
        aria-invalid={!!error}
        className=' flex-1 bg-transparent outline-none px-3 text-[14px] md:text-[16px] text-text-color-200'
      />
      <button
        onClick={handleSubmit}
        type='button'
        aria-label='Join Waitlist'
        className='duration-300 transition-all active:opacity-80 hover:opacity-80 h-[40px] w-[48px] md:h-[46px] md:w-[52px] rounded-[12px] md:rounded-[16px] bg-primary text-white font-semibold flex items-center justify-center'
      >
        <BsArrowRight className=' h-4 w-4' />
      </button>
    </div>
  )
}

export default WaitListEmailInput
