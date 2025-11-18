'use client'

import { useSettingModal } from '@/context/model-settings'
import React from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { createBrowserClient } from '@supabase/ssr'

const brandFeatures = [
  {
    image: '/feature-1.svg',
    heading: 'Local & Authentic',
    text: 'Our creators are based right here in Nigeria—local voices delivering authentic, city-savvy content for your brand.'
  },
  {
    image: '/feature-2.svg',
    heading: 'Direct Access',
    text: 'Connect directly with creators. No middlemen, no delays—start real conversations instantly.'
  },
  {
    image: '/feature-3.svg',
    heading: 'Tailored for Your Brand',
    text: 'Browse by category to find the perfect creator. Fast, focused, and aligned with your brand’s needs.'
  }
]

const creatorFeatures = [
  {
    image: '/feature-1.svg',
    heading: 'Local & Authentic',
    text: 'Work with Nigerian brands that value your true, relatable voice.'
  },
  {
    image: '/feature-2.svg',
    heading: 'Direct Access',
    text: 'Connect directly with brands. No middlemen, no delays.'
  },
  {
    image: '/feature-3.svg',
    heading: 'Tailored for Your Growth',
    text: 'Work with brands in your category—matched to your style and content.'
  }
]

const WaitListModal = () => {
  const { toggleModal, modals, modalData, updateModalData } = useSettingModal()

  const [isLoading, setIsLoading] = React.useState(false)
  const isOpen = modals?.waitListModal
  const values = modalData?.waitListModal
  const role = values?.role ?? 'brand'
  const features = role === 'creator' ? creatorFeatures : brandFeatures

  const handleClose = () => {
    toggleModal('waitListModal')
  }

  const handleJoinWaitList = async () => {
    try {
      setIsLoading(true)
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      )
      const { error } = await supabase.from('wait_list').insert({
        email: String(values?.email || '').toLowerCase(),
        role: String(values?.role || 'brand'),
        features: Array.isArray(values?.selectedFeatures)
          ? values?.selectedFeatures
          : []
      })
      if (error) {
        const msg = /duplicate/i.test(error.message)
          ? 'Email has already been registered'
          : 'Failed to join waitlist'
        toast.error(msg)
        return
      }
      try {
        await fetch('/api/v1/wait-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: String(values?.email || '').toLowerCase(),
            role: String(values?.role || 'brand'),
            features: Array.isArray(values?.selectedFeatures)
              ? values?.selectedFeatures
              : []
          })
        })
      } catch {}
      toast.success('Added to waitlist')
      toggleModal('waitListModal')
    } catch {
      toast.error('Network error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={cn(
        `fixed  top-0 right-0  w-full h-screen  z-50 items-end lg:items-center justify-center`,
        '!h-[100dvh]',
        isOpen ? 'flex' : 'hidden'
      )}
    >
      <div
        className='fixed inset-0 bg-black opacity-50'
        onClick={handleClose}
      />

      <div className='bg-white font-sans hide-scrollbar overflow-y-auto rounded-b-[0px] lg:rounded-b-[16px] rounded-[16px] shadow-lg max-h-[80vh] w-full lg:max-w-[640px] overflow-hidden z-10 flex flex-col'>
        <div className='p-5 mt-3 flex-shrink-0'>
          <div className='flex justify-between items-center'>
            <h2 className='text-[20px] md:text-[24px] font-bold text-primary tracking-tighter '>
              What Features would you love?
            </h2>
          </div>
        </div>

        <div className='px-5 pb-5'>
          <div className='flex justify-center'>
            <div className='inline-flex w-full max-w-[400px] items-center gap-2 bg-[#F5F5F5] rounded-[16px] p-1'>
              <button
                onClick={() =>
                  updateModalData('waitListModal', { role: 'creator' })
                }
                aria-pressed={role === 'creator'}
                className={`h-[45px] flex-1 px-4 rounded-[12px]  duration-300 transition-all active:opacity-80 hover:opacity-80 font-semibold text-[14px] md:text-[16px] ${
                  role === 'creator' ? 'bg-primary text-white' : 'text-black'
                }`}
              >
                I&apos;m a Creator
              </button>
              <button
                onClick={() =>
                  updateModalData('waitListModal', { role: 'brand' })
                }
                aria-pressed={role === 'brand'}
                className={`h-[45px] flex-1 px-4 rounded-[12px] duration-300 transition-all active:opacity-80 hover:opacity-80 font-semibold text-[14px] md:text-[16px] ${
                  role === 'brand' ? 'bg-primary text-white' : 'text-black'
                }`}
              >
                I&apos;m a Brand
              </button>
            </div>
          </div>

          <div className='mt-4 space-y-4'>
            {features.map(f => {
              const selected = Array.isArray(values?.selectedFeatures)
                ? values.selectedFeatures.includes(f.heading)
                : false
              return (
                <article
                  key={f.heading}
                  role='button'
                  aria-pressed={selected}
                  onClick={() => {
                    const current = Array.isArray(values?.selectedFeatures)
                      ? values.selectedFeatures
                      : []
                    const next = selected
                      ? current.filter((h: string) => h !== f.heading)
                      : [...current, f.heading]
                    updateModalData('waitListModal', {
                      selectedFeatures: next
                    })
                  }}
                  className={`rounded-[16px] prevent-select p-4 flex border  duration-300 transition-all active:opacity-80 hover:opacity-80 items-start gap-3 ${
                    selected
                      ? 'bg-[#F5FFFD]  border-[#00FFCC] '
                      : 'bg-[#F8F8F8] border-[#F8F8F8]'
                  }`}
                >
                  <div className='flex-shrink-0'>
                    <Image
                      src={f.image}
                      alt={f.heading}
                      height={64}
                      width={64}
                      className='h-[48px] w-[48px] md:h-[56px] md:w-[56px] object-contain'
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-black font-semibold text-[16px] md:text-[18px]'>
                      {f.heading}
                    </h3>
                    <p className='mt-1 text-text-color-200 text-[13px] leading-[20px] md:text-[15px] md:leading-[22px]'>
                      {f.text}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className='mt-6'>
            <button
              onClick={handleJoinWaitList}
              disabled={isLoading}
              className='h-[50px] w-full px-4 disabled:opacity-70 hover:opacity-80 transition-all duration-300 active:opacity-80 rounded-[12px] bg-primary text-white font-semibold text-[14px] md:text-[16px]'
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitListModal
