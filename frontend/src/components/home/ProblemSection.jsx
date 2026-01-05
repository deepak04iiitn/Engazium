'use client';

import React from 'react';
import { Clock, TrendingUp, Shield } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ProblemSection() {
  const [problemRef, problemVisible] = useScrollAnimation({ threshold: 0.1 });

  const problems = [
    { 
      icon: Clock, 
      title: 'The Golden Hours', 
      desc: 'First 2-4 hours determine if your content gets amplified or buried', 
      bgColor: 'bg-rose-50 dark:bg-rose-900/30',
      iconBg: 'bg-rose-50 dark:bg-rose-900/30',
      iconColor: 'text-rose-600 dark:text-rose-400',
      borderHover: 'hover:border-rose-200 dark:hover:border-rose-500/50'
    },
    { 
      icon: TrendingUp, 
      title: 'Algorithm Battle', 
      desc: 'Low initial engagement signals poor content quality to platforms', 
      bgColor: 'bg-orange-50 dark:bg-orange-900/30',
      iconBg: 'bg-orange-50 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      borderHover: 'hover:border-orange-200 dark:hover:border-orange-500/50'
    },
    { 
      icon: Shield, 
      title: 'Risky Shortcuts', 
      desc: 'Bot services and spam pods lead to shadowbans and account penalties', 
      bgColor: 'bg-red-50 dark:bg-red-900/30',
      iconBg: 'bg-red-50 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400',
      borderHover: 'hover:border-red-200 dark:hover:border-red-500/50'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={problemRef}
          className={`text-center mb-8 sm:mb-12 lg:mb-16 ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}
        >
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm sm:text-base font-semibold rounded-lg mb-3 sm:mb-4">
            The Problem
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 max-w-3xl mx-auto px-4">
            Great content deserves to be seen
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
            But algorithms need early signals to amplify your reach
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {problems.map((item, i) => (
            <div 
              key={i}
              className={`p-6 sm:p-8 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border-2 border-transparent ${item.borderHover} transition-all duration-300 ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 ${item.iconBg} rounded-xl flex items-center justify-center mb-4 sm:mb-6`}>
                <item.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${item.iconColor}`} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

