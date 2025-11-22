'use client'

import { useState } from 'react'
import BasicInput from '@/components/input/BasicInput'

const BasicInfoSection = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  return (
    < >
      <div className='mt-4 '>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
          Enter your Name and Email to Begin!
        </h2>
        <p className='mt-2 text-text-color-200 text-[14px] md:text-[16px]'>
          Join thousands of creators building their brand with us.
        </p>
      </div>

      <div className='mt-6 w-full space-y-6'>
        <BasicInput
          label='Name'
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Full Name'
        />
        <BasicInput
          label='Email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Your Email'
        />
        <BasicInput
          label='Phone No'
          type='tel'
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder='Phone No'
        />
      </div>
    </>
  )
}

export default BasicInfoSection
