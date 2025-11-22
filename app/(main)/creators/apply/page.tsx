'use client'

import { useState } from 'react'
import CategorySection from './_components/sections/CategorySection'
import Button from '@/components/custom/Button'
import BasicInfoSection from './_components/sections/BasicInfoSection'
import ProfileInfoSection from './_components/sections/ProfileInfoSection'
import SocialInfoSection from './_components/sections/SocialInfoSection'

export default function CreatorApplyPage () {
  const [totalSteps] = useState(5)
  const [currentStep, setCurrentStep] = useState(4)
  const next = () => {
    setCurrentStep(prev => (prev < totalSteps ? prev + 1 : prev))
  }

  return (
    <>
      <section className='mt-8 w-full flex-col  '>
        <div className='w-full max-w-[580px] mx-auto'>
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

        <div className=' w-full max-w-[640px] mx-auto flex flex-col'>
          {currentStep === 1 ? (
            <CategorySection />
          ) : currentStep === 2 ? (
            <BasicInfoSection />
          ) : currentStep === 3 ? (
            <ProfileInfoSection />
          ) : currentStep === 4 ? (
            <SocialInfoSection />
          ) : null}

          <div className='mt-8  w-full mx-auto ml-auto flex items-center justify-between '>
            {currentStep > 1 ? (
              <Button
                text='Previous Step'
                type='outline'
                className='w-auto px-5 font-medium py-[12px] text-[16px] rounded-[12px]'
                onClick={() =>
                  setCurrentStep(prev => (prev > 1 ? prev - 1 : prev))
                }
              />
            ) : (
              <div />
            )}
            <Button
              text='Next Step'
              className=' w-auto px-5 py-[12px] text-[16px] font-medium rounded-[12px]'
              onClick={next}
            />
          </div>
        </div>
      </section>
    </>
  )
}
