import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getContent } from '../services/content';
import type { SiteContent } from '../types';

export default function Experience() {
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

  const { skills, experience } = content;

  return (
    <>
      {/* Skills */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Skills
          </motion.h1>
          <div className="space-y-8">
            {groupBy(skills, 'category').map(([category, items]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <div
                      key={skill.id}
                      className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Experience
          </motion.h2>
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 border-l-2 border-blue-600 dark:border-blue-400"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400" />
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {exp.startDate} — {exp.endDate || 'Present'}
                  </span>
                  <h3 className="text-xl font-semibold mt-1">{exp.role}</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">{exp.company}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{exp.description}</p>
                  {exp.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function groupBy<T>(arr: T[], key: keyof T): [string, T[]][] {
  const map = new Map<string, T[]>();
  arr.forEach((item) => {
    const k = String(item[key]);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(item);
  });
  return Array.from(map.entries());
}
