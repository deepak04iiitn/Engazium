import React from 'react';
import { Users, TrendingUp, Shield, Target, Check, ArrowRight, Sparkles, Clock, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full mb-6 border border-indigo-100">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">The engagement & reach hub for creators</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Build Engagement.<br />
            <span className="text-indigo-600">Expand Reach.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join a community-driven platform where micro creators grow together through meaningful engagement. No bots, no fake interactions—just real creators supporting each other.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center space-x-2">
              <span>Start Growing Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors font-semibold">
              See How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600 mt-1">Active Creators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600 mt-1">Posts Boosted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">3x</div>
              <div className="text-sm text-gray-600 mt-1">Avg. Reach Increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Challenge Micro Creators Face
            </h2>
            <p className="text-lg text-gray-600">
              You create amazing content, but algorithms need early engagement to show it to more people. Without that initial boost, even great content stays invisible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Low Early Engagement</h3>
              <p className="text-gray-600">
                The first few hours are critical. Without immediate engagement, your content doesn't reach its potential audience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Poor Algorithmic Reach</h3>
              <p className="text-gray-600">
                Low engagement signals tell the algorithm your content isn't worth showing to more people, limiting your growth.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Unsafe Alternatives</h3>
              <p className="text-gray-600">
                Existing pods and groups have no rules, poor quality engagement, and can lead to shadowbans or account issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Engazium Solution
            </h2>
            <p className="text-lg text-gray-600">
              A structured, safe, and community-driven engagement ecosystem designed specifically for micro creators who want to grow organically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Niche-Based Squads</h3>
                    <p className="text-gray-600">
                      Join squads of 10-20 creators in your niche who share similar goals and content types. Grow together with people who understand your audience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Platform-Safe Engagement</h3>
                    <p className="text-gray-600">
                      All engagement is manual, time-distributed, and follows quality guidelines. No automated bots, no spam—just real people engaging authentically.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Credit-Based Fairness</h3>
                    <p className="text-gray-600">
                      Earn credits by engaging with others. Use credits to post your content. This system ensures everyone contributes and prevents freeloaders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Weekly Accountability</h3>
                    <p className="text-gray-600">
                      Track your growth with weekly metric updates. Stay motivated and see real progress as your engagement and reach improve over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Sign up and select your niche</p>
                    <p className="text-gray-600 text-sm mt-1">Choose your content type and language preferences</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Join engagement squads</p>
                    <p className="text-gray-600 text-sm mt-1">Connect with creators in your niche with similar follower counts</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Share your posts</p>
                    <p className="text-gray-600 text-sm mt-1">Post your content links to your squads when you publish</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                    4
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Give & receive engagement</p>
                    <p className="text-gray-600 text-sm mt-1">Squad members engage with meaningful interactions over time</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                    5
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Watch your reach grow</p>
                    <p className="text-gray-600 text-sm mt-1">Track metrics weekly and see your content reach more people</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the squad size that fits your posting frequency and growth goals. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 10-Member Squad */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">10-Member Squad</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">₹50</span>
                <span className="text-gray-600 ml-2">/ month</span>
              </div>
              <p className="text-gray-600 mb-6">
                Perfect for creators who want focused, high-quality engagement without overload.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">10 active squad members</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Niche-based matching</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Credit-based system</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Weekly analytics</span>
                </li>
              </ul>
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                Start with 10 Members
              </button>
            </div>

            {/* 20-Member Squad */}
            <div className="bg-white rounded-2xl border-2 border-indigo-600 p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">20-Member Squad</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">₹100</span>
                <span className="text-gray-600 ml-2">/ month</span>
              </div>
              <p className="text-gray-600 mb-6">
                Designed for creators who post frequently and want wider early engagement and reach.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">20 active squad members</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Niche-based matching</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Credit-based system</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Weekly analytics</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                Start with 20 Members
              </button>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-8">
            Join up to 3 squads maximum (recommended: 2 squads) • Max 1 large squad per creator
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Grow Your Reach?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of creators who are building real engagement and expanding their reach on Engazium.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold inline-flex items-center space-x-2">
            <span>Get Started for Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}