'use client'

import { useFormikContext } from 'formik'
import CustomPhoneInput from '@/components/input/CustomPhoneInput'

const AdditionalBrandInfoSection = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext<{
    resident: string
    brandSize: string
    phone: string | null
  }>()
  const resident = values.resident || ''
  const brandSize = values.brandSize || ''
  const phone = values.phone || ''

  return (
    <>
      <div className='mt-4'>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
          Provide Additional Brand Information
        </h2>
        <p className='mt-2 text-text-color-200 text-[14px] md:text-[16px]'>
          Help creators understand your brand better by completing the details below.
        </p>
      </div>

      <div className='mt-6 max-w-[640px] space-y-6'>
        <div>
          <label className='block text-[13px] md:text-[14px] text-black mb-2'>
            Is your brand based in Nigeria?
          </label>
          <select
            value={resident}
            onChange={e => setFieldValue('resident', e.target.value)}
            className='w-full h-[48px] md:h-[54px] px-4 rounded-[12px] md:rounded-[16px] bg-[#F8F8F8] border border-[#EFEFEF] text-[14px] md:text-[16px] text-black outline-none'
          >
            <option value='' disabled>
              Select
            </option>
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
          </select>
          {touched.resident && errors.resident ? (
            <p className='mt-1 text-[12px] text-red-500'>{String(errors.resident)}</p>
          ) : null}
        </div>

        <div>
          <label className='block text-[13px] md:text-[14px] text-black mb-2'>
            Brand Size
          </label>
          <select
            value={brandSize}
            onChange={e => setFieldValue('brandSize', e.target.value)}
            className='w-full h-[48px] md:h-[54px] px-4 rounded-[12px] md:rounded-[16px] bg-[#F8F8F8] border border-[#EFEFEF] text-[14px] md:text-[16px] text-black outline-none'
          >
            <option value='' disabled>
              Select
            </option>
            <option value='1-10'>1-10</option>
            <option value='11-50'>11-50</option>
            <option value='51-200'>51-200</option>
            <option value='200+'>200+</option>
          </select>
          {touched.brandSize && errors.brandSize ? (
            <p className='mt-1 text-[12px] text-red-500'>{String(errors.brandSize)}</p>
          ) : null}
        </div>

        <div>
          <label className='block text-[13px] md:text-[14px] text-black mb-2'>
            Phone No (optional)
          </label>
          <CustomPhoneInput
            label=''
            value={phone}
            onChange={v => setFieldValue('phone', v)}
            className=''
            error={touched.phone && errors.phone ? String(errors.phone) : undefined}
          />
        </div>
      </div>
    </>
  )
}

export default AdditionalBrandInfoSection

