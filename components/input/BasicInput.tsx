'use client'

import { ChangeEvent } from 'react'
import { cn } from '@/lib/utils'

type BasicInputProps = {
  label: string
  type?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  name?: string
  id?: string
  className?: string
  inputClassName?: string
  error?: string
}

const BasicInput = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
  id,
  className,
  inputClassName,
  error
}: BasicInputProps) => {
  const inputId = id || name || label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={cn('w-full flex flex-col', className)}>
      <label
        htmlFor={inputId}
        className='block text-[13px] md:text-[14px] text-black mb-2'
      >
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={cn(
          'w-full h-[48px] md:h-[54px] px-4 rounded-[12px] md:rounded-[16px] bg-[#F8F8F8] border text-[14px] md:text-[16px] text-black placeholder:text-text-color-200 outline-none',
          error ? 'border-red-500' : 'border-[#EFEFEF]',
          inputClassName
        )}
      />
      {error ? <p className='mt-1 text-[12px] text-red-500'>{error}</p> : null}
    </div>
  )
}

export default BasicInput
