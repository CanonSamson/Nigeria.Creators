'use client'

import BasicInput from '@/components/input/BasicInput'
import Button from '@/components/custom/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { supabaseAuthService } from '@/utils/supabase/services/auth'
import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'

const schema = Yup.object({
  email: Yup.string().trim().email('Enter a valid email').required('Required'),
  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .required('Required')
})

export default function LoginForm () {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const fetchCurrentUser = useContextSelector(
    UserContext,
    state => state.fetchCurrentUser
  )

  const onSubmit = async () => {
    setTouched({ email: true, password: true })
    const errs = await validateForm()
    const hasErr = Boolean(errs.email || errs.password)
    if (hasErr) return
    setIsLoading(true)
    try {
      const email = String(values.email || '')
        .trim()
        .toLowerCase()
      const password = String(values.password)
      const res = await supabaseAuthService.signInWithEmailAndPassword(
        email,
        password
      )
      if (!res.success) {
        toast.error(res.message || 'Failed to login')
        return
      }
      await fetchCurrentUser({ load: false })
      router.replace('/creator')
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong, please try again')
    } finally {
      setIsLoading(false)
    }
  }

  const {
    values,
    handleChange,
    touched,
    errors,
    validateForm,
    setTouched,
    handleSubmit
  } = useFormik<{ email: string; password: string }>({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit
  })

  return (
    <div className='mt-6 space-y-5' aria-label='Login form'>
      <BasicInput
        label='Email'
        type='email'
        name='email'
        value={values.email}
        onChange={handleChange}
        placeholder='Email Address'
        error={touched.email && errors.email ? String(errors.email) : undefined}
      />
      <BasicInput
        label='Password'
        type='password'
        name='password'
        value={values.password}
        onChange={handleChange}
        placeholder='Password'
        error={
          touched.password && errors.password
            ? String(errors.password)
            : undefined
        }
      />

      <div className='pt-2'>
        <Button
          text='Login'
          aria-label='Login'
          className='w-auto px-5 py-[12px] text-[16px] font-medium rounded-[12px] bg-[#327468] hover:bg-[#285d54]'
          buttonType='button'
          onClick={() => handleSubmit()}
          isSubmit={isLoading}
        />
      </div>
    </div>
  )
}
