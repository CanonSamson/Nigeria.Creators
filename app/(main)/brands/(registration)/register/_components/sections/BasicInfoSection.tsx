'use client'

import { useFormikContext } from 'formik'
import BasicInput from '@/components/input/BasicInput'
 

const BasicInfoSection = () => {
  const { values, errors, touched, setFieldValue } = useFormikContext<{
    name: string
    email: string
    password: string
    confirmPassword: string
  }>()

  return (
    <>
      <div className='mt-4 '>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
          Enter your Brand Details to Begin
        </h2>
        <p className='mt-2 text-text-color-200 text-[14px] md:text-[16px]'>
          Join businesses across Nigeria connecting with top creators.
        </p>
      </div>

      <div className='mt-6 w-full space-y-6'>
        <BasicInput
          label='Brand Name'
          type='text'
          value={values.name}
          onChange={e => setFieldValue('name', e.target.value)}
          placeholder='Brand Name'
          error={touched.name && errors.name ? String(errors.name) : undefined}
        />
        <BasicInput
          label='Work Email'
          type='email'
          value={values.email}
          onChange={e => setFieldValue('email', e.target.value)}
          placeholder='Work Email'
          error={
            touched.email && errors.email ? String(errors.email) : undefined
          }
        />
        <BasicInput
          label='Password'
          type='password'
          value={values.password}
          onChange={e => setFieldValue('password', e.target.value)}
          placeholder='Password'
          error={
            touched.password && errors.password
              ? String(errors.password)
              : undefined
          }
        />
        <BasicInput
          label='Confirm Password'
          type='password'
          value={values.confirmPassword}
          onChange={e => setFieldValue('confirmPassword', e.target.value)}
          placeholder='Confirm password'
          error={
            touched.confirmPassword && errors.confirmPassword
              ? String(errors.confirmPassword)
              : undefined
          }
        />
      </div>
    </>
  )
}

export default BasicInfoSection
