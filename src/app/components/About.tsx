import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const skills = [
  { name: "Brand Identity", level: 95 },
  { name: "Motion Design", level: 90 },
  { name: "UI/UX Design", level: 88 },
  { name: "Art Direction", level: 92 },
  { name: "Typography", level: 94 },
  { name: "3D Design", level: 85 },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-24 px-6 md:px-12 relative"
      style={{ position: 'relative' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Image with parallax */}
          <motion.div
            className="relative h-[350px] md:h-[600px] overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center"
              style={{ y: imageY }}
            >
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                  <span className="text-6xl">👨‍🎨</span>
                </div>
                <p className="text-sm text-muted-foreground">Portrait placeholder</p>
              </div>
            </motion.div>

            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 left-8 bg-card border border-border px-4 py-3 flex items-center gap-3"
            >
              <motion.div
                className="w-3 h-3 bg-accent rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium">Available for work</span>
            </motion.div>
          </motion.div>

          {/* Right side - Text content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-7xl mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              About <span className="text-accent">Me</span>
            </motion.h2>

            <div className="space-y-4 mb-12">
              {[
                "We are Picturatti, a creative studio specializing in photography and graphic design with 10+ years of experience crafting bold visual identities that resonate with audiences and drive meaningful engagement.",
                "Our work spans brand identity, motion design, and digital experiences. We believe great design is not just about aesthetics—it's about solving problems and telling stories that matter.",
                "Currently based in Brooklyn, NYC, working with forward-thinking brands that aren't afraid to push boundaries.",
              ].map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-2xl font-medium mb-6">Skills & Expertise</h3>
              <div className="space-y-6">
                {skills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, index }: { skill: { name: string; level: number }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-sm text-accent">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}