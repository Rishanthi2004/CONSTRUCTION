import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface MobileTouchCarouselProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  getTabLabel?: (item: T, index: number) => string;
  getAriaLabel?: (item: T, index: number) => string;
  renderItem: (item: T, index: number, isActive: boolean, wasDragged: () => boolean) => ReactNode;
  nextLabel?: string;
  prevLabel?: string;
  className?: string;
  resetDependency?: unknown;
}

export function MobileTouchCarousel<T>({
  items,
  getKey,
  getTabLabel,
  getAriaLabel,
  renderItem,
  nextLabel = 'Next',
  prevLabel = 'Previous',
  className = '',
  resetDependency,
}: MobileTouchCarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMouseDraggingRef = useRef(false);
  const mouseStartXRef = useRef(0);
  const mouseStartScrollRef = useRef(0);
  const didDragRef = useRef(false);

  const safeIndex = items.length > 0 ? Math.min(activeIndex, items.length - 1) : 0;

  useEffect(() => {
    setActiveIndex(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [resetDependency, items.length]);

  const scrollToIndex = useCallback(
    (targetIndex: number) => {
      const track = trackRef.current;
      if (!track || items.length === 0) return;
      const normalized = (targetIndex + items.length) % items.length;
      const slide = track.children[normalized] as HTMLElement | undefined;
      if (slide) {
        track.scrollTo({
          left: slide.offsetLeft,
          behavior: 'smooth',
        });
      }
      setActiveIndex(normalized);
    },
    [items.length],
  );

  const syncIndexFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;

    const currentScroll = track.scrollLeft;
    let closestIdx = 0;
    let minDist = Infinity;

    for (let i = 0; i < track.children.length; i++) {
      const child = track.children[i] as HTMLElement;
      const dist = Math.abs(child.offsetLeft - currentScroll);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = i;
      }
    }

    setActiveIndex(closestIdx);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || items.length <= 1) return;
    isMouseDraggingRef.current = true;
    didDragRef.current = false;
    mouseStartXRef.current = e.clientX;
    mouseStartScrollRef.current = track.scrollLeft;
    track.style.scrollBehavior = 'auto';
    track.style.scrollSnapType = 'none';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDraggingRef.current || !trackRef.current) return;
      const dx = e.clientX - mouseStartXRef.current;
      if (Math.abs(dx) > 6) {
        didDragRef.current = true;
      }
      trackRef.current.scrollLeft = mouseStartScrollRef.current - dx;
    };

    const handleMouseUp = () => {
      if (!isMouseDraggingRef.current || !trackRef.current) return;
      isMouseDraggingRef.current = false;
      const track = trackRef.current;
      track.style.scrollBehavior = 'smooth';
      track.style.scrollSnapType = 'x mandatory';
      syncIndexFromScroll();

      const currentScroll = track.scrollLeft;
      let closestIdx = 0;
      let minDist = Infinity;
      for (let i = 0; i < track.children.length; i++) {
        const child = track.children[i] as HTMLElement;
        const dist = Math.abs(child.offsetLeft - currentScroll);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = i;
        }
      }
      const target = track.children[closestIdx] as HTMLElement | undefined;
      if (target) {
        track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
      }

      if (didDragRef.current) {
        window.setTimeout(() => {
          didDragRef.current = false;
        }, 80);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [syncIndexFromScroll]);

  const wasDragged = useCallback(() => didDragRef.current, []);

  if (items.length === 0) return null;

  return (
    <div className={className}>
      {/* Top Step Counter & Quick Numbered Tabs */}
      {items.length > 1 && (
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {items.map((item, idx) => {
              const isSelected = idx === safeIndex;
              const label = getTabLabel ? getTabLabel(item, idx) : String(idx + 1).padStart(2, '0');
              return (
                <button
                  key={getKey(item, idx)}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  aria-label={getAriaLabel ? getAriaLabel(item, idx) : `Slide ${idx + 1}`}
                  className={`px-2.5 py-1 rounded-md font-mono text-[11px] tabular-nums transition-colors shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#203D33] text-[#FAF7F2] font-medium'
                      : 'bg-[#FFFDF9] text-[#5C615D] border border-[#E3DDD2] hover:text-[#1B1F1D]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <span className="font-mono text-[11px] tabular-nums text-[#5C615D] shrink-0">
            {String(safeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* Touch-Swipeable & Mouse-Draggable Snap Track */}
      <div
        ref={trackRef}
        onScroll={syncIndexFromScroll}
        onMouseDown={handleMouseDown}
        style={{ touchAction: 'pan-x pan-y' }}
        className="relative flex gap-3.5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-2 select-none"
      >
        {items.map((item, idx) => (
          <div
            key={getKey(item, idx)}
            className={`${items.length > 1 ? 'w-[88%] sm:w-[82%]' : 'w-full'} shrink-0 snap-start`}
          >
            {renderItem(item, idx, idx === safeIndex, wasDragged)}
          </div>
        ))}
      </div>

      {/* Bottom Prev / Next Controls + Swipe Hint */}
      {items.length > 1 && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollToIndex(safeIndex - 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#1B1F1D] bg-[#FFFDF9] border border-[#E3DDD2] hover:border-[#203D33] rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{prevLabel}</span>
          </motion.button>

          <span className="font-mono text-[10px] uppercase tracking-wider text-[#5C615D]">
            Swipe cards
          </span>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollToIndex(safeIndex + 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#FAF7F2] bg-[#203D33] hover:bg-[#162B24] rounded-lg transition-colors cursor-pointer"
          >
            <span>{nextLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
