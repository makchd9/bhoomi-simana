// Usage: swift scripts/extract-journey.swift overview.mp4 residence.mp4 /tmp/simana-frames
import AVFoundation
import AppKit
let output = CommandLine.arguments[3]
try FileManager.default.createDirectory(atPath: output, withIntermediateDirectories: true)
let scenes: [(String,String,Double,Double,Int)] = [
 ("arrival", CommandLine.arguments[1], 4.65, 5.9, 48),
 ("outlook", CommandLine.arguments[1], 9.8, 12.3, 64),
 ("within", CommandLine.arguments[2], 0.1, 7.0, 96)
]
for (name, path, start, end, count) in scenes {
 let generator = AVAssetImageGenerator(asset: AVURLAsset(url: URL(fileURLWithPath: path)))
 generator.appliesPreferredTrackTransform = true
 generator.maximumSize = CGSize(width: 1600, height: 1600)
 generator.requestedTimeToleranceBefore = .zero
 generator.requestedTimeToleranceAfter = .zero
 for index in 0..<count {
  try autoreleasepool {
   let t = start + (end-start)*Double(index)/Double(count-1)
   let image = try generator.copyCGImage(at: CMTime(seconds:t,preferredTimescale:600),actualTime:nil)
   let data = NSBitmapImageRep(cgImage:image).representation(using:.jpeg,properties:[.compressionFactor:0.9])!
   try data.write(to:URL(fileURLWithPath:output + "/" + String(format:"%@-%03d.jpg",name,index)))
  }
 }
 print(name, count)
}
