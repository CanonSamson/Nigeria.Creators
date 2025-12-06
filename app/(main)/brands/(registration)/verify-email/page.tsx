'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/custom/Button'
import { toast } from 'sonner'

export default function Requested () {
  const router = useRouter()
  const email = useMemo(() => 'example@gmail.com', [])
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!email) router.replace('/')
  }, [email, router])

  const maskedEmail = useMemo(() => {
    const [name, domain] = email.split('@')
    const maskedName = name.length <= 2 ? name : `${name.slice(0, 2)}***`
    return `${maskedName}@${domain}`
  }, [email])

  const handleVerify = async () => {
    try {
      if (!code.trim()) {
        toast.error('Enter the verification code')
        return
      }
      setIsSubmitting(true)
      await new Promise(r => setTimeout(r, 800))
      toast.success('Email verified')
      router.replace('/brand')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    await new Promise(r => setTimeout(r, 500))
    toast.success('Verification code resent')
  }

  return (
    <main className={cn('w-full min-h-screen font-sans', 'min-h-[100dvh]')}>
      <div className='mx-auto max-w-[1100px] flex min-h-[100dvh] flex-col  w-full '>
        <div className=' w-full flex py-4 justify-end'>
          <Link
            href='/'
            className=' font-semibold text-[14px] px-4 md:text-[16px] hover:text-primary'
          >
            Log Out
          </Link>
        </div>
        <section className=' flex flex-col   justify-center items-center flex-1 w-full'>
          <div className='max-w-[400px] mx-auto'>
            <Image
              src='/logo/footer.png'
              alt='Nigeria Creators logo'
              width={400}
              height={400}
              className='rounded-[12px] h-[120px] md:h-[100px] w-auto object-contain'
            />

            <div className='mt-4 w-full'>
              <h2 className='text-[18px] tracking-tighter md:text-[22px] font-semibold text-black'>
                Verify your email
              </h2>
              <p className='mt-2 text-[#40444C] tracking-tight text-[14px] md:text-[16px]'>
                Please enter the code that was just sent to your email
              </p>
              <p className='mt-1 text-black font-semibold text-[14px] md:text-[16px]'>
                {maskedEmail}
              </p>

              <div className='mt-4 max-w-[200px]'>
                <input
                  aria-label='Verification code'
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder=''
                  className='w-full text-[40px] text-gray-700 font-sans h-[56px] px-4 rounded-[12px] bg-[#F8F8F8] border border-[#EFEFEF] outline-none'
                />
              </div>

              <div className='mt-2 text-[14px] md:text-[16px] text-[#40444C]'>
                Didn&apos;t see the code?{' '}
                <button
                  onClick={handleResend}
                  className='text-primary font-semibold hover:underline'
                >
                  Resend Code
                </button>
              </div>

              <div className='mt-4'>
                <Button
                  text={'Verify'}
                  className=' w-auto px-5 py-[12px] min-w-[150px] text-[16px] font-medium rounded-[12px]'
                  isSubmit={isSubmitting}
                  onClick={() => handleVerify()}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
