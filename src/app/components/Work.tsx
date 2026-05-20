import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '../App';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  client: string;
  year: string;
  description: string;
  tools: string[];
  color: string;
}

const projects: Project[] = [
  // DESIGN - Social Media
  {
    id: 1,
    title: "Future Labs Campaign",
    category: "design",
    subcategory: "social-media",
    client: "Future Labs",
    year: "2026",
    description: "Bold social media campaign featuring neon aesthetics and kinetic typography across Instagram, TikTok, and LinkedIn.",
    tools: ["Figma", "After Effects", "Photoshop"],
    color: "#FF00FF",
  },
  {
    id: 2,
    title: "Verde Social Series",
    category: "design",
    subcategory: "social-media",
    client: "Verde Cosmetics",
    year: "2025",
    description: "Organic and sustainable social content celebrating natural beauty with minimalist design and earth tones.",
    tools: ["Canva", "Illustrator", "Premiere Pro"],
    color: "#7AB800",
  },
  {
    id: 3,
    title: "Metro Transit Awareness",
    category: "design",
    subcategory: "social-media",
    client: "Metro Transit",
    year: "2025",
    description: "Dynamic social campaign promoting public transportation with animated infographics and user-generated content.",
    tools: ["After Effects", "Figma", "Lottie"],
    color: "#00D9FF",
  },

  // DESIGN - Prints & Publications
  {
    id: 4,
    title: "Harmony Records Album",
    category: "design",
    subcategory: "prints-publications",
    client: "Harmony Records",
    year: "2024",
    description: "Limited edition vinyl packaging and lyric booklet exploring the visual language of experimental music.",
    tools: ["InDesign", "Photoshop", "Illustrator"],
    color: "#FFB800",
  },
  {
    id: 5,
    title: "Design Annual 2025",
    category: "design",
    subcategory: "prints-publications",
    client: "Creative Collective",
    year: "2025",
    description: "Editorial design for a 200-page annual showcasing the year's best creative work with bold typography.",
    tools: ["InDesign", "Photoshop", "Illustrator"],
    color: "#FF3B3B",
  },
  {
    id: 6,
    title: "Artisan Coffee Packaging",
    category: "design",
    subcategory: "prints-publications",
    client: "Bean & Barrel",
    year: "2024",
    description: "Premium coffee packaging series featuring hand-drawn illustrations and tactile finishes.",
    tools: ["Illustrator", "Photoshop", "Procreate"],
    color: "#8B4513",
  },

  // PHOTOGRAPHY - Events
  {
    id: 7,
    title: "Tech Summit 2025",
    category: "photography",
    subcategory: "events",
    client: "Innovation Conference",
    year: "2025",
    description: "Coverage of a 3-day tech summit capturing keynotes, networking, and behind-the-scenes moments.",
    tools: ["Sony A7IV", "Lightroom", "Capture One"],
    color: "#4A90E2",
  },
  {
    id: 8,
    title: "Fashion Week NYC",
    category: "photography",
    subcategory: "events",
    client: "Style Magazine",
    year: "2024",
    description: "Runway and backstage photography from New York Fashion Week's most anticipated shows.",
    tools: ["Canon R5", "Lightroom", "Photoshop"],
    color: "#E91E63",
  },

  // PHOTOGRAPHY - Portraits & People
  {
    id: 9,
    title: "Founders Series",
    category: "photography",
    subcategory: "portraits-people",
    client: "Entrepreneur Magazine",
    year: "2025",
    description: "Environmental portraits of startup founders in their creative workspaces.",
    tools: ["Fujifilm GFX", "Capture One", "Photoshop"],
    color: "#9C27B0",
  },
  {
    id: 10,
    title: "Musicians Unplugged",
    category: "photography",
    subcategory: "portraits-people",
    client: "Sound & Vision",
    year: "2024",
    description: "Intimate portrait series capturing artists in candid, vulnerable moments.",
    tools: ["Leica M10", "Lightroom", "VSCO"],
    color: "#FF5722",
  },

  // PHOTOGRAPHY - Products & Commercial
  {
    id: 11,
    title: "Luxury Watch Collection",
    category: "photography",
    subcategory: "products-commercial",
    client: "Timepiece Co.",
    year: "2025",
    description: "High-end product photography emphasizing craftsmanship and detail with dramatic lighting.",
    tools: ["Phase One", "Capture One", "Photoshop"],
    color: "#FFD700",
  },
  {
    id: 12,
    title: "Culinary Editorial",
    category: "photography",
    subcategory: "products-commercial",
    client: "Gourmet Magazine",
    year: "2024",
    description: "Food photography for editorial features combining natural light and artistic styling.",
    tools: ["Sony A1", "Lightroom", "Photoshop"],
    color: "#FF6B6B",
  },
];

type MainCategory = 'design' | 'photography';
type Subcategory = 'social-media' | 'prints-publications' | 'events' | 'portraits-people' | 'products-commercial';

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>('design');
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>('social-media');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const subcategories = {
    design: [
      { value: 'social-media', label: 'Social Media' },
      { value: 'prints-publications', label: 'Prints & Publications' },
    ],
    photography: [
      { value: 'events', label: 'Events' },
      { value: 'portraits-people', label: 'Portraits & People' },
      { value: 'products-commercial', label: 'Products & Commercial' },
    ],
  };

  const filteredProjects = projects.filter(
    (p) => p.category === selectedCategory && p.subcategory === selectedSubcategory
  );

  const handleCategoryChange = (category: MainCategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(
      category === 'design' ? 'social-media' : 'events'
    );
  };

  return (
    <>
      <section id="work" className="min-h-screen py-24 px-6 md:px-12 relative" style={{ position: 'relative' }}>
        <div className="max-w-7xl mx-auto" style={{ position: 'relative' }}>
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-8xl lg:text-9xl mb-12 md:mb-16 text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Selected
            <br />
            <span className="text-accent">Works</span>
          </motion.h2>

          {/* Main Category Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-row justify-center items-center gap-3 md:gap-6 lg:gap-8 mb-8 md:mb-12"
          >
            <button
              onClick={() => handleCategoryChange('design')}
              data-cursor-text="Design"
              className={`text-2xl md:text-6xl font-bold transition-all duration-500 ${selectedCategory === 'design'
                ? 'text-accent scale-110'
                : 'text-muted-foreground hover:text-foreground scale-100'
                }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Design
            </button>
            <span className="text-2xl md:text-6xl text-muted-foreground">/</span>
            <button
              onClick={() => handleCategoryChange('photography')}
              data-cursor-text="Photo"
              className={`text-2xl md:text-6xl font-bold transition-all duration-500 ${selectedCategory === 'photography'
                ? 'text-accent scale-110'
                : 'text-muted-foreground hover:text-foreground scale-100'
                }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Photography
            </button>
          </motion.div>

          {/* Subcategory Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 md:mb-16"
          >
            {subcategories[selectedCategory].map((sub) => (
              <motion.button
                key={sub.value}
                onClick={() => setSelectedSubcategory(sub.value as Subcategory)}
                data-cursor-text={sub.label}
                className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base border-2 transition-all duration-300 ${selectedSubcategory === sub.value
                  ? 'border-accent bg-accent text-background'
                  : 'border-muted-foreground text-foreground hover:border-accent'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sub.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedSubcategory}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 10, y: -x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="cursor-pointer group h-[400px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor-text="View"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="relative w-full h-full bg-card border border-border overflow-hidden"
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Color overlay */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{ backgroundColor: project.color }}
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
          <div>
            <span className="text-xs text-accent tracking-wider uppercase">
              {project.subcategory.replace('-', ' ')}
            </span>
          </div>

          <div>
            <h3
              className="text-3xl md:text-4xl mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {project.client} · {project.year}
            </p>
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <p className="text-xs text-foreground/70 line-clamp-2">
                {project.description}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (project) {
      // Stop Lenis smooth scrolling when modal opens
      if (lenis) {
        lenis.stop();
      }
      document.body.style.overflow = 'hidden';
    } else {
      // Restart Lenis smooth scrolling when modal closes
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = 'unset';

      // Refresh ScrollTrigger after modal closes and Lenis restarts
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
    return () => {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = 'unset';
      ScrollTrigger.refresh();
    };
  }, [project, lenis]);

  // Prevent Lenis from intercepting wheel/touch events inside the modal
  const stopScrollPropagation = (e: React.WheelEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden"
          onClick={onClose}
          onWheel={stopScrollPropagation}
          onTouchMove={stopScrollPropagation}
          style={{ cursor: 'pointer' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border max-w-4xl w-full max-h-[90vh] flex flex-col relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ cursor: 'default' }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              data-cursor-text="Close"
              className="absolute top-4 right-4 md:top-6 md:right-6 text-foreground hover:text-accent transition-colors z-20 bg-background/80 backdrop-blur-sm w-10 h-10 flex items-center justify-center border border-border"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Scrollable content */}
            <div
              ref={modalContentRef}
              className="overflow-y-auto overflow-x-hidden flex-1 p-5 md:p-12"
              style={{ overscrollBehavior: 'contain' }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-sm text-accent tracking-wider uppercase mb-2 block">
                  {project.category} / {project.subcategory.replace('-', ' ')}
                </span>

                <h2
                  className="text-3xl md:text-6xl mb-6 pr-12"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {project.title}
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Client</p>
                    <p className="font-medium">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Year</p>
                    <p className="font-medium">{project.year}</p>
                  </div>
                </div>

                <p className="text-lg mb-8 leading-relaxed">{project.description}</p>

                {/* Mockup placeholder */}
                <div
                  className="w-full aspect-video mb-8 flex items-center justify-center"
                  style={{ backgroundColor: project.color, opacity: 0.2 }}
                >
                  <span className="text-foreground/50 text-sm">Project Visual</span>
                </div>

                {/* Additional content for scroll testing */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    Project Details
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    This project showcases a comprehensive approach to {project.category === 'design' ? 'design' : 'photography'},
                    blending creative vision with technical expertise. Every element was carefully crafted to ensure
                    maximum impact and engagement with the target audience.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The collaboration with {project.client} resulted in a body of work that exceeded expectations
                    and set new standards in the industry. The project received critical acclaim and was featured
                    in multiple publications.
                  </p>
                </div>

                {/* Tools */}
                <div className="mb-8">
                  <p className="text-muted-foreground text-sm mb-3">Tools & Software</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <motion.span
                        key={`${tool}-${i}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="px-4 py-2 bg-accent/10 text-accent text-sm border border-accent/20"
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* More mockup placeholders for scrolling */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div
                    className="w-full aspect-square flex items-center justify-center"
                    style={{ backgroundColor: project.color, opacity: 0.15 }}
                  >
                    <span className="text-foreground/50 text-xs">Detail 1</span>
                  </div>
                  <div
                    className="w-full aspect-square flex items-center justify-center"
                    style={{ backgroundColor: project.color, opacity: 0.15 }}
                  >
                    <span className="text-foreground/50 text-xs">Detail 2</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}