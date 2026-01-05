'use client';

import React from 'react';
import { Target, Users, Zap, Heart, TrendingUp, Award, Lightbulb, Shield } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [missionRef, missionVisible] = useScrollAnimation({ threshold: 0.2 });
  const [valuesRef, valuesVisible] = useScrollAnimation({ threshold: 0.2 });
  const [storyRef, storyVisible] = useScrollAnimation({ threshold: 0.2 });
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.3 });

  const values = [
    {
      icon: Heart,
      title: 'Authenticity First',
      description: 'We believe in genuine connections. No bots, no fake engagement—just real small and early creators supporting real small and early creators.',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/30'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Your privacy and security are paramount. We build with transparency and protect your data at every step.',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously evolve our platform to meet the changing needs of small and early creators in the digital landscape.',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/30'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We foster meaningful connections and support networks that help small and early creators grow together, not alone.',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/30'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Small & Early Creators', icon: Users },
    { number: '50K+', label: 'Posts Boosted', icon: TrendingUp },
    { number: '3x', label: 'Avg Reach Increase', icon: Award },
    { number: '99%', label: 'Satisfaction Rate', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
      >
        <div className="hidden md:block absolute top-20 right-20 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/30 rounded-full opacity-30 dark:opacity-20 blur-3xl"></div>
        <div className="hidden md:block absolute bottom-20 left-20 w-96 h-96 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-20 dark:opacity-10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000 text-center max-w-4xl mx-auto`}>
            <div className="flex justify-center mb-8">
              <img 
                src="/Engazium_Logo.png" 
                alt="Engazium Logo" 
                className={`w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain ${heroVisible ? 'animate-roll-in' : 'opacity-0'}`}
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              About <span className="text-indigo-600 dark:text-indigo-400">Engazium</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Empowering small and early creators to build authentic engagement and expand their reach through genuine community connections.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        ref={missionRef}
        className="py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`${missionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} transition-all duration-1000`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full mb-6 shadow-sm">
                <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Our Mission</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Building Authentic Communities for Small & Early Creators
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                At Engazium, we're on a mission to revolutionize how small and early creators grow their presence online. We believe that authentic engagement beats artificial metrics every time.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Our platform connects small and early creators with real audiences, fostering genuine interactions that lead to meaningful growth. No bots, no spam—just authentic support from real people who care about your content.
              </p>
            </div>
            <div className={`${missionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'} transition-all duration-1000 delay-300`}>
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center shrink-0">
                      <Lightbulb className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Our Vision</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        To become the leading platform where small and early creators find authentic engagement and build sustainable, growing communities.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Our Goal</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        To help 1 million small and early creators achieve their growth goals through authentic engagement by 2027.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={valuesRef}
        className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000 text-center mb-12`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              These principles guide everything we do and shape how we serve our small and early creator community.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className={`${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000 delay-${index * 100} bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow`}
                >
                  <div className={`w-14 h-14 ${value.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section 
        ref={storyRef}
        className="py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className={`${storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000 text-center mb-12`}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Our Story
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                How Engazium came to be
              </p>
            </div>
            
            <div className={`${storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000 delay-300 space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed`}>
              <p>
                Engazium was born from a simple observation: small and early creators were struggling to grow their audiences in an increasingly crowded digital landscape. Traditional growth methods often relied on inauthentic tactics that hurt long-term success.
              </p>
              <p>
                We saw small and early creators spending hours trying to build engagement, only to be met with bots, spam, and fake metrics. We knew there had to be a better way—a platform that connects small and early creators with real audiences who genuinely care about their content.
              </p>
              <p>
                Today, Engazium has grown into a thriving community of over 10,000 small and early creators who believe in authentic growth. We've helped boost over 50,000 posts and increased average reach by 3x for our members. But we're just getting started.
              </p>
              <p className="text-slate-900 dark:text-white font-semibold">
                Join us as we continue to build the future of authentic engagement for small and early creators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000 text-center mb-12`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              By The Numbers
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Our impact in the creator community
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`${statsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-1000 delay-${index * 100} bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center`}
                >
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Grow Authentically?
            </h2>
            <p className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of small and early creators who are building real engagement and expanding their reach through authentic connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
                Get Started Free
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
