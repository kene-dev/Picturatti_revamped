import { useEffect, useState, useRef, createContext, useContext } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

// Create context for Lenis
const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after Lenis initialization and DOM is ready
    // Use a longer delay to ensure all components are mounted and positioned
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Cleanup
    return () => {
      clearTimeout(refreshTimer);
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    // Refresh ScrollTrigger after loading screen completes
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* Main Content */}
      <div className="relative" style={{ position: 'relative' }}>
        <Hero />
        <Work />
        <About />
        <Process />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </LenisContext.Provider>
  );
}