// Extract only the chosen camera movements from the owner-supplied master.
// swift scripts/prepare-walkthrough.swift /path/to/master.mp4 /tmp/simana-owner-frames
import AVFoundation
import AppKit
let asset = AVURLAsset(url:URL(fileURLWithPath:CommandLine.arguments[1]))
let output = CommandLine.arguments[2]
try FileManager.default.createDirectory(atPath:output,withIntermediateDirectories:true)
// In/out points are kept together so a replacement film is straightforward to re-edit.
let scenes:[(String,Double,Double,Int)] = [
 ("tower",177.0,173.0,120),
 ("threshold",15.4,19.0,108),
 ("water",87.0,90.0,90),
 ("interior",120.7,124.0,99)
]
let generator = AVAssetImageGenerator(asset:asset)
generator.appliesPreferredTrackTransform = true
generator.maximumSize = CGSize(width:3840,height:3840)
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero
for (name,start,end,count) in scenes {
 for i in 0..<count {
  try autoreleasepool {
   let image = try generator.copyCGImage(at:CMTime(seconds:start+(end-start)*Double(i)/Double(count-1),preferredTimescale:600),actualTime:nil)
   let data = NSBitmapImageRep(cgImage:image).representation(using:.jpeg,properties:[.compressionFactor:0.98])!
   try data.write(to:URL(fileURLWithPath:output+String(format:"/%@-%03d.jpg",name,i)))
  }
 }
 print("Extracted",name,count)
 fflush(stdout)
}
