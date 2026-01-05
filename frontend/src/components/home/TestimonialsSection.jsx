'use client';

import React from 'react';
import { Quote, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function TestimonialsSection() {
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation({ threshold: 0.1 });

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Fitness Creator',
      avatar: 'SC',
      rating: 5,
      quote: 'Engazium transformed my Instagram growth. My engagement rate increased by 3x in just 2 months. The authentic community support is incredible!',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      name: 'Marcus Johnson',
      role: 'Tech Reviewer',
      avatar: 'MJ',
      rating: 5,
      quote: 'Finally, a platform that values real engagement over bots. My reach has grown organically, and I\'ve built genuine connections with other creators.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      name: 'Priya Sharma',
      role: 'Food Blogger',
      avatar: 'PS',
      rating: 5,
      quote: 'The niche matching is spot-on! I\'m in a squad with other food creators, and the engagement feels natural and authentic. Highly recommend!',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      name: 'Alex Rivera',
      role: 'Travel Influencer',
      avatar: 'AR',
      rating: 5,
      quote: 'Best investment for my content career. The analytics and tracking features help me understand what works. My posts now consistently hit the explore page.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'Emma Wilson',
      role: 'Fashion Creator',
      avatar: 'EW',
      rating: 5,
      quote: 'I was skeptical at first, but Engazium delivered. My follower growth is steady, and more importantly, my engagement is real. No shadowbans!',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      name: 'David Kim',
      role: 'Gaming Streamer',
      avatar: 'DK',
      rating: 5,
      quote: 'The squad system is brilliant. We support each other genuinely, and it shows in our metrics. My content now reaches the right audience consistently.',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-800 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="hidden md:block absolute top-20 left-20 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/30 rounded-full opacity-20 dark:opacity-10 blur-3xl"></div>
      <div className="hidden md:block absolute bottom-20 right-20 w-96 h-96 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-20 dark:opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div 
          ref={testimonialsRef}
          className={`text-center mb-8 sm:mb-12 lg:mb-16 ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}
        >
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-sm sm:text-base font-semibold rounded-lg mb-3 sm:mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 px-4">
            Loved by Creators
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
            See what creators are saying about their growth journey with Engazium
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i}
              className={`group relative bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 shadow-sm hover:shadow-xl hover:scale-105 ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star 
                    key={j} 
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" 
                  />
                ))}
              </div>

              {/* Testimonial Quote */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg flex-shrink-0`}>
                  {testimonial.avatar}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                    {testimonial.name}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Hover Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className={`mt-8 sm:mt-12 lg:mt-16 text-center ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 delay-500`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-semibold">
              4.9/5 from 2,500+ creators
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

