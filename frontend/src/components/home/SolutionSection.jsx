'use client';

import React from 'react';
import { Users, Shield, Award, Search, UserPlus, Share2, Heart, BarChart3, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function SolutionSection() {
  const [solutionRef, solutionVisible] = useScrollAnimation({ threshold: 0.1 });

  const features = [
    { icon: Users, title: 'Niche Squads', desc: 'Join groups of 10-30 micro-creators in your field who share similar audiences and goals', number: '01' },
    { icon: Shield, title: 'Safe Engagement', desc: 'Manual, time-distributed interactions that platforms love and reward', number: '02' },
    { icon: Award, title: 'Real Growth', desc: 'Track weekly metrics and watch your organic reach expand sustainably', number: '03' }
  ];

  const steps = [
    { 
      title: 'Choose Niche', 
      icon: Search,
      desc: 'Select your content category',
      bgColor: 'bg-blue-500'
    },
    { 
      title: 'Join Squad', 
      icon: UserPlus,
      desc: 'Connect with like-minded micro-creators',
      bgColor: 'bg-indigo-500'
    },
    { 
      title: 'Share Posts', 
      icon: Share2,
      desc: 'Post your content to the squad',
      bgColor: 'bg-purple-500'
    },
    { 
      title: 'Engage Authentically', 
      icon: Heart,
      desc: 'Support others genuinely',
      bgColor: 'bg-pink-500'
    },
    { 
      title: 'Track Growth', 
      icon: BarChart3,
      desc: 'Monitor your progress',
      bgColor: 'bg-rose-500'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="hidden md:block absolute top-20 right-20 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/30 rounded-full opacity-30 dark:opacity-20 blur-3xl"></div>
      <div className="hidden md:block absolute bottom-20 left-20 w-96 h-96 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-20 dark:opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div 
          ref={solutionRef}
          className={`text-center mb-8 sm:mb-12 lg:mb-16 ${solutionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}
        >
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-sm sm:text-base font-semibold rounded-lg mb-3 sm:mb-4">
            The Solution
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 max-w-3xl mx-auto px-4">
            How Engazium Works
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
            A structured ecosystem where creators support each other authentically
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {features.map((item, i) => (
            <div 
              key={i}
              className={`relative ${solutionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-100 dark:text-slate-700/50 z-0">
                {item.number}
              </div>
              <div className="relative bg-slate-50 dark:bg-slate-700/50 p-6 sm:p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-600 h-full hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4 sm:mb-6 relative z-10">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 relative z-10">{item.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <div className={`relative ${solutionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 delay-500`}>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 px-4">Your Journey in 5 Steps</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 px-4">Simple, streamlined, and effective</p>
          </div>
          
          <div className="relative">
            {/* Connecting Line - Desktop */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 dark:from-indigo-800 dark:via-purple-800 dark:to-indigo-800"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-4">
              {steps.map((step, i) => (
                <div 
                  key={i}
                  className="relative group"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Step Card */}
                  <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg z-10">
                      {i + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 mt-2 rounded-2xl ${step.bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1 sm:mb-2 text-center">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center leading-relaxed">
                      {step.desc}
                    </p>
                    
                    {/* Hover Effect */}
                    <div className={`absolute inset-0 ${step.bgColor} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
                  </div>
                  
                  {/* Connecting Arrow - Mobile/Tablet */}
                  {i < 4 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ArrowRight className="w-6 h-6 text-slate-400 dark:text-slate-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

