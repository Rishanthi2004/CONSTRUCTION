import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { AnimatedWords } from './AnimatedWords';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onStartConstruction: () => void;
}

const TIMELAPSE_FRAMES: string[] = [
  '/src/assets/images/hero_stage_1_land_1795600434607.jpg',
  '/src/assets/images/hero_stage_2_foundation_1795600436409.jpg',
  '/src/assets/images/hero_stage_3_structure_1795600582077.jpg',
  '/src/assets/images/hero_stage_4_masonry_1795600583415.jpg',
  '/src/assets/images/hero_stage_5_roof_1795600583949.jpg',
  '/src/assets/images/hero_stage_6_windows_1795600586757.jpg',
  '/src/assets/images/hero_stage_7_landscape_1795600438114.jpg',
  '/src/assets/images/hero_stage_8_complete_1795600405544.jpg',
];

const LOOP_DURATION_MS = 8000;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
  focusY = 0.5,
) {
  if (!img.complete || img.naturalWidth === 0) return;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawW = canvasWidth;
  let drawH = canvasHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (canvasRatio > imgRatio) {
    drawW = canvasWidth;
    drawH = canvasWidth / imgRatio;
    offsetY = (canvasHeight - drawH) * focusY;
  } else {
    drawH = canvasHeight;
    drawW = canvasHeight * imgRatio;
    offsetX = (canvasWidth - drawW) * 0.5;
  }

  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

export function HeroSection({
  onExploreProjects,
  onStartConstruction,
}: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [loadedCount, setLoadedCount] = useState(0);
  const elapsedRef = useRef(0);
  const lastFrameTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadedFlags = new Array(TIMELAPSE_FRAMES.length).fill(false);

    const imgs = TIMELAPSE_FRAMES.map((src, idx) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (!mounted || loadedFlags[idx]) return;
        loadedFlags[idx] = true;
        setLoadedCount((c) => c + 1);
      };
      img.onerror = () => {
        if (!mounted || loadedFlags[idx]) return;
        loadedFlags[idx] = true;
        setLoadedCount((c) => c + 1);
      };
      img.src = src;
      return img;
    });

    imagesRef.current = imgs;
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const syncCanvasSize = () => {
      if (!container || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };

    syncCanvasSize();
    const observer = new ResizeObserver(syncCanvasSize);
    observer.observe(container);

    let rafId = 0;

    const renderFrame = (now: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = now;
      }
      const delta = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      if (prefersReduced) {
        elapsedRef.current = 7500;
      } else {
        elapsedRef.current = (elapsedRef.current + delta) % LOOP_DURATION_MS;
      }

      const tSec = elapsedRef.current / 1000;
      const stageIdx = Math.min(7, Math.floor(tSec));
      const localProgress = tSec - stageIdx;

      const imgs = imagesRef.current;
      const currentImg = imgs[stageIdx];
      const prevImg = imgs[(stageIdx + 7) % 8];
      const nextImg = imgs[0];

      ctx.fillStyle = '#F1ECE3';
      ctx.fillRect(0, 0, width, height);

      if (stageIdx === 7 && localProgress > 0.75 && nextImg?.complete && currentImg?.complete) {
        const blend = easeInOutCubic((localProgress - 0.75) / 0.25);
        ctx.globalAlpha = 1;
        drawCoverImage(ctx, currentImg, width, height);
        ctx.globalAlpha = blend;
        drawCoverImage(ctx, nextImg, width, height);
        ctx.globalAlpha = 1;
      } else if (stageIdx > 0 && localProgress < 0.42 && prevImg?.complete && currentImg?.complete) {
        const progress = easeInOutCubic(localProgress / 0.42);
        ctx.globalAlpha = 1;
        drawCoverImage(ctx, prevImg, width, height);

        ctx.save();
        const revealTop = height * (1 - Math.min(1, progress * 1.18));
        ctx.beginPath();
        ctx.rect(0, Math.max(0, revealTop - 32), width, height);
        ctx.clip();
        ctx.globalAlpha = Math.min(1, 0.25 + progress * 0.75);
        drawCoverImage(ctx, currentImg, width, height);
        ctx.restore();

        ctx.globalAlpha = progress * 0.85;
        drawCoverImage(ctx, currentImg, width, height);
        ctx.globalAlpha = 1;
      } else if (currentImg?.complete) {
        ctx.globalAlpha = 1;
        drawCoverImage(ctx, currentImg, width, height);
      } else {
        const fallback = imgs[7];
        if (fallback?.complete) {
          drawCoverImage(ctx, fallback, width, height);
        }
      }

      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [loadedCount]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[92svh] sm:h-screen min-h-[580px] sm:min-h-[680px] max-h-[1080px] overflow-hidden bg-[#F1ECE3] border-b border-[#E3DDD2]"
    >
      {/* Full-Viewport 8-Second Architectural Construction Timelapse */}
      <canvas
        ref={canvasRef}
        aria-label="8-second architectural construction timelapse of a modern two-storey luxury house"
        className="block w-full h-full"
      />

      {/* Luminous Warm Limestone Scrims for High-Contrast Legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FAF7F2]/85 via-[#FAF7F2]/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] sm:h-[52%] bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-r from-[#FAF7F2]/75 via-[#FAF7F2]/30 to-transparent"
      />

      {/* Hero Animated Words & Actions */}
      <div className="absolute inset-x-0 bottom-0 z-10 pb-10 sm:pb-14 lg:pb-16 px-5 sm:px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-2xl">
            <AnimatedWords
              as="p"
              immediate
              delay={0.05}
              stagger={0.04}
              text="Architectural Construction & Engineering"
              className="text-xs font-medium tracking-[0.16em] uppercase text-[#B85A3A]"
            />

            <AnimatedWords
              as="h1"
              immediate
              delay={0.14}
              stagger={0.06}
              text="Building Dreams. Creating Landmarks."
              className="mt-3 font-display text-[clamp(2.25rem,4.4vw,3.85rem)] font-semibold tracking-tight text-[#1B1F1D] leading-[1.06]"
            />

            <AnimatedWords
              as="p"
              immediate
              delay={0.32}
              stagger={0.02}
              duration={0.42}
              text="From foundation to finishing, we bring your vision to life with quality construction and exceptional craftsmanship."
              className="mt-4 text-base sm:text-lg text-[#5C615D] leading-relaxed max-w-xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 flex flex-wrap items-center gap-3.5"
            >
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStartConstruction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-[#FAF7F2] bg-[#203D33] hover:bg-[#162B24] rounded-lg transition-colors duration-200 shadow-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85A3A]"
              >
                <span>Start Your Construction</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreProjects}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-[#1B1F1D] bg-[#FFFDF9]/95 hover:bg-[#F1ECE3] border border-[#E3DDD2] hover:border-[#B85A3A] rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explore Our Projects</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
