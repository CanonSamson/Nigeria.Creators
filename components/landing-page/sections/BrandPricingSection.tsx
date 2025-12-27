'use client'

import { mixpanelService } from '@/services/mixpanel'
import PricingCard from '../cards/PricingCard'
import { useRouter } from 'next/navigation'

const BrandPricingSection = () => {
  const router = useRouter()
  const featuresFree = ['Unlock creator database', 'Basic analytics dashboard']

  const featuresTeam = [
    'unlock creator database',
    '3 team members',
    'We negotiate with creators on your behalf',
    'We manage creators on your behalf'
  ]

  return (
    <section className='w-full py-20 bg-white'>
      <div className='max-w-[1200px] mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-[32px] md:text-[48px] font-bold text-black tracking-tighter mb-4'>
            Simple Transparent Pricing
          </h2>
          <p className='text-gray-600 text-[16px] md:text-[18px] max-w-[600px] mx-auto'>
            Choose the perfect plan for your brand all plans include access to
            our curated network of Nigerian creators
          </p>
        </div>

        {/* Cards Container */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto'>
          {/* Free Card */}
          <PricingCard
            title='Free'
            price='₦0'
            period='/mo'
            billingInfo='Billed monthly'
            description='Perfect for small brands testing the waters'
            buttonText='Get Started'
            onButtonClick={() => {
              mixpanelService.track('CLICK_PRICING_FREE', {
                location: 'pricing_section'
              })
              router.push(`/brands/register`)
            }}
            features={featuresFree}
            variant='default'
            buttonVariant='black'
          />

          {/* Team Card */}
          <PricingCard
            title='Team'
            price='Custom'
            description='Full management, Everything you need to grow your business.'
            buttonText='Contact Sales'
            onButtonClick={() =>
              mixpanelService.track('CLICK_PRICING_TEAM', {
                location: 'pricing_section'
              })
            }
            features={featuresTeam}
            variant='highlighted'
            buttonVariant='green'
          />
        </div>
      </div>
    </section>
  )
}

export default BrandPricingSection
