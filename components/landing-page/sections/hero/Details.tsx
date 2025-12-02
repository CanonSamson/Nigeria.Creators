'use client'

import WaitListEmailInput from '@/components/WaitListEmailInput'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { mixpanelService } from '@/services/mixpanel'

const HeroSectionDetails = () => {
  const [waitList, setWaitList] = useState(false)

  const router = useRouter()

  return (
    <div className=' max-w-[750px] relative z-20 mx-auto min-h-[600px]  md:min-h-[600px]  flex flex-col justify-center items-center'>
      {waitList ? (
        <div className=' mb-[18px] md:mb-[26px] gap-2 bg-[#F6FFFD] p-2 flex items-center rounded-[12px] md:rounded-[20px]'>
          <div className='  h-[12px] w-[12px]  flex items-center rounded-[12px] relative  bg-[#00FFCC]'>
            <div className='  h-[12px] w-[12px]  flex items-center rounded-[12px] animate-ping  bg-[#00FFCC] absolute' />
          </div>
          <span className=' tracking-tight text-[12px] md:text-[16px] text-text-color-200'>
            Early Access Open
          </span>
        </div>
      ) : (
        <div className=' mb-[18px] md:mb-[26px] gap-2 bg-[#F6FFFD] p-2 flex items-center rounded-[12px] md:rounded-[20px]'>
          <div className='   flex items-center rounded-[12px] md:rounded-[20px]'>
            <Image
              src='/user-1.png'
              alt='Nigeria Creators'
              height={60}
              width={60}
              className=' w-[20px] h-[20px] md:w-[40px] md:h-[40px] rounded-full object-cover'
            />
            <div className=' relative ml-[-10px] md:ml-[-20px] flex items-center'>
              <Image
                src='/user-2.png'
                alt='Nigeria Creators'
                height={60}
                width={60}
                className=' w-[20px] h-[20px] md:w-[40px] md:h-[40px] rounded-full object-cover'
              />
            </div>
            <div className=' relative ml-[-10px] md:ml-[-20px] flex items-center'>
              <Image
                src='/user-3.png'
                alt='Nigeria Creators'
                height={60}
                width={60}
                className=' w-[20px] h-[20px] md:w-[40px] md:h-[40px] rounded-full object-cover'
              />
            </div>
          </div>
          <span className=' tracking-tight text-[12px] md:text-[16px] text-text-color-200'>
            1,026+ Nigeria Content Creators
          </span>
        </div>
      )}

      <div className=' text-center flex  flex-col'>
        <h1 className=' font-extrabold  tracking-tighter text-[36px] md:text-[60px] leading-none '>
          Connect with Nigeria&apos;s Content Creators.
        </h1>
        <p className=' max-w-[700px] tracking-tight mx-auto mt-[14px] text-text-color-200 font-medium leading-[24px]  text-[14px] md:text-[20px] md:leading-[30px]'>
          We connect brands with Nigeria&apos;s top content creators for
          authentic, engaging social media presence.
        </p>
        {waitList ? (
          <div className=' mt-[26px] flex flex-col items-center px-4 gap-3'>
            <WaitListEmailInput />
            <p className=' font-medium text-text-color-200 text-[12px] md:text-[14px]'>
              Join the early access waitlist with others
            </p>
            <button
              onClick={() => {
                mixpanelService.track('TOGGLE_WAITLIST', { value: false })
                mixpanelService.track('CLICK_HERO_CREATOR', {
                  fromWaitList: true
                })
                setWaitList(false)
                router.push('/creators/apply')
              }}
              className=' hover:text-primary  tracking-tight font-semibold text duration-300 transition-all'
            >
              I&apos;m a Creator
            </button>
          </div>
        ) : (
          <div className=' flex mt-[26px] justify-center gap-4'>
            <button
              onClick={() => {
                mixpanelService.track('CLICK_HERO_CREATOR', {
                  fromWaitList: false
                })
                router.push('/creators/apply')
              }}
              className='text-[14px] md:text-[18px] bg-white tracking-tight   h-[50px] md:h-[60px] px-4 rounded-[16px] border border-border-200 text-black font-semibold'
            >
              I&apos;m a Creator
            </button>
            <button
              onClick={() => {
                mixpanelService.track('TOGGLE_WAITLIST', { value: true })
                mixpanelService.track('CLICK_HERO_BRAND', {
                  source: 'hero-section'
                })
                setWaitList(true)
              }}
              className=' text-[14px] md:text-[18px] tracking-tight  h-[50px] md:h-[60px] px-4 rounded-[16px] bg-primary text-white font-semibold'
            >
              I&apos;m a Brand
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroSectionDetails
