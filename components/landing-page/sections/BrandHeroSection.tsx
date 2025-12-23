'use client'
import { mixpanelService } from '@/services/mixpanel'

const BrandHeroSection = () => {
  return (
    <header className='w-full overflow-hidden '>
      <div className=' mt-[12rem] max-w-[1300px] mx-auto w-full pb-[150px] md:pb-[120px]  relative h-full'>
         <div className=' max-w-[680px] relative z-20 mx-auto   flex flex-col justify-center items-center'>
          <div className='text-center flex flex-col items-center'>
            <h1 className='font-extrabold tracking-tighter text-[36px] md:text-[60px] leading-none'>
              Where Growth Starts with Creators
            </h1>
            <p className='max-w-[550px] tracking-tight mx-auto mt-[16px] text-text-color-200 font-medium text-[14px] md:text-[20px] leading-[24px] md:leading-[30px]'>
              Partner with creators who turn content into conversions and help
              brands grow through real performance
            </p>
            <div className='flex mt-[26px] justify-center'>
              <button
                onClick={() => {
                  mixpanelService.track('TOGGLE_WAITLIST', { value: true })
                  mixpanelService.track('CLICK_HERO_BRAND', {
                    source: 'hero-section'
                  })
                }}
                className='text-[14px] md:text-[18px] tracking-tight h-[50px] md:h-[60px] px-6 rounded-[16px] bg-primary text-white font-semibold'
              >
                Book Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default BrandHeroSection
