import FeaturesSection from '@/components/landing-page/sections/FeaturesSection'
import TopCreatorsSection from '@/components/landing-page/sections/TopCreatorsSection'
import HeroSection from '@/components/landing-page/sections/HeroSection'
import Navbar from '@/components/navigation/Navbar'
import CreatorsListSection from '@/components/landing-page/sections/CreatorsListSection'
import FAQSection from '@/components/landing-page/sections/FAQSection'
import Footer from '@/components/landing-page/sections/Footor'

export default function Home () {
  return (
    <div className='font-sans min-h-screen '>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TopCreatorsSection />
      <CreatorsListSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
