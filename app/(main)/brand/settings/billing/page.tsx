'use client'

import Link from 'next/link'
import { toast } from 'sonner'

export default function BrandBillingPage () {


  const isPro = false
  const today = new Date()
  const nextReset = new Date(today.getFullYear() + 1, 0, 25, 9, 9)
  const resetStr = `${nextReset.getFullYear()}/${String(
    nextReset.getMonth() + 1
  ).padStart(2, '0')}/${String(nextReset.getDate()).padStart(2, '0')} ${String(
    nextReset.getHours()
  ).padStart(2, '0')}:${String(nextReset.getMinutes()).padStart(2, '0')}`
  const txnDateStr = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(
    today.getDate()
  ).padStart(2, '0')} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`


  return (
    <div className='font-sans'>
      <div>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
          Plan & Billings
        </h2>
        <p className='text-text-color-200 text-[14px] md:text-[16px]'>
          View your subscription plan, billings information.
        </p>
      </div>
      <div className='mt-6 md:max-w-[840px] space-y-10 w-full'>
        <section className='bg-white border border-[#EAEAEA] rounded-[16px] overflow-hidden'>
          <div className='px-5 py-4'>
            <p className='text-[14px] font-semibold text-black'>
              Subscription Plan
            </p>
          </div>
          <div className='border-t border-[#EFEFEF]'>
            <div className='px-5 py-4 flex items-center justify-between'>
              <span className='text-[14px] text-black'>Current Plan</span>
              <span className='text-[14px] font-medium text-black'>
                {isPro ? 'Pro' : 'Free'}
              </span>
            </div>
            {isPro ? (
              <>
                <div className='px-5 py-4 flex items-center justify-between border-t border-[#EFEFEF]'>
                  <span className='text-[14px] text-black'>
                    Billed monthly, usage reset date
                  </span>
                  <span className='text-[14px] text-black'>{resetStr}</span>
                </div>
                <div className='px-5 py-4 flex items-center justify-between border-t border-[#EFEFEF]'>
                  <span className='text-[14px] text-black'>Upgrade plan</span>
                  <button
                    type='button'
                    className='inline-flex items-center gap-2 px-4 h-10 rounded-[12px] border border-[#EAEAEA] bg-white text-[13px] text-black hover:bg-[#F8F8F8]'
                  >
                    Switch to Yearly Plan
                  </button>
                </div>
                <div className='px-5 py-3 flex items-center justify-between border-t border-[#EFEFEF]'>
                  <Link
                    href='/pricing'
                    className='text-[13px] text-[#5F6368] hover:text-black'
                  >
                    View all plans & features on the Pricing page.
                  </Link>
                  <button
                    type='button'
                    className='text-[13px] text-[#5F6368] hover:text-black'
                  >
                    Redeem Promo Code
                  </button>
                </div>
              </>
            ) : (
              <div className='px-5 py-4 flex items-center justify-between border-t border-[#EFEFEF]'>
                <span className='text-[14px] text-black'>Upgrade plan</span>
                <button
                  type='button'
                  className='inline-flex items-center gap-2 px-6 h-10 rounded-[12px] bg-primary text-white text-[13px]'
                  onClick={() => toast('Coming soon')}
                >
                  Get Pro
                </button>
              </div>
            )}
          </div>
        </section>
        {isPro ? (
          <>
            <section className='bg-white border border-[#EAEAEA] rounded-[16px] overflow-hidden'>
              <div className='px-5 py-4 flex items-center justify-between'>
                <p className='text-[14px] font-semibold text-black'>
                  Billing History
                </p>
                <button
                  type='button'
                  className='inline-flex items-center gap-2 px-3 h-9 rounded-[10px] border border-[#EAEAEA] bg-white text-[13px] text-black hover:bg-[#F8F8F8]'
                >
                  Payment settings
                </button>
              </div>
              <div className='border-t border-[#EFEFEF]'>
                <div className='px-5 py-3 grid grid-cols-12 items-center text-[13px] text-[#5F6368]'>
                  <span className='col-span-4'>Name</span>
                  <span className='col-span-2'>Amount</span>
                  <span className='col-span-3'>Date</span>
                  <span className='col-span-3'>Operation</span>
                </div>
                <div className='border-t border-[#EFEFEF] px-5 py-4 grid grid-cols-12 items-center'>
                  <span
                    className='col-span-4 text-[14px] text-black cursor-pointer'
                    onClick={() => toast('Coming soon')}
                  >
                    Pro plan
                  </span>
                  <span className='col-span-2 text-[14px] text-black'>$3</span>
                  <span className='col-span-3 text-[14px] text-black'>
                    {txnDateStr}
                  </span>
                  <button
                    type='button'
                    className='col-span-3 text-[13px] text-primary hover:opacity-80 text-left'
                  >
                    Obtain invoice
                  </button>
                </div>
              </div>
            </section>
            <section className='bg-white border border-[#EAEAEA] rounded-[16px] overflow-hidden'>
              <div className='px-5 py-4'>
                <p className='text-[14px] font-semibold text-black'>
                  Danger Zone
                </p>
              </div>
              <div className='border-t border-[#EFEFEF]'>
                <div className='px-5 py-4 flex items-center justify-between'>
                  <div>
                    <p className='text-[14px] font-semibold text-black'>
                      Unsubscribe
                    </p>
                    <p className='text-[13px] text-[#5F6368]'>
                      If you cancel now, you can continue to access your subscription until your current subscription expires.
                    </p>
                  </div>
                  <button
                    type='button'
                    className='inline-flex items-center gap-2 px-4 h-10 rounded-[12px] border border-[#EAEAEA] bg-white text-[13px] text-black hover:bg-[#F8F8F8]'
                  >
                    Unsubscribe
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </div>
  )
}
