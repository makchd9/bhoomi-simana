// Legacy still-sequence utility. The active journey uses video-sequence.ts.
/** Demand-loaded HD frames with a decoded-memory budget and nearest-ready-frame fallback. */
export function createFrameSequence(
  canvas: HTMLCanvasElement,
  name: string,
  count: number,
  mobile: boolean,
  format = "avif",
) {
  const context = canvas.getContext("2d", { alpha: false });
  const cache = new Map<number, HTMLImageElement>();
  const pending = new Set<number>();
  const failed = new Set<number>();
  let target = 0, last = -1, direction = 1, queue: number[] = [];
  let disposed = false, active = false;
  let cacheLimit = mobile ? 12 : 8;

  function paint(index: number, force = false) {
    const image = cache.get(index);
    if (!image || !context || disposed || (index === last && !force)) return;
    const width = canvas.clientWidth, height = canvas.clientHeight;
    if (!width || !height) return;
    // Match retina displays without creating a buffer larger than the source needs.
    const sourceRatio = Math.min(image.naturalWidth / width, image.naturalHeight / height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2, sourceRatio);
    const bufferWidth = Math.round(width * dpr), bufferHeight = Math.round(height * dpr);
    if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
      canvas.width = bufferWidth; canvas.height = bufferHeight;
    }
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
    context.drawImage(image, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    canvas.style.opacity = "1";
    canvas.dataset.frame = String(index);
    last = index;
  }

  function paintClosest() {
    let closest = -1, distance = Infinity;
    for (const index of cache.keys()) {
      const delta = Math.abs(index - target);
      if (delta < distance) { closest = index; distance = delta; }
    }
    if (closest >= 0) paint(closest);
  }

  function pump() {
    if (disposed || !active) return;
    while (pending.size < 4 && queue.length) {
      const index = queue.shift()!;
      if (cache.has(index) || pending.has(index) || failed.has(index)) continue;
      pending.add(index);
      const image = new Image();
      image.decoding = "async";
      image.src = `/images/simana/journey/${name}-${String(index).padStart(3, "0")}${mobile ? "-mobile" : ""}.${format}`;
      image.decode().then(() => {
        if (disposed || !active) return;
        cacheLimit = Math.max(3, Math.floor(120 * 1024 * 1024 / (image.naturalWidth * image.naturalHeight * 4)));
        cache.set(index, image);
        while (cache.size > cacheLimit) {
          const farthest = [...cache.keys()].sort((a,b) => Math.abs(b-target)-Math.abs(a-target))[0];
          cache.delete(farthest);
        }
        // A moving scroll target used to prevent decoded frames being drawn at all.
        // Draw the closest ready frame, then replace it as the exact one arrives.
        paintClosest();
      }).catch(() => failed.add(index)).finally(() => { pending.delete(index); pump(); });
    }
  }

  function render(value: number) {
    active = true;
    const next = Math.max(0, Math.min(count - 1, Math.round(value)));
    if (next !== target) direction = Math.sign(next - target);
    target = next;
    canvas.dataset.targetFrame = String(target);
    paintClosest();
    // Prioritise travel direction instead of spending half the requests behind the camera.
    queue = [target, target + direction, target + 2 * direction, target - direction];
    for (let step = 3; step <= 7; step++) queue.push(target + step * direction);
    queue = queue.filter(index => index >= 0 && index < count && !cache.has(index) && !pending.has(index));
    pump();
  }
  const resize = new ResizeObserver(() => { if (last >= 0) paint(last, true); });
  resize.observe(canvas);
  return {
    render,
    pause() { active = false; queue = []; for (const key of cache.keys()) if (key !== last) cache.delete(key); },
    dispose() { disposed = true; resize.disconnect(); cache.clear(); queue = []; canvas.style.opacity = "0"; },
  };
}
