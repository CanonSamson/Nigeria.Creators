'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { useRef, useState } from 'react'

const CreatorsListSection = () => {
  const [progress, setProgress] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const initialIndex = 1
  return (
    <section className=' w-full '>
      <div className=' w-full '>
        <div className=' mx-auto  flex flex-col items-center'>
          <h3 className=' text-[24px] md:text-[32px] font-bold text-black tracking-tighter'>
            Nigeria&apos;s Top Creators
          </h3>
          <p className=' mt-2 text-text-color-200 text-[14px] md:text-[16px]'>
            Across Every Niche Including:
          </p>

          <div className=' mt-10 w-full overflow-visible'>
            <Swiper
              className=' overflow-visible'
              spaceBetween={10}
              slidesPerView={1.5}
              centeredSlides
              initialSlide={initialIndex}
              onSwiper={s => (swiperRef.current = s)}
              onProgress={(_, p) => setProgress(p)}
              breakpoints={{
                641: { slidesPerView: 2.2, spaceBetween: 10 },
                768: { slidesPerView: 3.5, spaceBetween: 10 },
                1024: { slidesPerView: 5, spaceBetween: 10 },
                2024: { slidesPerView: 8, spaceBetween: 10 }
              }}
            >
              {cards.map(card => (
                <SwiperSlide key={card.alt}>
                  <div className=' bg-amber-300'>
                    <article role='group' aria-label={card.alt} className=' '>
                      <div className=' relative rounded-[20px] overflow-hidden bg-[#F3F3F3]'>
                        <div className=' absolute inset-0 bg-gradient-to-b from-[#d1d1d1] to-transparent opacity-60' />
                        <Image
                          src={card.src}
                          alt={card.alt}
                          width={300}
                          height={420}
                          className=' w-full h-[300px] md:h-[350px] object-cover'
                        />
                        <div className=' absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur text-[12px] md:text-[13px]'>
                          <span>{card.flag}</span>
                          <span className=' text-black'>{card.city}</span>
                        </div>
                        {card.message && (
                          <div className=' absolute left-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-[#F9C5DB] text-[#6E4D5A] text-[12px] md:text-[13px]'>
                            {card.message}
                          </div>
                        )}
                        <div className=' absolute bottom-4 left-4 text-white text-[14px] font-medium drop-shadow'>
                          {card.name}
                        </div>
                      </div>
                    </article>
                  </div>
                </SwiperSlide>
              ))}
              <SwiperSlide>
                <div className=' px-3 md:px-4'>
                  <article
                    role='group'
                    aria-label='Join Our Community'
                    className=' w-[150px] sm:w-[200px] md:w-[300px]'
                  >
                    <Link
                      href='/community'
                      aria-label='Join Our Community'
                      className=' block rounded-[20px] h-[300px] md:h-[350px] bg-[#DFE2EB] text-black hover:bg-primary hover:text-white transition-colors duration-300'
                    >
                      <div className=' w-full h-full flex items-center justify-center px-6'>
                        <span className=' text-[14px] md:text-[16px] font-semibold'>
                          Join Our Community
                        </span>
                      </div>
                    </Link>
                  </article>
                </div>
              </SwiperSlide>
            </Swiper>

            <div className=' mx-auto max-w-[1100px]  pb-20'>
              <div className=' mt-10 w-full flex items-center gap-4 pb-20'>
                <div className=' relative w-full h-[6px] rounded-full bg-[#EAEAEA]'>
                  <div
                    className=' absolute left-0 top-0 h-[6px] rounded-full bg-primary'
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className=' h-8 w-8 rounded-full bg-[#DFE2EB] flex items-center justify-center'
                >
                  <ChevronLeft className=' h-4 w-4' />
                </button>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className=' h-8 w-8 rounded-full bg-[#DFE2EB] flex items-center justify-center'
                >
                  <ChevronRight className=' h-4 w-4' />
                </button>
              </div>

              <button className=' mx-auto flex justify-center items-center text-[18px] tracking-tight  h-[60px] px-4 rounded-[16px] bg-primary text-white font-semibold'>
                Apply as Content Creator
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const cards = [
  {
    src: '/hero/1.png',
    alt: 'Fitness and lifestyle creator',
    name: 'Manel',
    city: 'Paris',
    flag: '🇫🇷'
  },
  {
    src: '/hero/2.png',
    alt: 'Digital marketing creator',
    name: 'Angee',
    city: 'London',
    flag: '🇬🇧',
    message: 'Send us a DM'
  },
  {
    src: '/hero/3.png',
    alt: 'Lifestyle and home creator',
    name: 'Irene',
    city: 'Milan',
    flag: '🇮🇹'
  },
  {
    src: '/hero/4.png',
    alt: 'Editing vlogs tutorial creator',
    name: 'Leo',
    city: 'Berlin',
    flag: '🇩🇪'
  },
  {
    src: '/hero/5.png',
    alt: 'Tech and productivity creator',
    name: 'Naomi',
    city: 'Rotterdam',
    flag: '🇳🇱'
  },
  {
    src: '/hero/6.png',
    alt: 'Food and wellness creator',
    name: 'Roksana',
    city: 'Warsaw',
    flag: '🇵🇱'
  }
]

export default CreatorsListSection
