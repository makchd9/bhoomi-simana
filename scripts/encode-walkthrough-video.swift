// Encode short, seek-friendly H.264 clips from the local master's full-resolution frames.
// swift scripts/encode-walkthrough-video.swift /tmp/simana-hd-frames public/videos/simana/hd
import AVFoundation
import AppKit
let source=CommandLine.arguments[1], output=CommandLine.arguments[2]
try FileManager.default.createDirectory(atPath:output,withIntermediateDirectories:true)
let scenes:[(String,Int)] = [("tower",120),("threshold",120),("landscape",120),("water",108),("interior",96)]
for (name,count) in scenes {
 for mobile in [false,true] {
  let width=mobile ? 1080 : 2560, height=mobile ? 1920 : 1440
  let file=URL(fileURLWithPath:output+"/"+name+(mobile ? "-mobile" : "")+".mp4")
  if FileManager.default.fileExists(atPath:file.path) { continue }
  let writer=try AVAssetWriter(outputURL:file,fileType:.mp4)
  writer.shouldOptimizeForNetworkUse=true
  let settings:[String:Any]=[
   AVVideoCodecKey:AVVideoCodecType.h264, AVVideoWidthKey:width, AVVideoHeightKey:height,
   AVVideoCompressionPropertiesKey:[AVVideoAverageBitRateKey:mobile ? 8_000_000 : 12_000_000,
    AVVideoMaxKeyFrameIntervalKey:6, AVVideoAllowFrameReorderingKey:false,
    AVVideoExpectedSourceFrameRateKey:30,AVVideoProfileLevelKey:AVVideoProfileLevelH264HighAutoLevel]
  ]
  let input=AVAssetWriterInput(mediaType:.video,outputSettings:settings)
  input.expectsMediaDataInRealTime=false
  let attributes:[String:Any]=[kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_32ARGB,
   kCVPixelBufferWidthKey as String:width,kCVPixelBufferHeightKey as String:height,
   kCVPixelBufferCGImageCompatibilityKey as String:true,kCVPixelBufferCGBitmapContextCompatibilityKey as String:true]
  let adaptor=AVAssetWriterInputPixelBufferAdaptor(assetWriterInput:input,sourcePixelBufferAttributes:attributes)
  writer.add(input)
  guard writer.startWriting() else { throw writer.error! }
  writer.startSession(atSourceTime:.zero)
  for i in 0..<count {
   try autoreleasepool {
    while !input.isReadyForMoreMediaData {
     if writer.status == .failed { throw writer.error! }
     Thread.sleep(forTimeInterval:0.002)
    }
    let image=NSImage(contentsOfFile:source+String(format:"/%@-%03d.jpg",name,i))!
    var rect=CGRect(origin:.zero,size:image.size)
    let cg=image.cgImage(forProposedRect:&rect,context:nil,hints:nil)!
    var buffer:CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(kCFAllocatorDefault,adaptor.pixelBufferPool!,&buffer)
    let pixel=buffer!
    CVPixelBufferLockBaseAddress(pixel,[])
    let context=CGContext(data:CVPixelBufferGetBaseAddress(pixel),width:width,height:height,bitsPerComponent:8,
      bytesPerRow:CVPixelBufferGetBytesPerRow(pixel),space:CGColorSpaceCreateDeviceRGB(),bitmapInfo:CGImageAlphaInfo.noneSkipFirst.rawValue)!
    context.interpolationQuality = .high
    let scale=max(Double(width)/Double(cg.width),Double(height)/Double(cg.height))
    let w=Double(cg.width)*scale,h=Double(cg.height)*scale
    context.draw(cg,in:CGRect(x:(Double(width)-w)/2,y:(Double(height)-h)/2,width:w,height:h))
    CVPixelBufferUnlockBaseAddress(pixel,[])
    guard adaptor.append(pixel,withPresentationTime:CMTime(value:Int64(i),timescale:30)) else { throw writer.error! }
   }
  }
  input.markAsFinished()
  let semaphore=DispatchSemaphore(value:0)
  writer.finishWriting { semaphore.signal() }
  semaphore.wait()
  if writer.status != .completed { throw writer.error! }
  print("Encoded",file.lastPathComponent);fflush(stdout)
 }
}
