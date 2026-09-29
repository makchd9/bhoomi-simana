// Usage: node scripts/encode-journey.mjs /tmp/simana-frames
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
const input = process.argv[2];
if (!input) throw new Error("Supply the extracted frames directory.");
const output = "public/images/simana/journey";
await mkdir(output, { recursive: true });
const frames = (await readdir(input)).filter((name) =>
  /^(arrival|outlook|within)-\d{3}\.jpg$/.test(name),
);
for (let index = 0; index < frames.length; index += 6) {
  await Promise.all(
    frames.slice(index, index + 6).map(async (name) => {
      const file = path.join(input, name),
        base = name.replace(/\.jpg$/, "");
      await Promise.all([
        sharp(file)
          .resize(1440)
          .webp({ quality: 70 })
          .toFile(path.join(output, `${base}.webp`)),
        sharp(file)
          .resize(840)
          .webp({ quality: 65 })
          .toFile(path.join(output, `${base}-mobile.webp`)),
      ]);
    }),
  );
}
console.log(`Encoded ${frames.length} frames at two responsive sizes.`);
