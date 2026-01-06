'use client';

import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/home/HeroSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import CTASection from '@/components/home/CTASection';
import ProblemSection from '@/components/home/ProblemSection';
import SolutionSection from '@/components/home/SolutionSection';

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Helmet>
        <title>Engazium - Authentic Engagement for Small & Early Creators</title>
        <meta 
          name="description" 
          content="Engazium connects small and early creators with real audiences for authentic engagement. Grow your reach through genuine community connections, not bots or fake metrics." 
        />
        <meta 
          name="keywords" 
          content="Engazium, small creators, early creators, authentic engagement, social media growth, content creators, creator platform, engagement platform, creator community, organic growth" 
        />
      </Helmet>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}

