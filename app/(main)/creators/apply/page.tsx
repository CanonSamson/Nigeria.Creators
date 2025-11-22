'use client'

import { useState } from 'react'
import CategorySection from './_components/sections/CategorySection'
import Button from '@/components/custom/Button'
import BasicInfoSection from './_components/sections/BasicInfoSection'
import ProfileInfoSection from './_components/sections/ProfileInfoSection'
import SocialInfoSection from './_components/sections/SocialInfoSection'

export default function CreatorApplyPage () {
  const [totalSteps] = useState(4)
  const [currentStep, setCurrentStep] = useState(1)
  const next = () => {
    setCurrentStep(prev => (prev < totalSteps ? prev + 1 : prev))
  }

  return (
    <>
      <section aria-labelledby='step-heading' className='mt-8 w-full'>
        <div className='w-full max-w-[580px]'>
          <div className='flex items-center gap-3'>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                aria-hidden
                className={`h-[4px] flex-1 rounded-full ${
                  i < currentStep ? 'bg-primary' : 'bg-[#EAEAEA]'
                }`}
              />
            ))}
          </div>

          <div className='mt-4'>
            <p
              id='step-heading'
              className='text-primary text-[14px] md:text-[16px] font-medium'
            >
              Step {currentStep}/{totalSteps}
            </p>
          </div>
        </div>

        <div className='mt-4'>
          <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
            Select your content categories
          </h2>
          <p className='mt-2 text-text-[#40444C] text-[14px] md:text-[16px]'>
            Choose what best describes your niche.
          </p>
        </div>

        <div className='mt-6 max-w-[640px]'>
          {currentStep === 1 ? (
            <CategorySection />
          ) : currentStep === 2 ? (
            <BasicInfoSection />
          ) : currentStep === 3 ? (
            <ProfileInfoSection />
          ) : currentStep === 4 ? (
            <SocialInfoSection />
          ) : null}
        </div>

        <div className='mt-8 flex items-start max-w-[200px]'>
          <Button
            text='Next Step'
            className=' w-auto px-5 py-[12px] text-xl font-medium rounded-[12px]'
            onClick={next}
          />
        </div>
      </section>
    </>
  )
}
