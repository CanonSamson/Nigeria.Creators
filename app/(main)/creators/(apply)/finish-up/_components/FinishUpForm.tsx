'use client'

import BasicInput from '@/components/input/BasicInput'
import Button from '@/components/custom/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabaseService } from '@/utils/supabase/services'
import { CreatorJoinRequestType } from '@/types/request'
import { toast } from 'sonner'
import { supabaseAuthService } from '@/utils/supabase/services/auth'

const schema = Yup.object({
  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Required')
})

export default function FinishUpForm () {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || ''
  const pathName = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [request, setRequest] = useState<CreatorJoinRequestType | null>()
  const [isSignUp, setIsSignUp] = useState(false)

  const formik = useFormik<{ password: string; confirmPassword: string }>({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: schema,
    onSubmit: () => {}
  })

  useEffect(() => {
    console.log(isLoading)
    const handleIsRequested = async () => {
      if (!id) {
        router.replace('/')
        return
      }
      try {
        setIsLoading(true)

        const { data, error } = await supabaseService.client
          .from('creators_join_request')
          .select('*')
          .eq('id', id)
          .single()
        if (error || !data) {
          router.replace('/')
          return
        }
        if (data) {
          setRequest(data)
        }
      } catch {
        router.replace('/')
      } finally {
        setIsLoading(false)
      }
    }
    handleIsRequested()
  }, [id, pathName, router])

  const handleSubmit = async () => {
    try {
      setIsSignUp(true)
      if (!request) {
        toast.error('Not found')
        return
      }
      formik.setTouched({ password: true, confirmPassword: true })
      const errs = await formik.validateForm()
      const hasErr = Boolean(errs.password || errs.confirmPassword)
      if (hasErr) return

      if (!Boolean(request?.isAccepted === true)) {
        toast.error('Request not accepted')
        return
      }

      const email = String(request.email || '')
        .trim()
        .toLowerCase()
      const password = String(formik.values.password)
      const res = await supabaseAuthService.signUpWithEmailAndPassword(
        email,
        password
      )

      if (!res.success) {
        toast.error(res.message || 'Failed to create account')
        return
      }

      const userId = res.data?.user?.id
      try {
        const { error: userInsertError } = await supabaseService.client
          .from('users')
          .insert({
            id: userId,
            requestId: request?.id || '',
            email,
            name: request?.name || '',
            role: 'CREATOR',
            profilePictureUrl: request?.profilePictureUrl || '',
            phoneNumber: request?.phone || '',
            isEmailVerified: true,
            resident: request?.resident || 'no',
            isDisabled: false,
            isDisabledAt: null,
            isSuspendedAt: null,
            isSuspended: false
          })
        if (userInsertError) throw new Error(userInsertError.message)

        const { error: profileInsertError } = await supabaseService.client
          .from('user_profile')
          .insert({
            userId,
            description: request?.description || '',
            contentLink: request?.contentLink || null,
            tiktokLink: request?.tiktok || null,
            instagramLink: request?.instagram || null,
            categories: request?.categories || []
          })
        if (profileInsertError) {
          await supabaseService.client
            .from('users')
            .delete()
            .eq('userId', userId)
          throw new Error(profileInsertError.message)
        }
      } catch (e) {
        toast.error('Failed to finalize account setup')

        console.log(e)

        return
      }
    } catch (e) {
      toast.error('Failed to finalize account setup')
      console.log(e)

      return
    } finally {
      setIsSignUp(false)
    }
  }

  return (
    <div className='mt-6 space-y-5' aria-label='Finish account setup form'>
      <BasicInput
        label='Password'
        type='password'
        name='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        placeholder='Password'
        error={
          formik.touched.password && formik.errors.password
            ? String(formik.errors.password)
            : undefined
        }
      />
      <BasicInput
        label='Confirm Password'
        type='password'
        name='confirmPassword'
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        placeholder='Confirm password'
        error={
          formik.touched.confirmPassword && formik.errors.confirmPassword
            ? String(formik.errors.confirmPassword)
            : undefined
        }
      />

      <div className='pt-2'>
        <Button
          text='Dashboard'
          aria-label='Go to dashboard'
          className='w-auto px-5 py-[12px] text-[16px] font-medium rounded-[12px] bg-[#327468] hover:bg-[#285d54]'
          buttonType='button'
          onClick={() => handleSubmit()}
          isSubmit={isSignUp}
        />
      </div>
    </div>
  )
}
