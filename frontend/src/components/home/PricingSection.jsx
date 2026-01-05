'use client';

import React from 'react';
import { Package, Rocket, Award, Check, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function PricingSection() {
  const [pricingRef, pricingVisible] = useScrollAnimation({ threshold: 0.1 });

  const plans = [
    { 
      name: 'Core', 
      price: '₹50', 
      desc: 'Perfect for starting creators',
      features: ['10 squad members', '1 post/day/member', '3 squads max', 'Spam protection', 'Niche matching'],
      highlight: false,
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Growth', 
      price: '₹100', 
      desc: 'Most popular choice',
      features: ['20 squad members', '2 posts/day/member', '1 squad max', 'Spam protection', 'Niche matching', 'Priority support'],
      highlight: true,
      gradient: 'from-indigo-500 via-purple-500 to-pink-500'
    },
    { 
      name: 'Momentum', 
      price: '₹150', 
      desc: 'For power creators',
      features: ['30 squad members', '3 posts/day/member', '1 squad max', 'Spam protection', 'Niche matching', 'Priority support', 'Analytics'],
      highlight: false,
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={pricingRef}
          className={`text-center mb-8 sm:mb-12 lg:mb-16 ${pricingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}
        >
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-sm sm:text-base font-semibold rounded-lg mb-3 sm:mb-4">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 px-4">
            Choose Your Squad
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
            Flexible plans that grow with you. Cancel anytime.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i}
              className={`relative group ${pricingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Gradient Background for Highlight Card */}
              {plan.highlight && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-75 dark:opacity-50 group-hover:opacity-100 transition duration-300"></div>
              )}
              
              <div className={`relative bg-white dark:bg-slate-800 rounded-2xl border-2 p-6 sm:p-8 h-full flex flex-col transition-all duration-300 ${
                plan.highlight 
                  ? 'border-indigo-500 dark:border-indigo-400 shadow-2xl shadow-indigo-500/20 dark:shadow-indigo-500/30 lg:scale-105' 
                  : 'border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:scale-105 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}>
                {plan.highlight && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-4 sm:px-5 py-1 sm:py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg flex items-center gap-1.5">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />
                    Popular
                  </div>
                )}
                
                <div className="mb-4 sm:mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl mb-3 sm:mb-4 ${
                    plan.highlight 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
                      : 'bg-slate-100 dark:bg-slate-700'
                  }`}>
                    {plan.highlight ? (
                      <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    ) : plan.name === 'Core' ? (
                      <Package className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400" />
                    ) : (
                      <Award className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">{plan.name} Squad</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{plan.desc}</p>
                </div>
                
                <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r ${
                      plan.highlight 
                        ? 'from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400' 
                        : 'from-slate-900 to-slate-700 dark:from-white dark:to-slate-300'
                    } bg-clip-text text-transparent`}>
                      {plan.price}
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 sm:gap-3 group/item">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                        plan.highlight
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 group-hover/item:scale-110'
                          : 'bg-indigo-50 dark:bg-indigo-900/30 group-hover/item:bg-indigo-100 dark:group-hover/item:bg-indigo-900/50'
                      }`}>
                        <Check className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          plan.highlight ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'
                        }`} />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/50 dark:shadow-indigo-500/30'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-600'
                }`}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

