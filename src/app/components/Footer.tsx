import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-24 px-6 md:px-12 border-t border-accent/20">
      <div className="max-w-7xl mx-auto">
        {/* Large name */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2
            className="text-3xl md:text-8xl lg:text-[10rem] leading-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            PICTURATTI
          </h2>
        </motion.div>

        {/* Footer links and info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          {/* Left side - Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            {['Work', 'About', 'Process', 'Contact'].map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <a
                  href={`#${link.toLowerCase()}`}
                  data-cursor-text="Go"
                  className="group relative text-2xl md:text-3xl block"
                >
                  <span className="relative inline-block">
                    {link}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"
                    />
                  </span>
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-left md:text-right space-y-6"
          >
            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              data-cursor-text="Top"
              className="group flex items-center gap-3 md:ml-auto hover:text-accent transition-colors duration-300"
              whileHover={{ y: -5 }}
            >
              <span className="text-sm tracking-wider uppercase">Back to Top</span>
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <polyline points="18 15 12 9 6 15" />
              </motion.svg>
            </motion.button>

            {/* Email */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Get in touch</p>
              <a
                href="mailto:hello@picturatti.com"
                data-cursor-text="Email"
                className="text-lg hover:text-accent transition-colors duration-300"
              >
                hello@picturatti.com
              </a>
            </div>

            {/* Location */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Based in</p>
              <p className="text-lg">Brooklyn, NYC</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-16 pt-8 border-t border-muted-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
        >
          <p>© {currentYear} Picturatti. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}