// src/scripts/setup-content.ts
import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "src", "content");

// Create content directory if it doesn't exist
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

const contentFiles = {
  "personal-info.json": {
    name: "Akash Shridhar Shetty",
    firstName: "Akash",
    lastName: "Shetty",
    email: "shridharshetty.a@northeastern.edu",
    phone: "617-694-1895",
    location: "Boston, MA",
    tagline: "Building scalable systems that solve real problems",
    status: "Seeking Fall 2026 SWE Internship",
    github: "https://github.com/akashshetty1997",
    linkedin: "https://linkedin.com/in/akashshetty1997",
    resume: "/documents/akash_shetty_resume.pdf",
    aboutMe: {
      title: "Software Engineer | MS CS at Northeastern",
      subtitle:
        "4+ years of production experience building full-stack applications at startups.",
      description:
        "Currently pursuing my Master's in Computer Science while shipping products used by thousands.",
      summary: [
        "Five years ago in India, I wrote my first function. Today in Boston, I'm architecting full-stack systems while pursuing my MS at Northeastern. The path so far: shipping a nutrition app with ML-powered food recognition to the App Store, building data pipelines that scaled operations 20x, leading a team of 8 engineers, and cutting deployment times from weeks to days.",
        "Right now, I'm building Supatrack (4.9+ rating on the App Store) with TensorFlow computer vision and FastAPI on AWS. I care about clean code, strong test coverage, and systems that hold up at scale. Looking for a Summer 2026 internship where I can ship meaningful software with a great team.",
      ],
      quickFacts: [
        "4+ Years Production Experience",
        "Java, Python, TypeScript",
        "React, Spring Boot, FastAPI",
        "AWS, Docker, Kubernetes",
        "ML/AI Integration",
        "Shipped App Store Product",
        "Open Source Contributor",
        "Strong Testing Practices",
      ],
    },
    typingAnimationTexts: [
      "Software Engineer",
      "Full Stack Developer",
      "MS CS Student at Northeastern",
      "Seeking Fall 2026 Internship",
    ],
  },
  "education.json": {
    sectionTitle: "Education",
    items: [
      {
        school: "Northeastern University",
        degree: "Master of Science in Computer Science",
        location: "Boston, MA",
        duration: "Jan 2025 - May 2027",
        gpa: "3.4/4.0",
        coursework: [
          "Program Design Paradigms",
          "Algorithms and Data Structures",
          "Pattern Recognition and Computer Vision",
          "Natural Language Processing",
        ],
      },
      {
        school: "Manipal University",
        degree: "Bachelor of Computer Applications",
        location: "Jaipur, India",
        duration: "Oct 2021 - Dec 2024",
        gpa: "3.2/4.0",
        coursework: [
          "Data Structures and Algorithms",
          "Operating Systems",
          "Database Management",
          "Software Engineering",
        ],
      },
    ],
  },
  "experience.json": {
    sectionTitle: "Professional Experience",
    sectionSubtitle:
      "4+ years of building scalable applications and leading development teams",
    items: [
      {
        title: "Software Engineer",
        company: "Goodpass",
        location: "Bangalore, India",
        duration: "Mar 2024 - Aug 2024",
        description: [
          "Automated content enrichment by architecting a Python data pipeline with LLM integration and parallel processing, containerized with Docker, scaling from 5 to 100+ trips/day and eliminating 95% of manual work.",
          "Developed ML classification models using TensorFlow and Python, achieving 90% accuracy while processing 1,000+ daily data points via RESTful APIs with MongoDB.",
          "Built RESTful API endpoints for India's ONDC (government open e-commerce network) to integrate attraction ticketing and movie bookings, reducing partner integration time by 60%.",
        ],
        technologies: [
          "Python",
          "TensorFlow",
          "Docker",
          "RESTful APIs",
          "MongoDB",
          "AWS EC2",
          "LLM",
        ],
        achievements: {
          scale: "Scaled operations from 5 to 100+ trips/day",
          accuracy: "90% ML model accuracy on 1,000+ daily data points",
          integration: "60% faster partner onboarding",
        },
      },
      {
        title: "Software Engineer",
        company: "SoftXways ApS",
        location: "Bangalore, India",
        duration: "Jun 2021 - Feb 2024",
        description: [
          "Led design of a reusable React component library with Java/Spring Boot backend integration, mentoring 8 engineers and accelerating feature delivery by 40% across 5+ production apps.",
          "Accelerated application load times by 20% for 10,000+ daily users by diagnosing bottlenecks through Java profiling and implementing JavaScript code-splitting with PostgreSQL query optimization.",
          "Initiated CI/CD pipeline automation using Docker, Kubernetes, and Jenkins with automated testing, catching 70% more bugs pre-production and reducing deployment time from 2 weeks to 2 days.",
        ],
        technologies: [
          "Java",
          "Spring Boot",
          "React",
          "JavaScript",
          "PostgreSQL",
          "Docker",
          "Kubernetes",
          "Jenkins",
          "JUnit",
        ],
        achievements: {
          delivery: "40% faster feature delivery across 5+ apps",
          performance: "20% faster load times for 10,000+ daily users",
          deployment: "Deployment time reduced from 2 weeks to 2 days",
        },
      },
      {
        title: "Software Engineer",
        company: "Byte Academy",
        location: "New York, USA",
        duration: "Dec 2019 - Feb 2021",
        description: [
          "Contributed to a website builder SaaS platform using React, implementing reusable component architecture and Object-Oriented design patterns that enabled 50+ ETF clients to create custom sites, reducing dev team dependency by 80%.",
          "Implemented Git branching strategies and code review processes with a 5-person distributed team, reducing merge conflicts by 65% through systematic testing and documentation.",
          "Developed deployment automation by contributing Python scripts for Jenkins CI/CD pipelines with error handling and rollback mechanisms, achieving 98% deployment success rate.",
        ],
        technologies: [
          "React",
          "Python",
          "Jenkins",
          "Git",
          "CI/CD",
          "REST APIs",
        ],
        achievements: {
          clients: "50+ ETF clients onboarded with modular design",
          quality: "65% reduction in merge conflicts",
          deployment: "98% deployment success rate",
        },
      },
    ],
  },
  "projects.json": {
    sectionTitle: "Featured Projects",
    sectionSubtitle: "Real-world applications that solve real problems",
    items: [
      {
        title: "Supatrack",
        description:
          "AI-powered nutrition tracking app with computer vision, live on App Store and Play Store",
        longDescription:
          "Led full-stack development of a nutrition app with ML-powered food recognition. 4.9+ App Store rating. Built with FastAPI, TensorFlow CNNs, Flutter, and AWS.",
        duration: "Jun 2025 - Present",
        role: "Lead Developer",
        highlights: [
          "Architected FastAPI backend with TensorFlow CNNs achieving 92% food recognition accuracy.",
          "Deployed on AWS EC2 with Redis caching, delivering 99.5% uptime and sub-300ms response times.",
          "Engineered ML inference pipeline with auto-scaling and WebSocket real-time features.",
          "Designed and shipped Squads feature for group accountability across API and mobile client.",
        ],
        technologies: [
          "Flutter",
          "FastAPI",
          "TensorFlow",
          "AWS EC2",
          "Redis",
          "MongoDB",
          "Python",
          "WebSocket",
        ],
        github: "https://github.com/akashshetty1997/supatrack",
        live: null,
        image: "/images/supatrack.png",
        screenshots: [],
      },
      {
        title: "DevMatch",
        description:
          "Full-stack developer-recruiter matching platform with role-based access and social features",
        longDescription:
          "Built a matching platform using Next.js 14, TypeScript, and Node.js/Express with MongoDB. Features JWT authentication, GitHub API integration, and role-based access for three user types.",
        duration: "Sep 2025 - Dec 2025",
        role: "Full Stack Developer",
        highlights: [
          "Built full-stack platform with Next.js 14, TypeScript, Tailwind CSS, and Node.js/Express.",
          "Implemented JWT authentication and GitHub API integration for developer profiles.",
          "Designed role-based access for developers, recruiters, and admins with social features.",
          "Deployed on Vercel with CI/CD pipeline.",
        ],
        technologies: [
          "Next.js 14",
          "TypeScript",
          "Tailwind CSS",
          "Node.js",
          "Express",
          "MongoDB",
          "JWT",
          "Vercel",
        ],
        github: "https://github.com/akashshetty1997/devmatch",
        live: null,
        image: "/images/devmatch.png",
        screenshots: [],
      },
      {
        title: "Calendar Application",
        description:
          "Enterprise calendar management system built with Java, OOP, and design patterns",
        longDescription:
          "Developed a multi-calendar management system in Java using SOLID principles and design patterns. Features conflict detection, auto-decline, recurring events, and comprehensive JUnit test suite.",
        duration: "Jan 2025 - Apr 2025",
        role: "Developer",
        highlights: [
          "Built multi-calendar system using OOP with SOLID principles and design patterns (Command, Factory, MVC).",
          "Implemented conflict detection, auto-decline, and recurring event scheduling.",
          "Designed comprehensive QA test suite using JUnit with high code coverage.",
          "Collaborated using Git and code reviews for CSV export and cross-calendar features.",
        ],
        technologies: [
          "Java",
          "J2EE",
          "JUnit",
          "MVC",
          "Git",
          "Design Patterns",
        ],
        github: null,
        live: null,
        image: "/images/calendar.png",
        screenshots: [],
      },
      {
        title: "Open Food Facts Contributions",
        description:
          "Contributing to open-source food data platform",
        longDescription:
          "Active contributor to the Open Food Facts platform, enhancing UI and collaborating on nutrition transparency and food recognition features.",
        duration: "Feb 2025 - Present",
        role: "Open Source Contributor",
        highlights: [
          "Contributed to open-source food data platform using Svelte and TypeScript.",
          "Enhanced UI and collaborated on nutrition transparency features.",
          "Improved food recognition features for better user experience.",
        ],
        technologies: [
          "Svelte",
          "TypeScript",
          "Tailwind CSS",
        ],
        github: "https://github.com/openfoodfacts",
        live: "https://world.openfoodfacts.org",
        image: "/images/openfoodfacts.png",
        screenshots: [],
      },
    ],
  },
  "skills.json": {
    sectionTitle: "Technical Stack",
    sectionSubtitle: "A comprehensive toolkit for building modern applications",
    categories: {
      "Programming Languages": {
        skills: [
          "Java",
          "Python",
          "JavaScript",
          "TypeScript",
          "C++",
          "SQL",
          "Go",
        ],
      },
      "Frontend & Mobile": {
        skills: [
          "React",
          "Next.js",
          "Flutter",
          "Vue.js",
          "HTML5/CSS3",
          "Tailwind CSS",
          "Framer Motion",
        ],
      },
      Backend: {
        skills: [
          "Spring Boot",
          "FastAPI",
          "Node.js",
          "Express.js",
          "RESTful APIs",
          "GraphQL",
          "WebSocket",
        ],
      },
      "Databases": {
        skills: [
          "PostgreSQL",
          "MySQL",
          "MongoDB",
          "Redis",
          "Firebase",
        ],
      },
      "Cloud & DevOps": {
        skills: [
          "AWS (EC2, S3, Lambda)",
          "Docker",
          "Kubernetes",
          "Jenkins",
          "Git",
          "CI/CD",
          "Linux",
        ],
      },
      "ML/AI & Data": {
        skills: [
          "TensorFlow",
          "PyTorch",
          "scikit-learn",
          "Pandas",
          "NumPy",
          "LangChain",
          "OpenCV",
          "Computer Vision",
          "NLP",
        ],
      },
      "Testing & Quality": {
        skills: [
          "JUnit",
          "Mockito",
          "Cypress",
          "Playwright",
          "Jest",
        ],
      },
    },
  },
  "videos.json": {
    sectionTitle: "Get to Know Me",
    sectionSubtitle:
      "Watch my video introduction to learn about my journey and skills",
    videos: [
      {
        id: "about-me",
        title: "About Me",
        duration: "90 seconds",
        videoSrc: "/videos/about-me.mp4",
        transcript: [
          {
            time: 0,
            text: "Hi! I'm Akash Shetty, a Software Engineer with 4+ years of production experience.",
            highlight: true,
          },
          {
            time: 5,
            text: "I'm currently pursuing my Master's in Computer Science at Northeastern University in Boston.",
          },
        ],
        chapters: [
          { time: 0, title: "Introduction" },
          { time: 12, title: "Technical Skills" },
        ],
      },
    ],
  },
};

// Write all files
Object.entries(contentFiles).forEach(([filename, content]) => {
  const filePath = path.join(contentDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  console.log(`✓ Created ${filename}`);
});

console.log("\n✅ All content files created successfully!");