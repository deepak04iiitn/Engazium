import HeroSection from '@/components/home/HeroSection'
import MarqueeSection from '@/components/home/MarqueeSection'
import BentoFeaturesSection from '@/components/home/BentoFeaturesSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import CTASection from '@/components/home/CTASection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import PricingSection from '@/components/home/PricingSection'
import FAQSection from '@/components/home/FAQSection'
import React from 'react'

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <HeroSection />
      <MarqueeSection />
      <BentoFeaturesSection />
      
      {/* Subtle gradient divider */}
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border/50 dark:via-border/30 to-transparent" />
      </div>
      
      <HowItWorksSection />
      <CTASection />
      
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border/50 dark:via-border/30 to-transparent" />
      </div>
      
      {/* <PricingSection /> */}
      <TestimonialsSection />
      <FAQSection />
    </main>
  )
}
