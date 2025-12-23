"use client"
import BrandFeaturedCreatorCard from '@/components/landing-page/cards/BrandFeaturedCreatorCard'
import { animate, motion, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import { useEffect } from "react";

const BrandFeaturedCreatorsSection = () => {
  
  const items = [
    { name: 'Ada Okoye', tags: 'Fashion, Beauty', img: '/placeholder/profile.svg' },
    { name: 'Bola Adeyemi', tags: 'Tech, UGC', img: '/placeholder/profile.svg' },
    { name: 'Chima Nwosu', tags: 'Travel, Culture', img: '/placeholder/profile.svg' },
    { name: 'Zainab Bello', tags: 'Cooking, Family', img: '/placeholder/profile.svg' },
    { name: 'Ifeanyi Okafor', tags: 'Business, Finance', img: '/placeholder/profile.svg' },
    { name: 'Tolu Ogunlesi', tags: 'Health, Wellness', img: '/placeholder/profile.svg' },
    { name: 'Amaka Eze', tags: 'Art, Creativity', img: '/placeholder/profile.svg' },
    { name: 'Kelechi Umeh', tags: 'Faith, Motivation', img: '/placeholder/profile.svg' }
  ]

  const duplicatedItems = [...items, ...items];

  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  useEffect(() => {
    if (width === 0) return;

    // gap-6 is 24px (1.5rem)
    const gap = 24;
    // We scroll by half the total width + half a gap to align perfectly
    // Total width = (W_items * 2) + (gap * (2N - 1))
    // We want to scroll by W_items + (gap * N)
    // Actually, simple math:
    // If we have [A, B, A, B] with gaps between all.
    // Distance from start of first A to start of second A is what we need.
    // Width measured = wA + g + wB + g + wA + g + wB
    // Distance to scroll = wA + g + wB + g
    // Width / 2 = wA + wB + 1.5g
    // Distance = Width/2 + 0.5g = (Width + g) / 2
    const finalPosition = -(width + gap) / 2;
    
    const duration = 50; // Adjust speed (seconds)

    const controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: duration,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return () => {
      controls.stop();
    };
  }, [xTranslation, width]);

  return (
    <section className='w-full bg-[#F5FFFD] relative overflow-hidden'>
      <div className='  absolute bg-gradient-to-r from-[rgb(245,246,248)] to-transparent w-[10%] left-0 top-0 h-full z-30 ' />
      <div className='max-w-[1300px] mx-auto px-4 py-5 overflow-hidden'>
          <motion.div 
            ref={ref}
            className='flex gap-4 w-max'
            style={{ x: xTranslation }}
            onHoverStart={() => {
                // Optional: pause on hover
                // animate(xTranslation, xTranslation.get(), { type: "tween" }) 
                // But this requires more complex state management to resume.
                // Keeping it simple for now.
            }}
          >
            {duplicatedItems.map((c, i) => (
              <BrandFeaturedCreatorCard
                key={`${c.name}-${i}`}
                name={c.name}
                tags={c.tags}
                img={c.img}
                priority={i < 4}
              />
            ))}
          </motion.div>
      </div>
      <div className='  absolute bg-gradient-to-l from-[rgb(245,246,248)] to-transparent w-[10%] right-0 top-0 h-full z-30 ' />

    </section>
  )
}

export default BrandFeaturedCreatorsSection
