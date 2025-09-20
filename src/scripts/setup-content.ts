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
    tagline: "Building cool stuff with hot technologies",
    status: "Available for opportunities",
    github: "https://github.com/akashshetty1997",
    linkedin: "https://linkedin.com/in/akashshetty1997",
    resume: "/Akash_Shetty_Resume.pdf",
    aboutMe: {
      title: "Passionate Developer & Problem Solver",
      subtitle:
        "Full Stack Developer with a knack for creating elegant solutions to complex problems.",
      description:
        "Currently pursuing my Master's degree while building innovative applications that make a difference.",
      summary: [
        "I'm a passionate Full Stack Developer with expertise in building scalable web and mobile applications. My journey spans from creating intuitive user interfaces to architecting robust backend systems.",
        "Currently pursuing my Master's in Computer Science at Northeastern University, I combine academic excellence with practical industry experience to deliver innovative solutions.",
        "I believe in writing clean, maintainable code and creating applications that not only work well but also provide exceptional user experiences. When I'm not coding, you'll find me contributing to open-source projects or exploring the latest tech trends.",
      ],
      quickFacts: [
        "🚀 5+ Years Experience",
        "📱 Flutter Enthusiast",
        "⚡ Performance Optimizer",
        "🌍 Open Source Contributor",
        "🎯 Detail-Oriented",
        "💡 Problem Solver",
        "📚 Continuous Learner",
        "☕ Coffee Powered",
      ],
    },
    typingAnimationTexts: [
      "Full Stack Developer",
      "Mobile App Developer",
      "Open Source Contributor",
      "MS CS Student at Northeastern",
      "Building cool stuff with hot technologies",
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
        coursework: [
          "Program Design Paradigms (PDP)",
          "Database Management Systems (DBMS)",
        ],
      },
      {
        school: "Manipal University",
        degree: "Bachelor of Computer Applications",
        location: "Jaipur, India",
        duration: "Oct 2021 - Dec 2024",
        coursework: [],
      },
    ],
  },
  "experience.json": {
    sectionTitle: "Professional Experience",
    sectionSubtitle:
      "5+ years of building scalable applications and leading development teams",
    items: [
      {
        title: "Frontend Developer",
        company: "Goodpass",
        location: "Bengaluru, India",
        duration: "Mar 2024 - Aug 2024",
        description: [
          "Developed front-end solutions by analyzing requirements, designing, coding, and testing for seamless integration",
          "Collaborated with analysts to break down requirements into actionable tasks, improving team efficiency",
          "Built and maintained microservices using Node.js and Express.js, enhancing performance and scalability",
        ],
        technologies: ["React", "Node.js", "Express.js", "Microservices"],
        achievements: {
          teamEfficiency: "Improved team efficiency by 30%",
          codeQuality: "Maintained 95% code coverage",
        },
      },
      {
        title: "Software Engineer",
        company: "SoftXways ApS",
        location: "Bengaluru, India",
        duration: "Jun 2021 - Feb 2024",
        description: [
          "Created and integrated frontend components for a project management solution, enabling monitoring and user management",
          "Reduced page load time by 20% through code optimization and caching strategies",
          "Improved user engagement by 40% by enhancing interactivity using Vue.js and Vuex",
          "Conducted code reviews to ensure coding standards and best practices",
        ],
        technologies: [
          "Vue.js",
          "Vuex",
          "JavaScript",
          "Performance Optimization",
        ],
        achievements: {
          performance: "20% faster page loads",
          engagement: "40% increase in user engagement",
        },
      },
      {
        title: "Software Engineer",
        company: "Byte Academy",
        location: "New York, USA",
        duration: "Dec 2019 - Feb 2021",
        description: [
          "Implemented an interactive dashboard using Vue and Nuxt, enabling real-time data analysis",
          "Developed applications using Python, Flutter, React, and Vue.js, integrating with backend systems",
          "Practiced Agile methodology, Git version control, and Jira defect tracking",
        ],
        technologies: ["Vue.js", "Nuxt.js", "Python", "Flutter", "React"],
        achievements: {
          dashboards: "Built 5+ real-time dashboards",
          projects: "Delivered 10+ client projects",
        },
      },
    ],
  },
  "projects.json": {
    sectionTitle: "Featured Projects",
    sectionSubtitle:
      "Innovative applications that showcase my technical expertise and problem-solving skills",
    items: [
      {
        title: "SuperTrack",
        description:
          "AI-powered meal tracking and nutrition management mobile application",
        longDescription:
          "Led development team as Lead Developer, building a comprehensive nutrition tracking app with ML-powered image recognition for food identification and calorie estimation.",
        duration: "May 2025 - Present",
        role: "Lead Developer",
        highlights: [
          "Led development team, mentoring junior developers and managing task distribution",
          "Built modular FastAPI backend with MongoDB for meal data storage",
          "Integrated ML models for image/voice recognition for accurate calorie estimation",
          "Designed intuitive mobile UI/UX in Figma and implemented using Flutter",
          "Deployed backend services on AWS with scalable architecture",
        ],
        technologies: [
          "Flutter",
          "Dart",
          "FastAPI",
          "MongoDB",
          "Python",
          "AWS",
          "ML/AI",
          "Figma",
        ],
        github: "https://github.com/akashshetty1997/supertrack",
        live: null,
        image: "/images/supertrack.png",
        screenshots: [
          "/images/supertrack-1.png",
          "/images/supertrack-2.png",
          "/images/supertrack-3.png",
        ],
      },
      {
        title: "Open Food Facts Contributions",
        description: "Contributing to open-source food data platform",
        longDescription:
          "Active contributor to the Open Food Facts platform, enhancing UI and collaborating on nutrition transparency and food recognition features.",
        duration: "Feb 2025 - Present",
        role: "Open Source Contributor",
        highlights: [
          "Contributed to open-source food data platform using Svelte and TypeScript",
          "Enhanced UI and collaborated on nutrition transparency features",
          "Improved food recognition features for better user experience",
        ],
        technologies: ["Svelte", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/openfoodfacts",
        live: "https://world.openfoodfacts.org",
        image: "/images/openfoodfacts.png",
        screenshots: [],
      },
    ],
  },
  "skills.json": {
    sectionTitle: "Skills & Technologies",
    sectionSubtitle: "A comprehensive toolkit for building modern applications",
    categories: {
      "Mobile Development": {
        icon: "📱",
        skills: [
          "Flutter",
          "Dart",
          "RESTful APIs",
          "UI/UX Design (Figma)",
          "Mobile Testing",
        ],
      },
      Frontend: {
        icon: "🎨",
        skills: [
          "React.js",
          "Vue.js",
          "TypeScript",
          "JavaScript (ES6+)",
          "HTML5/CSS3",
          "Tailwind CSS",
        ],
      },
      Backend: {
        icon: "⚙️",
        skills: ["FastAPI", "Django", "Node.js", "Express.js", "Python"],
      },
      Database: {
        icon: "🗄️",
        skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
      },
      "Cloud & DevOps": {
        icon: "☁️",
        skills: ["AWS", "Docker", "CI/CD", "Git", "GitHub Actions"],
      },
      "ML/AI": {
        icon: "🤖",
        skills: [
          "Machine Learning Integration",
          "Computer Vision APIs",
          "pandas",
          "NumPy",
        ],
      },
      Tools: {
        icon: "🛠️",
        skills: [
          "VS Code",
          "Figma",
          "Jira",
          "Agile/Scrum",
          "Jest",
          "Xcode (learning)",
        ],
      },
    },
  },
  "videos.json": {
    sectionTitle: "Get to Know Me Better",
    sectionSubtitle:
      "Watch my video introductions to understand my journey, skills, and passion for development",
    videos: [
      {
        id: "about-me",
        title: "Tell Me About Yourself",
        duration: "90 seconds",
        videoSrc: "/videos/about-me.mp4",
        transcript: [
          {
            time: 0,
            text: "Hi! I'm Akash Shetty, a Full Stack Developer with over 5 years of experience.",
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
