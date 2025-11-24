'use client'

import { useFormikContext } from 'formik'
import BasicInput from '@/components/input/BasicInput'
import CustomPhoneInput from '@/components/input/CustomPhoneInput'

const BasicInfoSection = () => {
  const { values, errors, touched, setFieldValue } = useFormikContext<{
    name: string
    email: string
    phone: string
  }>()

  return (
    <>
      <div className='mt-4 '>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
          Enter your Name and Email to Begin!
        </h2>
        <p className='mt-2 text-text-color-200 text-[14px] md:text-[16px]'>
          Join thousands of creators building their brand with us.
        </p>
      </div>

      <div className='mt-6 w-full space-y-6'>
        <BasicInput
          label='Name'
          type='text'
          value={values.name}
          onChange={e => setFieldValue('name', e.target.value)}
          placeholder='Full Name'
          error={touched.name && errors.name ? String(errors.name) : undefined}
        />
        <BasicInput
          label='Email'
          type='email'
          value={values.email}
          onChange={e => setFieldValue('email', e.target.value)}
          placeholder='Your Email'
          error={
            touched.email && errors.email ? String(errors.email) : undefined
          }
        />
        <CustomPhoneInput
          label='Phone No'
          value={values.phone}
          onChange={v => setFieldValue('phone', v)}
          className=''

          error={
            touched.phone && errors.phone ? String(errors.phone) : undefined
          }
        />
      </div>
    </>
  )
}

export default BasicInfoSection
