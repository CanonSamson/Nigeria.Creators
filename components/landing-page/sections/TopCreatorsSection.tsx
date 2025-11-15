'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

const TopCreatorsSection = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const computeOffsets = () => {
      const articles = wrapper.querySelectorAll('article')
      if (!articles.length) return { offsetStart: 0, offsetEnd: 0 }
      const first = articles[0] as HTMLElement
      const last = articles[articles.length - 1] as HTMLElement
      const firstRect = first.getBoundingClientRect()
      const lastRect = last.getBoundingClientRect()
      const wrapperRect = wrapper.getBoundingClientRect()
      const viewportCenter = wrapperRect.width / 2
      const firstCenter =
        firstRect.left - wrapperRect.left + firstRect.width / 2
      const lastCenter = lastRect.left - wrapperRect.left + lastRect.width / 2
      const offsetStart = viewportCenter - firstCenter
      const offsetEnd = viewportCenter - lastCenter
      return { offsetStart, offsetEnd }
    }
    let { offsetStart, offsetEnd } = computeOffsets()
    gsap.set(wrapper, { x: offsetStart })
    const tl = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: '+=900vh',
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: self => {
        const x = offsetStart + (offsetEnd - offsetStart) * self.progress
        gsap.set(wrapper, { x, duration: 0.5, ease: 'power3.inOut' })
      },
      onRefresh: self => {
        const p = self.progress
        ;({ offsetStart, offsetEnd } = computeOffsets())
        const x = offsetStart + (offsetEnd - offsetStart) * p
        gsap.set(wrapper, { x, duration: 0.5, ease: 'power3.inOut' })
        console.log(self.progress)
      }
    })

    return () => {
      tl.kill()
    }
  }, [])
  return (
    <section className=' pb-[1000px] w-full overflow-hidden'>
      <div className=' w-full px-6 md:px-10 '>
        <div className='h-[100dvh] pt-[20vh] relative   mx-auto max-w-[1100px]  overflow-visible  flex flex-col items-center'>
          <h3 className=' text-[24px] md:text-[32px] font-bold text-black  tracking-tighter'>
            Nigeria's Top Creators
          </h3>
          <p className=' mt-2 text-text-color-200 text-[14px] md:text-[16px]'>
            Across Every Niche Including:
          </p>

          <div
            ref={wrapperRef}
            className='h-[100dvh]  top-0 absolute    w-full  overflow-visible'
          >
            <div className=' invisible pt-[20vh]'>
              <h2 className=' text-[24px] md:text-[32px] font-bold text-black tracking-tighter'>
                Nigeria's Top Creators
              </h2>
              <p className=' mt-2 text-text-color-200 text-[14px] md:text-[16px]'>
                Across Every Niche Including:
              </p>
            </div>
            <div className=' mt-16  flex gap-4 left-[50%]  md:gap-6'>
              {cards.map((card, idx) => (
                <article
                  id={idx < 4 ? `card-${idx + 1}` : undefined}
                  key={card.alt}
                  role='group'
                  aria-label={card.alt}
                  className=' snap-center shrink-0 w-[220px] sm:w-[260px] md:w-[300px]'
                >
                  <div className=' rounded-[20px] overflow-hidden bg-white'>
                    <Image
                      src={card.src}
                      alt={card.alt}
                      width={1000}
                      height={1000}
                      className=' w-full h-[360px] md:h-[50vh] object-cover'
                    />
                  </div>
                </article>
              ))}

              <article
                role='group'
                aria-label='Join Our Community'
                className=' snap-center shrink-0 w-[220px] sm:w-[260px] md:w-[300px]'
              >
                <Link
                  href='/community'
                  aria-label='Join Our Community'
                  className=' block rounded-[20px] h-[360px] md:h-[50vh] duration-300 transition-colors hover:bg-primary text-primary hover:text-white focus:outline-none  '
                >
                  <div className=' w-full h-full flex items-center justify-start px-6'>
                    <span className='  text-[14px] md:text-[16px] font-medium'>
                      →
                    </span>
                    <span className=' ml-3  text-[14px] md:text-[16px] font-semibold'>
                      Join Our Community
                    </span>
                  </div>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const cards = [
  { src: '/hero/1.png', alt: 'Fitness and lifestyle creator' },
  { src: '/hero/2.png', alt: 'Digital marketing creator' },
  { src: '/hero/3.png', alt: 'Lifestyle and home creator' },
  { src: '/hero/4.png', alt: 'Editing vlogs tutorial creator' },
  { src: '/hero/5.png', alt: 'Tech and productivity creator' },
  { src: '/hero/6.png', alt: 'Food and wellness creator' }
]

export default TopCreatorsSection
