'use client'

import BasicInput from '@/components/input/BasicInput'
import Button from '@/components/custom/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'

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

  const formik = useFormik<{ password: string; confirmPassword: string }>({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: schema,
    onSubmit: () => {}
  })

  return (
    <form className='mt-6 space-y-5' aria-label='Finish account setup form'>
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
          onClick={e => {
            e.preventDefault()
            formik.setTouched({ password: true, confirmPassword: true })
            formik.validateForm().then(errs => {
              const hasErr = Boolean(errs.password || errs.confirmPassword)
              if (hasErr) return
              router.replace('/creators')
            })
          }}
        />
      </div>
    </form>
  )
}
