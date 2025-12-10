'use client'

import { useFormikContext } from 'formik'
import CustomPhoneInput from '@/components/input/CustomPhoneInput'
import CustomSelect from '@/components/input/CustomSelect'

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
          <CustomSelect
            label='Is your brand based in Nigeria?'
            placeholder='Select'
            value={resident}
            onChange={value => setFieldValue('resident', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
            error={touched.resident && errors.resident ? String(errors.resident) : undefined}
          />
        </div>

        <div>
          <CustomSelect
            label='Brand Size'
            placeholder='Select'
            value={brandSize}
            onChange={value => setFieldValue('brandSize', value)}
            options={[
              { value: '1-10', label: '1-10' },
              { value: '11-50', label: '11-50' },
              { value: '51-200', label: '51-200' },
              { value: '200+', label: '200+' }
            ]}
            error={touched.brandSize && errors.brandSize ? String(errors.brandSize) : undefined}
          />
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
