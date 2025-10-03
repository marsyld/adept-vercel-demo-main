// components/BeforeAfter.tsx
import { useState, useRef, useEffect, useCallback } from "react";

type Props = {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  /** Стартовая позиция шторки в процентах (0–100), по умолчанию 50 */
  initial?: number;
};

export default function BeforeAfter({
  before,
  after,
  beforeAlt = "Before",
  afterAlt = "After",
  className = "",
  initial = 50,
}: Props) {
  const [pos, setPos] = useState(
    Number.isFinite(initial) ? Math.min(100, Math.max(0, initial)) : 50
  );
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  // Сбрасываем положение при смене изображений
  useEffect(() => {
    setPos(Number.isFinite(initial) ? Math.min(100, Math.max(0, initial)) : 50);
  }, [before, after, initial]);

  const move = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - r.left, 0), r.width);
    setPos((x / r.width) * 100);
  }, []);

  useEffect(() => {
    const up = () => (dragging.current = false);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full aspect-[3/4] overflow-hidden rounded-xl border border-gray-200 ${className}`}
      onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
      onMouseMove={(e) => { if (dragging.current) move(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; move(e.touches[0].clientX); }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      role="slider"
      aria-label="Сравнение до и после"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 2));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 2));
      }}
    >
      {/* AFTER — нижний слой, полностью видим */}
      <img
        src={after}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* BEFORE — верхний слой, видим только левую часть по clip-path */}
      <img
        src={before}
        alt={beforeAlt}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      />

      {/* Делитель/ползунок */}
      <div className="absolute top-0 bottom-0" style={{ left: `calc(${pos}% - 1px)` }}>
        <div className="w-0.5 h-full bg-white/85 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2">
          <div className="h-8 w-8 rounded-full bg-white shadow border border-gray-200" />
        </div>
      </div>
    </div>
  );
}
