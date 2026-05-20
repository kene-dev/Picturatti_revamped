import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const name = "PICTURATTI";
  const title = "PHOTOGRAPHY & GRAPHIC DESIGN";

  const marqueeItems = [
    "Print & Publications",
    "Social Media",
    "Events",
    "Portraits",
    "Products & Commercial",
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between py-12 px-6 md:px-12 overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-accent/10"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              rotate: i * 45,
            }}
            animate={{
              x: (mousePosition.x - window.innerWidth / 2) * (0.02 + i * 0.01),
              y: (mousePosition.y - window.innerHeight / 2) * (0.02 + i * 0.01),
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="text-center max-w-5xl">
          {/* Animated name */}
          <motion.h1
            className="text-4xl md:text-7xl lg:text-9xl mb-4 overflow-hidden"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {name.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Animated title */}
          <motion.h2
            className="text-lg md:text-4xl lg:text-6xl text-accent mb-8 md:mb-12 overflow-hidden"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {title.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>

          {/* CTA Button with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="inline-block"
          >
            <MagneticButton>
              <a
                href="#work"
                data-cursor-text="View"
                className="inline-block px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-background transition-colors duration-300 tracking-wider uppercase text-sm font-medium"
              >
                View My Work
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scrolling marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="relative overflow-hidden py-6 border-t border-accent/20"
      >
        <Marquee items={marqueeItems} />
      </motion.div>
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

function Marquee({ items }: { items: string[] }) {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="flex whitespace-nowrap">
      <motion.div
        className="flex gap-12"
        animate={{ x: [0, -33.33 + '%'] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedItems.map((item, i) => (
          <span
            key={i}
            className="text-xl md:text-4xl font-medium text-foreground/50"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {item}
            <span className="mx-6 text-accent">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}