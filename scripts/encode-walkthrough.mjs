// High-resolution still posters. Motion is encoded separately with encode-walkthrough-video.swift.
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';
const input = process.argv[2];
if (!input) throw new Error('Supply the full-resolution extracted frames directory.');
const output = 'public/images/simana/journey-hd';
await mkdir(output, { recursive: true });
for (const name of ['tower','threshold','landscape','water','interior']) {
 await sharp(`${input}/${name}-000.jpg`).resize(3840).webp({quality:92}).toFile(`${output}/${name}-000-poster.webp`);
}
console.log('Prepared five full-resolution WebP posters.');
