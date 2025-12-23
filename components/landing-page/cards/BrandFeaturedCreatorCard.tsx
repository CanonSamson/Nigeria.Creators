import Image from 'next/image'
import Link from 'next/link'

type Props = {
  name: string
  tags: string
  img: string
  priority?: boolean
}

const BrandFeaturedCreatorCard = ({ name, tags, img, priority }: Props) => {
  const parts = name.trim().split(/\s+/)
  const firstName = parts[0] || ''
  const lastName = parts.length > 1 ? parts.slice(1).join(' ') : ''
  return (

    <div className='relative w-[260px] max-w-[300px] min-w-[270px] h-[180px] md:w-[400px] md:h-[200px] rounded-[22px] overflow-hidden bg-[#EAEAEA] '>
      <Image
        src={img}
        alt={name}
        fill
        sizes='(max-width: 768px) 260px, 300px'
        className='object-cover'
        priority={priority}
      />
      <div className='absolute left-3 right-3 bottom-3'>
        <div className='rounded-[24px] bg-[#EFEFEF]/70 backdrop-blur-sm shadow-[0_6px_20px_rgba(0,0,0,0.12)] px-4 py-3 md:px-5 md:py-4'>
          <div className='flex items-center justify-between gap-3'>
            <div className='min-w-0'>
              <p className='text-[15px] flex md:text-[16px] font-semibold text-black tracking-tight truncate'>
                <span>{firstName}</span>
                {lastName ? (
                  <span className='ml-1 overflow-visible relative flex items-center justify-center '>
                    <Image
                      src='/icons/borders.svg'
                      alt=''
                      width={120}
                      height={24}
                      className='absolute  h-5 md:h-6 w-auto pointer-events-none select-none'
                      priority={false}
                      quality={100}
                    />
                    {lastName}
                  </span>
                ) : null}
              </p>
              <p className='text-[12px] md:text-[13px] text-[#969696] truncate'>
                {tags}
              </p>
            </div>
            <Link
              href='/brands/register'
              className='inline-flex leading-none items-center tracking-tighter px-2 md:px-3 h-9 md:h-10  rounded-full bg-[#327468] text-white text-[8px] md:text-[10px] font-semibold shadow-[0_4px_12px_rgba(50,116,104,0.35)] transform origin-center rotate-[-12deg] md:rotate-[-8deg]'
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandFeaturedCreatorCard
