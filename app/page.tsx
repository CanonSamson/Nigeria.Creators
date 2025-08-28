import FeaturesSection from '@/components/landing-page/sections/FeaturesSection'
import HeroSection from '@/components/landing-page/sections/HeroSection'
import Navbar from '@/components/navigation/Navbar'

export default function Home () {
  return (
    <div className='font-sans min-h-screen'>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}
