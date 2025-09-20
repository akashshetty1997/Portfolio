// src/scripts/create-video-placeholders.ts
import fs from 'fs';
import path from 'path';

const videosDir = path.join(process.cwd(), 'public', 'videos');
const imagesDir = path.join(process.cwd(), 'public', 'images');

// Create directories if they don't exist
[videosDir, imagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
});

// Create placeholder files list
const placeholderFiles = [
  'videos/about-me.mp4',
  'videos/elevator-pitch.mp4',
  'images/supertrack.png',
  'images/supertrack-1.png',
  'images/supertrack-2.png',
  'images/supertrack-3.png',
  'images/openfoodfacts.png',
  'images/profile.jpg'
];

console.log('\n📁 Required media files:');
placeholderFiles.forEach(file => {
  const filePath = path.join(process.cwd(), 'public', file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file} exists`);
  } else {
    console.log(`✗ ${file} - needs to be added`);
  }
});

console.log('\n💡 Tip: Add your actual video and image files to the public directory');