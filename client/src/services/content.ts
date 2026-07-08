import type { SiteContent } from '../types';

const CONTENT_URL = import.meta.env.VITE_CONTENT_URL || '/data/content.json';

let cache: SiteContent | null = null;

export async function getContent(): Promise<SiteContent> {
  if (cache) return cache;
  const res = await fetch(CONTENT_URL);
  if (!res.ok) throw new Error('Failed to fetch content');
  cache = (await res.json()) as SiteContent;
  return cache;
}

export async function getProjects() {
  const content = await getContent();
  return content.projects.sort((a, b) => a.order - b.order);
}

export async function getSkills() {
  const content = await getContent();
  return content.skills;
}

export async function getExperience() {
  const content = await getContent();
  return content.experience;
}

export async function getBlogPosts() {
  const content = await getContent();
  return content.blog.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getBlogPost(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}
