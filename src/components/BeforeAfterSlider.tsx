import { useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  aspectClass?: string;
  mode?: 'dual' | 'vertical-split';
  alignBottomCrop?: boolean;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  aspectClass = 'aspect-[4/5]',
  mode = 'dual',
  alignBottomCrop = false,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(52);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(5, Math.min(95, pct)));
  };

  const baseDualClass = alignBottomCrop
    ? 'w-full h-full object-cover object-[50%_66%]'
    : 'w-full h-full object-cover';

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        draggingRef.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!draggingRef.current) return;
        updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        draggingRef.current = false;
      }}
      onPointerCancel={() => {
        draggingRef.current = false;
      }}
      className={`relative ${aspectClass} w-full overflow-hidden select-none touch-none bg-[#F1ECE3] cursor-ew-resize`}
      role="slider"
      aria-label="Drag to compare construction before and after completion"
      aria-valuemin={5}
      aria-valuemax={95}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPosition((p) => Math.max(5, p - 4));
        if (e.key === 'ArrowRight') setPosition((p) => Math.min(95, p + 4));
      }}
    >
      {/* After Image (Full Background) */}
      {mode === 'vertical-split' ? (
        <img
          src={afterSrc}
          alt={afterAlt}
          referrerPolicy="no-referrer"
          draggable={false}
          className="absolute inset-x-0 bottom-0 w-full h-[204%] object-cover object-bottom"
        />
      ) : (
        <img
          src={afterSrc}
          alt={afterAlt}
          referrerPolicy="no-referrer"
          draggable={false}
          className={`absolute inset-0 ${baseDualClass}`}
        />
      )}

      {/* Before Image (Clipped to Left of Slider) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {mode === 'vertical-split' ? (
          <img
            src={beforeSrc}
            alt={beforeAlt}
            referrerPolicy="no-referrer"
            draggable={false}
            className="absolute inset-x-0 top-0 w-full h-[204%] object-cover object-top"
          />
        ) : (
          <img
            src={beforeSrc}
            alt={beforeAlt}
            referrerPolicy="no-referrer"
            draggable={false}
            className={`absolute inset-0 ${baseDualClass}`}
          />
        )}
      </div>

      {/* Subtle Corner Labels */}
      <div className="pointer-events-none absolute top-3 left-3 px-2.5 py-1 rounded bg-[#203D33]/85 text-[#FAF7F2] text-[11px] font-medium tracking-wide">
        Construction
      </div>
      <div className="pointer-events-none absolute top-3 right-3 px-2.5 py-1 rounded bg-[#FFFDF9]/92 text-[#1B1F1D] text-[11px] font-medium tracking-wide shadow-sm">
        Completed
      </div>

      {/* Divider Line & Handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-[2px] bg-[#FFFDF9] shadow-[0_0_10px_rgba(27,31,29,0.35)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FFFDF9] text-[#203D33] border border-[#E3DDD2] shadow-lg flex items-center justify-center">
          <MoveHorizontal className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
