/** Encode directly from camera sources: no JPEG intermediate or RGB colour conversion. */
import { spawnSync } from 'node:child_process';
import { mkdir, readFile } from 'node:fs/promises';
import sharp from 'sharp';
const [ffmpeg, master, clubhouse] = process.argv.slice(2);
if (!ffmpeg || !master || !clubhouse) throw new Error('Supply FFmpeg, tower master and clubhouse source paths.');
const videoDir = 'public/videos/simana/native-v3';
const posterDir = 'public/images/simana/native-v3';
await mkdir(videoDir, {recursive:true}); await mkdir(posterDir, {recursive:true});
const edits = JSON.parse(await readFile('docs/source/clubhouse-edits.json', 'utf8'));
const scenes = [
 {name:'tower',source:master,start:173,count:120,reverse:true},
 {name:'threshold',source:master,start:15.4,count:108},
 {name:'water',source:master,start:87,count:90},
 {name:'interior',source:master,start:120.7,count:99},
 ...edits.clips.map(c=>({name:c.name,source:clubhouse,start:c.start,count:c.frames})),
];
function run(args) {
 const result=spawnSync(ffmpeg,['-hide_banner','-loglevel','error','-y',...args],{stdio:'inherit'});
 if(result.status!==0) throw new Error('Media preparation failed.');
}
for(const s of scenes) {
 for(const mobile of s.source===master ? [false,true] : [false]) {
  const filter=[...(s.reverse?['trim=end_frame=121','reverse']:[]),'fps=30','setpts=PTS-STARTPTS',...(mobile?['crop=ih*9/16:ih','scale=1080:1920:flags=lanczos']:[])].join(',');
  const out=`${videoDir}/${s.name}${mobile?'-mobile':''}.mp4`;
  run(['-ss',String(s.start),'-t',String((s.count+(s.reverse?1:0))/30),'-i',s.source,'-vf',filter,'-frames:v',String(s.count),'-an','-c:v','libx264','-preset','medium','-crf','16','-g','6','-keyint_min','6','-sc_threshold','0','-bf','0','-threads','4','-pix_fmt','yuv420p','-movflags','+faststart',out]);
  console.log('Prepared',out);
 }
 // Extract the exact first source frame with a lossless transport to the web asset.
 const png=`/private/tmp/simana-native-${s.name}.png`;
 run(['-ss',String(s.reverse?177:s.start),'-i',s.source,'-frames:v','1',png]);
 await sharp(png).webp({lossless:true,effort:3}).toFile(`${posterDir}/${s.name}.webp`);
}
