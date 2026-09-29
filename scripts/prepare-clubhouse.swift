// Original website film -> short, seek-friendly clips, preserving the source framing.
// swift scripts/prepare-clubhouse.swift <downloaded clubhouse.mp4> <manifest.json> <output directory>
import AVFoundation
import AppKit

struct Edit: Decodable { let name: String; let start: Double; let end: Double; let frames: Int }
struct Manifest: Decodable { let clips: [Edit] }
let asset = AVURLAsset(url: URL(fileURLWithPath: CommandLine.arguments[1]))
let edits = try JSONDecoder().decode(Manifest.self, from: Data(contentsOf: URL(fileURLWithPath: CommandLine.arguments[2])))
let output = CommandLine.arguments[3]
try FileManager.default.createDirectory(atPath: output, withIntermediateDirectories: true)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero
for edit in edits.clips {
  let file = URL(fileURLWithPath: output + "/" + edit.name + ".mp4")
  if FileManager.default.fileExists(atPath: file.path) { continue }
  let writer = try AVAssetWriter(outputURL: file, fileType: .mp4)
  writer.shouldOptimizeForNetworkUse = true
  let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: 1920, AVVideoHeightKey: 1080,
    AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: 18_000_000,
      AVVideoMaxKeyFrameIntervalKey: 1, AVVideoAllowFrameReorderingKey: false,
      AVVideoExpectedSourceFrameRateKey: 30, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel]
  ])
  let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB,
    kCVPixelBufferWidthKey as String: 1920, kCVPixelBufferHeightKey as String: 1080,
    kCVPixelBufferCGImageCompatibilityKey as String: true,
    kCVPixelBufferCGBitmapContextCompatibilityKey as String: true
  ])
  writer.add(input)
  guard writer.startWriting() else { throw writer.error! }
  writer.startSession(atSourceTime: .zero)
  for i in 0..<edit.frames {
    try autoreleasepool {
      while !input.isReadyForMoreMediaData {
        if writer.status == .failed { throw writer.error! }
        Thread.sleep(forTimeInterval: 0.002)
      }
      let time = edit.start + (edit.end - edit.start) * Double(i) / Double(edit.frames - 1)
      let image = try generator.copyCGImage(at: CMTime(seconds: time, preferredTimescale: 600), actualTime: nil)
      if i == 0 {
        let poster = NSBitmapImageRep(cgImage: image).representation(using: .png, properties: [:])!
        try poster.write(to: URL(fileURLWithPath: output + "/" + edit.name + "-poster.png"))
      }
      var buffer: CVPixelBuffer?
      CVPixelBufferPoolCreatePixelBuffer(kCFAllocatorDefault, adaptor.pixelBufferPool!, &buffer)
      let pixel = buffer!
      CVPixelBufferLockBaseAddress(pixel, [])
      let context = CGContext(data: CVPixelBufferGetBaseAddress(pixel), width: 1920, height: 1080,
        bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(pixel),
        space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)!
      context.draw(image, in: CGRect(x: 0, y: 0, width: 1920, height: 1080))
      CVPixelBufferUnlockBaseAddress(pixel, [])
      guard adaptor.append(pixel, withPresentationTime: CMTime(value: Int64(i), timescale: 30)) else { throw writer.error! }
    }
  }
  input.markAsFinished()
  let done = DispatchSemaphore(value: 0)
  writer.finishWriting { done.signal() }; done.wait()
  if writer.status != .completed { throw writer.error! }
  print("Prepared", edit.name); fflush(stdout)
}
