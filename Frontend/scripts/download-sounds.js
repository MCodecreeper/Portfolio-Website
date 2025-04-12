import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sounds = {
  'click.mp3': 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  'hover.mp3': 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
  'success.mp3': 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  'error.mp3': 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3'
};

const soundsDir = path.join(__dirname, '../public/sounds');

// Create sounds directory if it doesn't exist
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

// Download each sound
Object.entries(sounds).forEach(([filename, url]) => {
  const filePath = path.join(soundsDir, filename);
  
  console.log(`Downloading ${filename} from ${url}...`);
  
  https.get(url, (response) => {
    const fileStream = fs.createWriteStream(filePath);
    response.pipe(fileStream);
    
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded ${filename} (${fs.statSync(filePath).size} bytes)`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err.message);
  });
}); 