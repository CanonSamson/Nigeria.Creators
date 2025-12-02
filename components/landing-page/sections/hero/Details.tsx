'use client'

import WaitListEmailInput from '@/components/WaitListEmailInput'
import { useState } from 'react'

const HeroSectionDetails = () => {
  const [waitList, setWaitList] = useState(false)
  return (
    <div className=' max-w-[750px] relative z-20 mx-auto min-h-[600px]  md:min-h-[600px]  flex flex-col justify-center items-center'>
      <div className=' mb-[18px] md:mb-[26px] gap-2 bg-[#F6FFFD] p-2 flex items-center rounded-[12px] md:rounded-[20px]'>
        <div className='  h-[12px] w-[12px]  flex items-center rounded-[12px] relative  bg-[#00FFCC]'>
          <div className='  h-[12px] w-[12px]  flex items-center rounded-[12px] animate-ping  bg-[#00FFCC] absolute' />
        </div>
        <span className=' tracking-tight text-[12px] md:text-[16px] text-text-color-200'>
          Early Access Open
        </span>
      </div>

      <div className=' text-center flex  flex-col'>
        <h1 className=' font-extrabold  tracking-tighter text-[36px] md:text-[60px] leading-none '>
          Connect with Nigeria&apos;s Content Creators.
        </h1>
        <p className=' max-w-[700px] tracking-tight mx-auto mt-[14px] text-text-color-200 font-medium leading-[24px]  text-[14px] md:text-[20px] md:leading-[30px]'>
          We connect brands with Nigeria&apos;s top content creators for
          authentic, engaging social media presence.
        </p>

        <div className=' mt-[26px] flex flex-col items-center px-4 gap-3'>
          <WaitListEmailInput />
          <p className=' font-medium text-text-color-200 text-[12px] md:text-[14px]'>
            Join the early access waitlist with others
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroSectionDetails
