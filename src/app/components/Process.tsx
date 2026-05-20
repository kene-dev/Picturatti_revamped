import { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Deep dive into your brand, goals, and target audience. Research, competitive analysis, and stakeholder interviews.",
  },
  {
    number: "02",
    title: "Define",
    description: "Synthesize insights into a clear creative strategy. Define visual direction, messaging, and project scope.",
  },
  {
    number: "03",
    title: "Design",
    description: "Bring concepts to life through iterative exploration. Create mockups, prototypes, and design systems.",
  },
  {
    number: "04",
    title: "Deliver",
    description: "Refine, polish, and launch. Provide comprehensive brand guidelines and ongoing support.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !sectionRef.current) return;

    const path = svgRef.current.querySelector('path');
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    // Create ScrollTrigger animation
    const scrollTrigger = gsap.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    });

    // Cleanup
    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="min-h-screen py-24 px-6 md:px-12 relative"
      style={{ position: 'relative' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl mb-12 md:mb-16 text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          My <span className="text-accent">Process</span>
        </motion.h2>

        <div className="relative" style={{ position: 'relative' }}>
          {/* SVG connecting line */}
          <svg
            ref={svgRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block"
            style={{ zIndex: 0 }}
          >
            <path
              d="M 150 100 Q 300 150, 450 100 T 750 100 Q 900 150, 1050 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent"
            />
          </svg>

          {/* Process steps */}
          <div className="grid md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <ProcessStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: { number: string; title: string; description: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      {/* Number circle */}
      <motion.div
        className="w-16 h-16 rounded-full border-2 border-accent bg-background flex items-center justify-center mb-6 mx-auto"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
      >
        <span className="text-accent font-bold text-lg">{step.number}</span>
      </motion.div>

      {/* Content */}
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          {step.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}