/** Short-GOP video seeks, paced on the display clock rather than wheel events. */
export function createVideoSequence(video: HTMLVideoElement, name: string, count: number, mobile: boolean) {
  let active = false, started = false, disposed = false, failed = false;
  let target = 0, cursor = 0, requested = -1, presented = -1;
  let frameCallback = 0, animation = 0, lastTick = 0;
  const hasFrameCallback = typeof video.requestVideoFrameCallback === "function";
  video.muted = true;

  function schedule() {
    if (active && !disposed && !failed && !animation) animation = requestAnimationFrame(tick);
  }
  function tick(now: number) {
    animation = 0;
    if (!active || disposed || failed) return;
    const elapsed = Math.min(32, lastTick ? now - lastTick : 16.67);
    lastTick = now;
    if (video.readyState >= 2 && !video.seeking) {
      // Small eased steps avoid the large jumps caused by bursts of wheel/touch input.
      const difference = target - cursor;
      const step = difference * (1 - Math.exp(-elapsed / 70));
      cursor += Math.max(-2, Math.min(2, step));
      if (Math.abs(target - cursor) < 0.12) cursor = target;
      const frame = Math.max(0, Math.min(count - 1, Math.round(cursor)));
      if (frame !== requested) {
        requested = frame;
        video.currentTime = Math.min(frame / 30, Math.max(0, video.duration - 1 / 30));
      }
      if (cursor === target && presented === frame) return;
    }
    schedule();
  }
  function visible(time: number) {
    if (disposed || failed) return;
    presented = Math.min(count - 1, Math.round(time * 30));
    // Do not expose the decoder's initial frame before the first requested seek.
    if (active && requested >= 0 && Math.abs(presented - requested) <= 1) {
      video.style.opacity = "1";
      video.dataset.frame = String(presented);
    }
    schedule();
  }
  function observeFrame() {
    frameCallback = video.requestVideoFrameCallback((_now, metadata) => {
      visible(metadata.mediaTime);
      if (!disposed) observeFrame();
    });
  }
  function ready() { schedule(); }
  function seeked() {
    if (!hasFrameCallback) visible(video.currentTime);
    schedule();
  }
  function error() {
    failed = true;
    cancelAnimationFrame(animation); animation = 0;
    video.style.opacity = "0";
  }
  function prepare() {
    if (started || disposed || failed) return;
    started = true;
    video.src = `/videos/simana/native-v3/${name}${mobile ? "-mobile" : ""}.mp4`;
    video.preload = "auto";
    video.load();
  }
  video.addEventListener("loadeddata", ready);
  video.addEventListener("seeked", seeked);
  video.addEventListener("error", error);
  if (hasFrameCallback) observeFrame();

  return {
    prepare,
    render(value: number) {
      active = true;
      target = Math.max(0, Math.min(count - 1, value));
      video.dataset.targetFrame = String(Math.round(target));
      if (target >= 1) prepare();
      if (started) schedule();
    },
    pause() {
      active = false; video.pause(); lastTick = 0;
      cancelAnimationFrame(animation); animation = 0;
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(animation);
      if (hasFrameCallback) video.cancelVideoFrameCallback(frameCallback);
      video.removeEventListener("loadeddata", ready);
      video.removeEventListener("seeked", seeked);
      video.removeEventListener("error", error);
      video.pause(); video.removeAttribute("src"); video.load(); video.style.opacity = "0";
    },
  };
}
