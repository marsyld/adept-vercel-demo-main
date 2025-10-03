// components/BeforeAfter.tsx
import { useState, useRef, useEffect, useCallback } from "react";

type Props = {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
};

export default function BeforeAfter({
  before,
  after,
  beforeAlt = "Before",
  afterAlt = "After",
  className = "",
}: Props) {
  const [pos, setPos] = useState(50); // %
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    setPos(50);
  }, [before, after]);

  const startDrag = () => (isDraggingRef.current = true);
  const stopDrag = () => (isDraggingRef.current = false);

  const move = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPos((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const end = () => stopDrag();
    window.addEventListener("mouseup", end);
    window.addEventListener("touchend", end);
    return () => {
      window.removeEventListener("mouseup", end);
      window.removeEventListener("touchend", end);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full aspect-[3/4] overflow-hidden rounded-xl border border-gray-200 ${className}`}
      onMouseDown={(e) => {
        startDrag();
        move(e.clientX);
      }}
      onMouseMove={(e) => {
        if (isDraggingRef.current) move(e.clientX);
      }}
      onTouchStart={(e) => {
        startDrag();
        move(e.touches[0].clientX);
      }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-label="Сравнение до и после"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 2));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 2));
      }}
    >
      {/* AFTER (фон) */}
      <img
        src={after}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* BEFORE (маска) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${pos}%` }}
      >
        <img
          src={before}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
      </div>

      {/* Ползунок */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: `calc(${pos}% - 1px)` }}
      >
        <div className="w-0.5 h-full bg-white/80 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2">
          <div className="h-8 w-8 rounded-full bg-white shadow border border-gray-200" />
        </div>
      </div>
    </div>
  );
}
