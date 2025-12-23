import BrandHeroSection from '@/components/landing-page/sections/BrandHeroSection'
import Footer from '@/components/landing-page/sections/Footer'
import Navbar from '@/components/navigation/Navbar'
import BrandFeaturedCreatorsSection from '@/components/landing-page/sections/BrandFeaturedCreatorsSection'
import BrandBusinessSolutionsSection from '@/components/landing-page/sections/BrandBusinessSolutionsSection'
import BrandCalendlySection from '@/components/landing-page/sections/BrandCalendlySection'
import BrandPricingSection from '@/components/landing-page/sections/BrandPricingSection'
import CreatorsListSection from '@/components/landing-page/sections/CreatorsListSection'
import FAQSection from '@/components/landing-page/sections/FAQSection'

const Brands = () => {
  return (
    <div className='font-sans min-h-screen '>
      <div id='top' />
      <Navbar />
      <BrandHeroSection />
      <BrandFeaturedCreatorsSection />
      <BrandBusinessSolutionsSection />
      <BrandCalendlySection />
      <BrandPricingSection />
      <CreatorsListSection />
      <FAQSection />
      <Footer />
    </div>
  )
}

export default Brands
