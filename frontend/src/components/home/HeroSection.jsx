'use client';

import React, { useEffect } from 'react';
import { Users, TrendingUp, MessageCircle, Zap, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';

export default function HeroSection() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.3 });

  const [creatorsCount, startCreators] = useCountUp(10, 2000, 0);
  const [postsCount, startPosts] = useCountUp(50, 2000, 0);
  const [reachCount, startReach] = useCountUp(3, 1500, 0);

  useEffect(() => {
    if (statsVisible) {
      startCreators();
      startPosts();
      startReach();
    }
  }, [statsVisible, startCreators, startPosts, startReach]);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden py-12 sm:py-16 lg:py-0">
      {/* Decorative Elements */}
      <div className="hidden md:block absolute top-20 right-20 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/30 rounded-full opacity-30 dark:opacity-20 blur-3xl"></div>
      <div className="hidden md:block absolute bottom-20 left-20 w-96 h-96 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-20 dark:opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div ref={heroRef} className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000 text-center lg:text-left`}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full mb-6 sm:mb-8 shadow-sm">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Trusted by 10K+ creators</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Grow Your
              <span className="block text-indigo-600 dark:text-indigo-400 mt-1 sm:mt-2">Engagement</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Join authentic creator communities. Get real engagement. Build meaningful reach. No bots, no spam—just genuine support.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
              <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 dark:bg-indigo-500 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-500/30">
                Start Free Trial
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm sm:text-base font-semibold rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 shadow-sm">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div 
            ref={statsRef}
            className={`${statsVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-8 translate-y-8'} transition-all duration-1000 delay-300 mt-8 lg:mt-0`}
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="col-span-2 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-2">{creatorsCount}K+</div>
                    <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">Active Creators</div>
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{postsCount}K+</div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Posts Boosted</div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{reachCount}x</div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Avg Reach</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

