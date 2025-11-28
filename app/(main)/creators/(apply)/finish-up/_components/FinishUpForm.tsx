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
    if (!request) {
      toast.error('Not found')
      return
    }
    formik.setTouched({ password: true, confirmPassword: true })
    formik.validateForm().then(errs => {
      const hasErr = Boolean(errs.password || errs.confirmPassword)
      if (hasErr) return

      if (!Boolean(request?.isAccepted === true)) {
        toast.error('Request not accepted')
        return
      }
    })
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
        />
      </div>
    </div>
  )
}
