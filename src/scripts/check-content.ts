// src/scripts/check-content.ts
import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "src", "content");
const requiredFiles = [
  "personal-info.json",
  "education.json",
  "experience.json",
  "projects.json",
  "skills.json",
  "videos.json",
];

requiredFiles.forEach((file) => {
  const filePath = path.join(contentDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing: ${file}`);
  } else {
    const content = fs.readFileSync(filePath, "utf8");
    if (content.trim() === "" || content === "{}") {
      console.error(`Empty: ${file}`);
    } else {
      console.log(`✓ ${file}`);
    }
  }
});
