import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const testimonials = [
  {
    id: 1,
    quote: "Alex transformed our entire brand identity. The attention to detail and creative vision exceeded all expectations. Our customer engagement increased by 200%.",
    author: "Sarah Chen",
    role: "CEO, Future Labs",
    company: "Future Labs",
  },
  {
    id: 2,
    quote: "Working with Alex was an absolute pleasure. The packaging designs brought our products to life in ways we never imagined possible. Pure artistry.",
    author: "Marcus Johnson",
    role: "Founder, Verde Cosmetics",
    company: "Verde Cosmetics",
  },
  {
    id: 3,
    quote: "The motion design work for our transit app was phenomenal. Alex has this rare ability to blend functionality with stunning visuals seamlessly.",
    author: "Elena Rodriguez",
    role: "Product Director, Metro Transit",
    company: "Metro Transit",
  },
  {
    id: 4,
    quote: "From concept to execution, Alex delivered beyond our wildest dreams. The album artwork series became iconic in its own right.",
    author: "David Kim",
    role: "A&R Director, Harmony Records",
    company: "Harmony Records",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  return (
    <section className="min-h-screen py-24 px-6 md:px-12 flex items-center relative" style={{ position: 'relative' }}>
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl mb-12 md:mb-16 text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Client <span className="text-accent">Testimonials</span>
        </motion.h2>

        <div className="relative" style={{ position: 'relative' }}>
          {/* Testimonial cards */}
          <div className="relative h-[450px] md:h-[300px] overflow-hidden" style={{ position: 'relative' }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full text-center px-4">
                  {/* Quote */}
                  <p className="text-xl md:text-3xl lg:text-4xl mb-6 md:mb-8 leading-relaxed">
                    "{testimonials[currentIndex].quote}"
                  </p>

                  {/* Author */}
                  <div>
                    <p className="text-lg font-medium mb-1">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-sm text-accent">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <button
              onClick={() => paginate(-1)}
              data-cursor-text="Prev"
              className="w-12 h-12 border-2 border-accent hover:bg-accent hover:text-background transition-colors duration-300 flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-8 bg-accent' : 'bg-muted-foreground'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              data-cursor-text="Next"
              className="w-12 h-12 border-2 border-accent hover:bg-accent hover:text-background transition-colors duration-300 flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}