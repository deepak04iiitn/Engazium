'use client';

import React from 'react';
import { UserPlus, Rocket, Heart, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function TargetAudienceSection() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });

  const audienceFeatures = [
    {
      icon: UserPlus,
      title: 'Micro Creators',
      desc: 'Just starting your journey? Perfect. We\'re built for creators with smaller, growing audiences who need authentic engagement to break through.',
      gradient: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      icon: Rocket,
      title: 'Early Stage Creators',
      desc: 'Building your first 1K-10K followers? This is your platform. Get the early engagement boost that helps algorithms discover your content.',
      gradient: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      icon: Heart,
      title: 'Authentic Growth',
      desc: 'No shortcuts, no bots. Just real creators supporting each other to build genuine communities and sustainable reach.',
      gradient: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      iconBg: 'bg-pink-100 dark:bg-pink-900/30',
      iconColor: 'text-pink-600 dark:text-pink-400'
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="hidden md:block absolute top-10 left-10 w-64 h-64 bg-amber-100 dark:bg-amber-900/20 rounded-full opacity-30 dark:opacity-10 blur-3xl"></div>
      <div className="hidden md:block absolute bottom-10 right-10 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/20 rounded-full opacity-20 dark:opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div 
          ref={sectionRef}
          className={`text-center mb-12 sm:mb-16 lg:mb-20 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-indigo-50 dark:from-amber-900/30 dark:to-indigo-900/30 border border-amber-200 dark:border-amber-700/50 rounded-full mb-6 shadow-sm">
            <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
              Built For You
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 max-w-4xl mx-auto px-4 leading-tight">
            Designed for Micro & Early Creators
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto px-4 leading-relaxed">
            Whether you're just starting out or building your first meaningful audience, Engazium is your platform. 
            We understand the unique challenges of early-stage creators and provide the authentic engagement you need to grow.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {audienceFeatures.map((feature, i) => (
            <div 
              key={i}
              className={`group relative ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300`}></div>
              
              <div className={`relative ${feature.bgColor} p-6 sm:p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1`}>
                <div className={`w-14 h-14 sm:w-16 sm:h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${feature.iconColor}`} />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

