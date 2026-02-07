import Footer from '@/components/Footer'
import CTASection from '@/components/home/CTASection'
import FAQSection from '@/components/home/FAQSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import HeroSection from '@/components/home/HeroSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import PricingSection from '@/components/home/PricingSection'
import ProblemSection from '@/components/home/ProblemSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import Navbar from '@/components/Navbar'
import React from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
