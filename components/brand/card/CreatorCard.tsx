import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Heart, ArrowUpRight } from 'lucide-react'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { cn } from '@/lib/utils'

type Props = {
  name: string
  about: string
  image: string
  category: string
  tags: string[]
  location: string
}

export default function CreatorCard ({
  name,
  about,
  image,
  category,
  tags,
  location
}: Props) {
  const othersText = tags.join(',  ')
  return (
    <article className='bg-white  text-[14px] font-sans rounded-[24px]  overflow-hidden border border-[#EFEFEF]'>
      <div className=' flex flex-col md:flex-row gap-8 p-6'>
        <div className='relative w-full md:max-w-[460px] rounded-[24px] overflow-hidden'>
          <Image
            src={image}
            alt={name}
            width={800}
            height={800}
            quality={100}
            className=' w-full object-cover h-[360px] md:h-[560px] md:max-w-[460px] md:min-w-[200px] rounded-[24px]'
          />
          <div className='absolute inset-0 bg-black/[16%] rounded-[24px]' />
          <div className='absolute top-5 left-5 w-9 h-9 bg-white/10 border-[2px] border-white rounded-full flex items-center justify-center backdrop-blur'>
            <Heart className='w-5 h-5 text-white' />
          </div>
        </div>
        <div className='flex flex-1 flex-col max-w-[460px] justify-between'>
          <div>
            <h3 className='text-[24px] md:text-[28px] font-bold text-black'>
              {name}
            </h3>
            <div className='mt-2'>
              <p className='text-[14px] md:text-[15px] font-semibold text-black'>
                About
              </p>
              <p className='mt-1 text-[15px] md:text-[16px] text-[#808080]'>
                {about}
              </p>
            </div>
            <div className='mt-10 flex gap-2'>
              <button className='px-4 py-2 rounded-[14px] bg-primary text-white text-[15px]'>
                Get in touch
              </button>
            </div>
            <Link
              href={'#'}
              className='mt-4 inline-flex items-center gap-1 text-[#40444C] text-[15px]'
            >
              <span className=' italic'>View Full Profile</span>
              <ArrowUpRight className='w-3 h-3' />
            </Link>
          </div>

          <div className=' w-full'>
            <div className='mt-6 grid grid-cols-2 gap-8'>
              <div>
                <p className='text-[14px] md:text-[15px] font-semibold text-black'>
                  Category
                </p>
                <div className='mt-2 flex flex-wrap gap-2'>
                  <span className='inline-flex items-center px-4 h-8 rounded-full border border-[#EAEAEA] bg-white text-[14px] text-[#303030]'>
                    {category}
                  </span>
                </div>
              </div>
              <div>
                <p className='text-[14px] md:text-[15px] font-semibold text-black'>
                  Others
                </p>
                <div className='mt-2'>
                  <span className='inline-flex items-center px-4 h-8 rounded-full border border-[#EAEAEA] bg-white text-[14px] text-[#303030]'>
                    {othersText}
                  </span>
                </div>
              </div>
            </div>
            <div className='mt-6 flex items-center justify-between'>
              <div className='flex items-center gap-2 text-[#40444C] text-[15px] italic'>
                <MapPin className='w-4 h-4' />
                <span className=' leading-none'>{location}</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-9 h-9 rounded-[10px] border border-[#EAEAEA] bg-white flex items-center justify-center'>
                  <FaInstagram className='w-4 h-4 text-[#2F8D68]' />
                </div>
                <div className='w-9 h-9 rounded-[10px] border border-[#EAEAEA] bg-white flex items-center justify-center'>
                  <FaTiktok className='w-4 h-4 text-[#2F8D68]' />
                </div>
                <div className='w-9 h-9 rounded-[10px] border border-[#EAEAEA] bg-white flex items-center justify-center'>
                  <FaYoutube className='w-4 h-4 text-[#2F8D68]' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
