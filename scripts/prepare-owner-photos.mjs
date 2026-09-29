import sharp from 'sharp';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
const input = process.argv[2];
const manifestPath = process.argv[3];
if (!input || !manifestPath) throw new Error('Supply the originals directory and Drive manifest JSON.');
const manifest = JSON.parse(await readFile(manifestPath,'utf8'));
await mkdir('public/images/simana/spaces-native',{recursive:true});
for(const item of manifest){
 const source = `${input}/${item.slug}.png`;
 const meta = await sharp(source).metadata();
 await sharp(source).webp({lossless:true,effort:3}).toFile(`public/images/simana/spaces-native/${item.slug}.webp`);
 Object.assign(item,{width:meta.width,height:meta.height,sourceUrl:`https://drive.google.com/file/d/${item.id}/view`,asset:`/images/simana/spaces-native/${item.slug}.webp`});
}
await writeFile('docs/source/owner-gallery-manifest.json',JSON.stringify(manifest,null,2)+'\n');
console.log(`Prepared ${manifest.length} owner-supplied images.`);
