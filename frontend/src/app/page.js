import React from 'react'
import Home from './home/page'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow">
        <Home />
      </div>
      
      <Footer />
    </div>
  )
}
