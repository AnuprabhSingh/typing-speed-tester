#!usr/bin/env node
import chokidar from 'chokidar';
import fs from 'node:fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'input.txt');

let startTime = null;
let lastWordCount = 0;

console.log("Typing Speed Tester: Start typing in 'input.txt'...");

chokidar.watch(filePath).on('change', async () => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');

    const words = content.trim().split(/\s+/).filter(Boolean);

    // Initialize the start time when typing begins
    if (!startTime) {
      startTime = Date.now();
    }

    const minutesElapsed = (Date.now() - startTime) / 60000;

    const currWordCount = words.length;
    const newWords = currWordCount - lastWordCount;
    lastWordCount = currWordCount;

    const wpm = (currWordCount / minutesElapsed).toFixed(2);

    console.clear();
    console.log("Typing Speed Tester");
    console.log("-------------------");
    console.log(`Total words: ${currWordCount}`);
    console.log(`New words typed: ${newWords}`);
    console.log(`Typing speed: ${wpm} WPM`);
    console.log("Keep typing in 'input.txt'...");
  } catch (error) {
    console.error('Error reading the file:', error);
  }
});
