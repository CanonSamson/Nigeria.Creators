'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/custom/Button'
import { toast } from 'sonner'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'

export default function Requested () {
  const router = useRouter()
  const [code, setCode] = useState('')

  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )

  const email = currentUser?.email || ''

  const maskedEmail = useMemo(() => {
    const [name, domain] = email?.split('@')
    const maskedName = name.length <= 2 ? name : `${name.slice(0, 2)}***`
    return `${maskedName}@${domain}`
  }, [email])

  const verifyMutation = useMutation({
    mutationFn: async ({ otp }: { otp: string }) => {
      if (!email) throw new Error('Missing email')
      const res = await axios.post('/api/verify-otp', { email, otp })
      return res.data
    },
    onSuccess: () => {
      toast.success('Email verified')
      router.replace('/brand')
    },
    onError: () => {
      toast.error('Verification failed')
    }
  })
  const isSubmitting = verifyMutation.isPending
  const handleVerify = () => {
    const otp = code.trim()
    if (!otp) {
      toast.error('Enter the verification code')
      return
    }
    verifyMutation.mutate({ otp })
  }

  const { mutate: handleResend } = useMutation({
    mutationFn: async () => {
      if (!email) throw new Error('Missing email')
      const res = await axios.post('/api/generate-otp', { email })
      return res.data
    },
    onSuccess: () => {
      toast.success('Verification code resent')
    },
    onError: () => {
      toast.error('Failed to resend code')
    }
  })

  useQuery({
    queryKey: ['generate-otp', email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.post('/api/generate-otp', { email })
      return res.data
    },
    retry: false
  })

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
                  inputMode='numeric'
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder=''
                  className='w-full text-[36px] text-gray-700 font-sans h-[56px] px-4 rounded-[12px] bg-[#F8F8F8] border border-[#EFEFEF] outline-none'
                />
              </div>

              <div className='mt-2 text-[14px] md:text-[16px] text-[#40444C]'>
                Didn&apos;t see the code?{' '}
                <button
                  onClick={() => handleResend()}
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
