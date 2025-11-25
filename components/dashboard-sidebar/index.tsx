import { cn } from '@/lib/utils'
import Image from 'next/image'

const DashboardSideBar = () => {
  return (
    <div
      className={cn(
        '   fixed top-0 left-4 h-[100vh] flex flex-col items-center justify-center py-4',
        ' !h-[100dvh]'
      )}
    >
      <div className='  w-[56px] h-full max-h-[300px] bg-[#F8F8F8] border border-[#EFEFEF] rounded-[20px] shadow-sm flex flex-col items-center justify-between py-[12px]'>
        <div className='flex flex-col items-center gap-6'>
          <div className='h-10 w-10 rounded-full '>
            <Image
              src='/logo/logo-icon.svg'
              alt='avatar'
              width={40}
              height={40}
              className='object-contain'
            />
          </div>
        </div>
        <div className=' flex flex-col gap-2'>
          <div className='flex flex-col bg-[#F1F1F1] h-10 w-10  rounded-[10px] items-center justify-center p-1'>
            <Image
              src='/icons/notification-bing.svg'
              alt='avatar'
              width={40}
              height={40}
              className=' w-[24px] h-[24px] object-contain'
            />
          </div>
          <div className='flex flex-col bg-[#F1F1F1] h-10 w-10  rounded-[10px] items-center justify-center p-1'>
            <Image
              src='/icons/setting-2.svg'
              alt='avatar'
              width={40}
              height={40}
              className=' w-[24px] h-[24px] object-contain'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSideBar
