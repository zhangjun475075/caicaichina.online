import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import TetrisGame from './components/TetrisGame';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Header />
      <main>
        <Hero />
        <TetrisGame />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;