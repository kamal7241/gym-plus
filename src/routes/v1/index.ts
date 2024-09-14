import fs from 'fs';
import path from 'path';
import { Router } from 'express';

const router = Router();

// Read all files in the current directory
const files = fs.readdirSync(__dirname);

files.forEach((file) => {
  // Skip the index file itself
  if (file !== 'index.ts' && file !== 'index.js') {
    // Get the file's full path
    const filePath = path.join(__dirname, file);

    // Import the route file (support both .ts and .js extensions)
    let route;
    if (filePath.endsWith('.ts') || filePath.endsWith('.js')) {
      route = require(filePath).default;
    }

    // Use the route (assuming each route file exports an Express router)
    if (route && typeof route === 'function') {
      router.use(route);
    }
  }
});

export default router;
