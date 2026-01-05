'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <HeroSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}