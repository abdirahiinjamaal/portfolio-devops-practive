import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPost } from '../services/content';
import type { BlogPost as BlogPostType } from '../types';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getBlogPost(slug)
      .then(setPost)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500">Post not found.</p>
      </div>
    );
  }

  return (
    <article className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/blog"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
          >
            &larr; Back to Blog
          </Link>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div className="flex gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </motion.div>
      </div>
    </article>
  );
}
