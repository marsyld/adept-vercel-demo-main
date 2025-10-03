// components/BeforeAfter.tsx
import { useState, useRef, useEffect, useCallback } from "react";

type Props = {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  // если true — не растягиваем изображения больше их натурального размера
  noUpscale?: boolean;
};

export default function BeforeAfter({
  before,
  after,
  beforeAlt = "Before",
  afterAlt = "After",
  className = "",
  noUpscale = true,
}: Props) {
  const [pos, setPos] = useState(50); // %
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);

  // если меняются пути файлов — сбрасываем позицию и «перерисовываем»
  useEffect(() => {
    setPos(50);
  }, [before, after]);

  const onStart = useCallback(() => {
    isDraggingRef.current = true;
  }, []);
  const onEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);
  const onMove = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = (x / rect.width) * 100;
    setPos(percent);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    onStart();
    onMove(e.clientX);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) onMove(e.clientX);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    onStart();
    onMove(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    onMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const up = () => onEnd();
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, [onEnd]);

  // классы, чтобы НЕ увеличивать картинки сверх их натурального размера
  const imgBase =
    "select-none pointer-events-none block " +
    (noUpscale ? "max-w-full h-auto w-auto" : "w-full h-auto");

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden rounded-xl border border-gray-200 ${className}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
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
      {/* Контейнер изображений без апскейла; выравниваем по центру */}
      <div className="w-full flex justify-center items-center bg-white">
        <img src={after} alt={afterAlt} className={imgBase} />
      </div>

      {/* Маска для before */}
      <div
        className="absolute inset-0 pointer-events-none flex justify-center items-center"
        style={{ width: `${pos}%`, overflow: "hidden" }}
      >
        <img src={before} alt={beforeAlt} className={imgBase} />
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
