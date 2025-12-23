'use client'
import Image from 'next/image'
import { ReactNode, useRef } from 'react'
import { Play } from 'lucide-react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface SolutionDemoCardProps {
  title: ReactNode
  imageSrc: string
  backgroundContent?: ReactNode
  buttonType?: 'primary' | 'play-icon'
  buttonLabel?: string
  onWatch?: () => void
  showButtonOnHover?: boolean
}

const SolutionDemoCard = ({
  title,
  imageSrc,
  backgroundContent,
  buttonType = 'primary',
  buttonLabel = 'Watch',
  onWatch,
  showButtonOnHover = true
}: SolutionDemoCardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(-10)
  const y = useMotionValue(-10)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top - 20 + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className='group relative overflow-hidden rounded-[32px] bg-gray-50 aspect-[4/3] md:aspect-[16/10] border border-gray-100'
    >
      {/* Background */}
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={typeof title === 'string' ? title : 'Demo Video'}
          fill
          className='object-cover'
        />
      ) : (
        backgroundContent
      )}

      {/* Overlay Gradient */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none' />

      {/* Content */}
      <div className='absolute inset-0 flex flex-col justify-between p-8 z-30 pointer-events-none'>
        <div
          className={`flex justify-center items-center h-full transition-opacity ${
            showButtonOnHover ? 'opacity-0 group-hover:opacity-100' : ''
          }`}
        >
          <motion.button
            onClick={onWatch}
            aria-label={buttonLabel}
            style={{ x: springX, y: springY }}
            className='bg-primary z-30 hover:bg-[#25574c] text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg flex items-center gap-2 pointer-events-auto'
          >
            {buttonType === 'primary' ? (
              buttonLabel
            ) : (
              <Play className='w-6 h-6 fill-current' />
            )}
          </motion.button>
        </div>

        <h3 className='text-white leading-none tracking-tighter text-[24px] md:text-[28px] font-bold drop-shadow-md text-left'>
          {title}
        </h3>
      </div>
    </div>
  )
}

export default SolutionDemoCard
