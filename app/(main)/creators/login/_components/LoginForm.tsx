'use client'

import BasicInput from '@/components/input/BasicInput'
import Button from '@/components/custom/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'

const schema = Yup.object({
  email: Yup.string().trim().email('Enter a valid email').required('Required'),
  password: Yup.string().trim().min(8, 'Password must be at least 8 characters').required('Required')
})

export default function LoginForm () {
  const router = useRouter()

  const formik = useFormik<{ email: string; password: string }>({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: () => {}
  })

  return (
    <form className='mt-6 space-y-5' aria-label='Login form'>
      <BasicInput
        label='Email'
        type='email'
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        placeholder='Email Address'
        error={
          formik.touched.email && formik.errors.email
            ? String(formik.errors.email)
            : undefined
        }
      />
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

      <div className='pt-2'>
        <Button
          text='Login'
          aria-label='Login'
          className='w-auto px-5 py-[12px] text-[16px] font-medium rounded-[12px] bg-[#327468] hover:bg-[#285d54]'
          buttonType='button'
          onClick={e => {
            e.preventDefault()
            formik.setTouched({ email: true, password: true })
            formik.validateForm().then(errs => {
              const hasErr = Boolean(errs.email || errs.password)
              if (hasErr) return
              router.replace('/creators')
            })
          }}
        />
      </div>
    </form>
  )
}
