'use client'

import { Check } from 'lucide-react'

interface PricingCardProps {
  title: string
  price: string
  period?: string
  billingInfo?: string
  description: string
  buttonText: string
  onButtonClick: () => void
  features: string[]
  variant?: 'default' | 'highlighted'
  buttonVariant?: 'black' | 'green'
}

const PricingCard = ({
  title,
  price,
  period,
  billingInfo,
  description,
  buttonText,
  onButtonClick,
  features,
  variant = 'default',
  buttonVariant = 'black'
}: PricingCardProps) => {
  const isHighlighted = variant === 'highlighted'

  return (
    <div
      className={`border rounded-[16px] p-8 flex flex-col ${
        isHighlighted
          ? 'border-transparent bg-[#F5FBF9]'
          : 'border-gray-200 bg-white'
      }`}
    >
      <h3 className='text-[28px] font-medium text-black mb-4'>{title}</h3>
      <div className='flex items-baseline mb-1'>
        <span className='text-[48px] font-bold text-black'>{price}</span>
        {period && <span className='text-gray-500 ml-1'>{period}</span>}
      </div>

      {billingInfo ? (
        <p className='text-gray-500 text-sm mb-6'>{billingInfo}</p>
      ) : (
        <div className='h-[20px] mb-6' />
      )}

      <div
        className={`h-px w-full mb-6 ${
          isHighlighted ? 'bg-gray-300' : 'bg-gray-200'
        }`}
      />

      <p className='text-gray-600 mb-8 min-h-[48px]'>{description}</p>

      <button
        className={`rounded-full py-3 font-medium mb-8 transition-colors ${
          buttonVariant === 'black'
            ? 'w-fit px-8 bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/90'
            : 'w-fit px-8 bg-[#2F6658] text-white hover:bg-[#2F6658]/90'
        }`}
        onClick={onButtonClick}
      >
        {buttonText}
      </button>

      <div
        className={`h-px w-full mb-8 ${
          isHighlighted ? 'bg-gray-300' : 'bg-gray-200'
        }`}
      />

      <div className='space-y-4'>
        {features.map((feature, index) => (
          <div key={index} className='flex items-start gap-3'>
            <div className='bg-black rounded-full p-0.5 mt-1 min-w-[16px] h-[16px] flex items-center justify-center'>
              <Check className='w-2.5 h-2.5 text-white' strokeWidth={4} />
            </div>
            <span className='text-gray-700 leading-tight'>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PricingCard
