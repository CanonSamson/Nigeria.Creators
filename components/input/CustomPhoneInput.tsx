'use client'
import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { cn } from '@/lib/utils'
// import { useSettingModal } from "@/contexts/modal-setting";

interface CustomPhoneInputProps {
  label?: string
  value: string
  onChange?: (value: string) => void
  className?: string
  error?: string | undefined | false
  selectTriggerClassName?: string
  showStar?: boolean
  id?: string
  disabled?: boolean
  verified?: boolean
  onVerifyClick?: () => void
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  error,
  className,
  label,
  onChange,
  selectTriggerClassName,
  value,
  showStar,
  disabled = false,
  verified,
  onVerifyClick
}) => {
  return (
    <div className={`flex flex-col duration-300 transition-all ${className}`}>
      {label && (
        <label>
          {label} <span className='text-red-600'>{showStar && '*'}</span>
        </label>
      )}
      <div
        className={cn(
          ` flex bg-[#F8F8F8] border border-[#EFEFEF]  rounded-[10px]  mt-[2px]  relative  h-[50px]  `,
          disabled ? ' opacity-50' : '',
          error ? 'border-red-500' : 'border-[#EFEFEF]',
          selectTriggerClassName
        )}
      >
        <PhoneInput
          country={'ng'}
          onlyCountries={['ng']}
          disableDropdown
          countryCodeEditable={false}
          value={value}
          onChange={onChange}
          containerClass={`react-tel-input`}
          inputStyle={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            paddingRight: '4.5rem'
          }}
          buttonStyle={{
            backgroundColor: 'transparent',
            border: 'none',
            paddingLeft: '10px'
          }}
          dropdownStyle={{}}
          inputClass='form-control '
          buttonClass='flag-dropdown '
          dropdownClass='dropdown '
          inputProps={{
            name: 'phone',
            required: true,
            disabled: disabled
          }}
        />
        {verified === true && (
          <IoMdCheckmarkCircle className='absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5 pointer-events-none' />
        )}
        {verified === false && (
          <span
            onClick={onVerifyClick}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-primary underline text-sm cursor-pointer'
          >
            Verify
          </span>
        )}
      </div>
      {error ? <p className='mt-1 text-[12px] text-red-500'>{error}</p> : null}
    </div>
  )
}

export default CustomPhoneInput
