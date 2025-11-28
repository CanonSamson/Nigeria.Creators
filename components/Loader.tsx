// ==============================|| Loader ||============================== //

import React from 'react'
import Image from 'next/image'
import { MAINTENANCE_MODE } from '@/utils/contant'
import { cn } from '@/lib/utils'

const Loading = () => {
  return MAINTENANCE_MODE ? (
    <></>
  ) : (
    <div
      className={cn(
        `w-full  h-[100vh] items-center flex justify-center font-ttfirs bg-white text-primary`,
        'h-[100dvh]'
      )}
    >
      <div className='flex-row w-auto justify-center'>
        <Image
          src={'/logo/v1.png'}
          alt={'refresh'}
          width={400}
          height={400}
          priority
          className='w-[75px] h-auto object-cover rounded-[12px]'
        />
      </div>
    </div>
  )
}
export default Loading
