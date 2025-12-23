'use client'

import { InlineWidget } from 'react-calendly'

const BrandCalendlySection = () => {
  return (
    <div className='w-full py-20 flex justify-center items-center '>
      <div className='w-full max-w-[1200px]'>
        <InlineWidget
          url='https://calendly.com/samsoncanon2018/30min'
          styles={{
            height: '700px',
            width: '100%',
          }}
        />
      </div>
    </div>
  )
}



export default BrandCalendlySection
