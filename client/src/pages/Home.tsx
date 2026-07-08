import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getContent } from '../services/content';
import type { SiteContent } from '../types';

export default function Home() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    getContent().then(setContent).catch(console.error);
  }, []);

  if (!content) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
      </div>
    );
  }

  const { hero, about } = content;

  return (
    <>
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            {hero.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-4"
          >
            {hero.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            {hero.cta.map((btn, i) => (
              <Link
                key={i}
                to={btn.link}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  i === 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {btn.text}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            {about.photo && (
              <img
                src={about.photo}
                alt={hero.name}
                className="w-48 h-48 rounded-full object-cover shadow-lg"
              />
            )}
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {about.bio}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
