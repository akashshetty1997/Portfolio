// src/types/content.ts
export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  tagline: string;
  status: string;
  github: string;
  linkedin: string;
  resume: string;
  aboutMe: {
    title: string;
    subtitle: string;
    description: string;
    summary: string[];
    quickFacts: string[];
  };
  typingAnimationTexts: string[];
}

export interface Education {
  school: string;
  degree: string;
  location: string;
  duration: string;
  coursework: string[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  technologies: string[];
  achievements?: {
    [key: string]: string;
  };
}

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  role: string;
  highlights: string[];
  technologies: string[];
  github: string;
  live: string | null;
  image: string;
  screenshots: string[];
  isprivate?: boolean;
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  videoSrc: string;
  transcript: {
    time: number;
    text: string;
    highlight?: boolean;
  }[];
  chapters: {
    time: number;
    title: string;
  }[];
}

export interface Skill {
  icon: string;
  skills: string[];
}

export interface Achievement {
  label: string;
  value: number;
  suffix: string;
}
