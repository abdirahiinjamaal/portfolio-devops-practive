export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
  tech: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  coverImage?: string;
  tags: string[];
}

export interface SiteContent {
  hero: {
    name: string;
    tagline: string;
    subtitle: string;
    cta: { text: string; link: string }[];
  };
  about: {
    bio: string;
    photo?: string;
  };
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  blog: BlogPost[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
