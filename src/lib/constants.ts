import type { 
  PersonalInfo, 
  Education, 
  Experience, 
  Project, 
  Video, 
  Skill,
  Achievement 
} from "@/types/content";

import personalInfoData from "@/content/personal-info.json";
import educationData from "@/content/education.json";
import experienceData from "@/content/experience.json";
import projectsData from "@/content/projects.json";
import skillsData from "@/content/skills.json";
import videosData from "@/content/videos.json";

export const PERSONAL_INFO = personalInfoData as PersonalInfo;
export const EDUCATION = (educationData as { items: Education[] })?.items || [];
export const EXPERIENCE = ((experienceData as unknown) as { items: Experience[] })?.items || [];
export const PROJECTS = (projectsData as { items: Project[] })?.items || [];
export const SKILLS = (skillsData as { categories: Record<string, Skill> })?.categories || {};
export const VIDEOS = videosData.videos as Video[];

export const ACHIEVEMENTS: Achievement[] = [
  { label: "Years of Experience", value: 5, suffix: "+" },
  { label: "User Engagement Improved", value: 40, suffix: "%" },
  { label: "Performance Optimization", value: 20, suffix: "%" },
  { label: "Projects Completed", value: 15, suffix: "+" },
];

export const NAVIGATION_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: PERSONAL_INFO.github,
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: PERSONAL_INFO.linkedin,
    icon: "linkedin",
  },
  {
    name: "Email",
    url: `mailto:${PERSONAL_INFO.email}`,
    icon: "mail",
  },
] as const;