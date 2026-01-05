'use client';

import React from 'react'
import { Helmet } from 'react-helmet-async';
import Home from './home/page'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
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
      <Header />

      <div className="flex-grow">
        <Home />
      </div>
      
      <Footer />
    </div>
  )
}
