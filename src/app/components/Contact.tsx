import { useState } from 'react';
import { motion } from 'motion/react';

const socialLinks = [
  { name: 'Instagram', url: '#', icon: 'IG' },
  { name: 'Behance', url: '#', icon: 'BE' },
  { name: 'Dribbble', url: '#', icon: 'DB' },
  { name: 'LinkedIn', url: '#', icon: 'LI' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', projectType: '', message: '' });
      }, 3000);
    }, 2000);
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-6 md:px-12 relative" style={{ position: 'relative' }}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl mb-6 text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Let's <span className="text-accent">Connect</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
        >
          Have a project in mind? Let's create something extraordinary together.
          Drop me a message and I'll get back to you within 24 hours.
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-8 mb-16">
          {/* Name field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="name" className="block text-sm mb-2 text-muted-foreground">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b-2 border-muted-foreground focus:border-accent py-3 outline-none transition-colors duration-300 text-lg"
              placeholder="John Doe"
            />
          </motion.div>

          {/* Email field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="email" className="block text-sm mb-2 text-muted-foreground">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b-2 border-muted-foreground focus:border-accent py-3 outline-none transition-colors duration-300 text-lg"
              placeholder="john@example.com"
            />
          </motion.div>

          {/* Project type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <label htmlFor="projectType" className="block text-sm mb-2 text-muted-foreground">
              Project Type
            </label>
            <select
              id="projectType"
              required
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full bg-transparent border-b-2 border-muted-foreground focus:border-accent py-3 outline-none transition-colors duration-300 text-lg cursor-pointer"
            >
              <option value="" disabled>Select a project type</option>
              <option value="brand-identity">Brand Identity</option>
              <option value="motion-design">Motion Design</option>
              <option value="ui-ux">UI/UX Design</option>
              <option value="art-direction">Art Direction</option>
              <option value="other">Other</option>
            </select>
          </motion.div>

          {/* Message field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <label htmlFor="message" className="block text-sm mb-2 text-muted-foreground">
              Tell me about your project
            </label>
            <textarea
              id="message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="w-full bg-transparent border-b-2 border-muted-foreground focus:border-accent py-3 outline-none transition-colors duration-300 text-lg resize-none"
              placeholder="Share your vision..."
            />
          </motion.div>

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex justify-center"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              data-cursor-text="Send"
              className="relative px-12 py-4 border-2 border-accent text-accent overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-accent"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 group-hover:text-background transition-colors duration-300 font-medium tracking-wider uppercase">
                {isSubmitting ? 'Sending...' : isSubmitted ? 'Sent!' : 'Send Message'}
              </span>
            </motion.button>
          </motion.div>
        </form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">Or find me on</p>
          <div className="flex justify-center gap-6">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.url}
                data-cursor-text={link.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="relative w-12 h-12 border border-accent flex items-center justify-center hover:bg-accent hover:text-background transition-colors duration-300 group"
              >
                <span className="text-sm font-bold">{link.icon}</span>
                <motion.div
                  className="absolute bottom-full mb-2 bg-accent text-background px-3 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {link.name}
                </motion.div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
