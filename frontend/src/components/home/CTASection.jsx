'use client';

import React from 'react';
import { Rocket, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function CTASection() {
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-indigo-900/20 dark:to-purple-900/20 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Elements */}
      <div className="hidden md:block absolute top-20 right-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/40 rounded-full opacity-40 dark:opacity-20 blur-3xl"></div>
      <div className="hidden md:block absolute bottom-20 left-20 w-96 h-96 bg-purple-200 dark:bg-purple-900/40 rounded-full opacity-30 dark:opacity-15 blur-3xl"></div>
      
      <div 
        ref={ctaRef}
        className={`max-w-4xl mx-auto px-4 sm:px-6 text-center relative ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}
      >
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-full mb-4 sm:mb-6">
          <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs sm:text-sm font-medium text-indigo-700 dark:text-indigo-300">Ready to grow?</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
          Start Growing Today
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
          Join 10,000+ creators building authentic engagement and expanding their reach
        </p>
        
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <button className="group px-8 sm:px-10 py-4 sm:py-5 bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-base sm:text-lg rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 inline-flex items-center justify-center gap-2 sm:gap-3 shadow-lg shadow-indigo-600/30 dark:shadow-indigo-500/30 hover:scale-105 transform">
            Get Started Free
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 sm:px-10 py-4 sm:py-5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-base sm:text-lg rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 shadow-sm hover:scale-105 transform">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

