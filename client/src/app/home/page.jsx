import HeroSection from '@/components/home/HeroSection'
import MarqueeSection from '@/components/home/MarqueeSection'
import BentoFeaturesSection from '@/components/home/BentoFeaturesSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import PricingSection from '@/components/home/PricingSection'
import FAQSection from '@/components/home/FAQSection'
import React from 'react'

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <BentoFeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  )
}
