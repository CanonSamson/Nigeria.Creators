'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import BasicInput from '@/components/input/BasicInput'
import Button from '@/components/custom/Button'
import { useState } from 'react'
import { toast } from 'sonner'
import { supabaseAuthService } from '@/utils/supabase/services/auth'

const schema = Yup.object({
  newPassword: Yup.string().trim().min(8, 'Password must be at least 8 characters').required('Required'),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    .required('Required')
})

export default function BrandPasswordSettingsPage () {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formik = useFormik<{ newPassword: string; confirmPassword: string }>({
    initialValues: { newPassword: '', confirmPassword: '' },
    validationSchema: schema,
    onSubmit: async values => {
      try {
        setIsSubmitting(true)
        const res = await supabaseAuthService.updatePassword(values.newPassword)
        if (!res.success) {
          toast.error(res.message || 'Failed to update password')
          return
        }
        toast.success('Password updated')
      } catch {
        toast.error('Something went wrong')
      } finally {
        setIsSubmitting(false)
      }
    }
  })

  return (
    <div className='font-sans '>
      <div>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>Password</h2>
        <p className='text-text-color-200 text-[14px] md:text-[16px]'>Update your account password.</p>
      </div>
      <div className=' mt-6 md:max-w-[640px] space-y-6 w-full '>
        <BasicInput
          label='New Password'
          type='password'
          name='newPassword'
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          placeholder='New Password'
          error={
            formik.touched.newPassword && formik.errors.newPassword
              ? String(formik.errors.newPassword)
              : undefined
          }
        />

        <BasicInput
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          placeholder='Confirm Password'
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? String(formik.errors.confirmPassword)
              : undefined
          }
        />

        <div className='pt-2'>
          <Button
            text='Save Changes'
            aria-label='Save password'
            className='w-auto px-5 py-[12px] text-[16px] font-medium rounded-[12px] bg-[#327468] hover:bg-[#285d54]'
            buttonType='button'
            isSubmit={isSubmitting}
            onClick={() => {
              formik.setTouched({ newPassword: true, confirmPassword: true })
              formik.validateForm().then(errs => {
                const hasErr = Boolean(
                  (errs as any).newPassword || (errs as any).confirmPassword
                )
                if (hasErr) return
                formik.submitForm()
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

