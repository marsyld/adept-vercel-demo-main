import { useEffect, useRef, useState } from "react";

export default function BeforeAfter({
  before = "/demo/before.jpg",
  after = "/demo/after.jpg",
  ratio = 16 / 9,
  // ✨ новое: подписи для доступности (необязательные)
  beforeAlt = "Фото лица — До",
  afterAlt = "Фото лица — После",
}: {
  before?: string;
  after?: string;
  ratio?: number;
  beforeAlt?: string;
  afterAlt?: string;
}) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const pct = (x: number) => {
      const r = el.getBoundingClientRect();
      const clamped = Math.min(Math.max(x - r.left, 0), r.width);
      return (clamped / r.width) * 100;
    };

    const down = (e: MouseEvent | TouchEvent) => {
      dragging.current = true;
      const x =
        e instanceof TouchEvent ? e.touches[0].clientX : (e as MouseEvent).clientX;
      setPos(pct(x));
    };
    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x =
        e instanceof TouchEvent ? e.touches[0].clientX : (e as MouseEvent).clientX;
      setPos(pct(x));
    };
    const up = () => (dragging.current = false);

    el.addEventListener("mousedown", down);
    el.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    el.addEventListener("touchstart", down, { passive: true });
    el.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);

    return () => {
      el.removeEventListener("mousedown", down);
      el.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      el.removeEventListener("touchstart", down);
      el.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
      style={{ paddingTop: `${(1 / ratio) * 100}%` }}
      aria-label="Слайдер сравнения до/после"
      role="region"
    >
      {/* было alt="До" → теперь берём из пропсов */}
      <img
        src={before}
        alt={beforeAlt}
        className="absolute inset-0 h-full w-full select-none object-cover pointer-events-none"
      />

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        {/* было alt="После" → теперь берём из пропсов */}
        <img
          src={after}
          alt={afterAlt}
          className="absolute inset-0 h-full w-full select-none object-cover pointer-events-none"
        />
      </div>

      {/* линия */}
      <div
        className="absolute top-0 bottom-0 bg-white shadow-[0_0_0_1px_rgba(15,23,42,.1)]"
        style={{ left: `calc(${pos}% - 1px)`, width: 2 }}
      />

      {/* range */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(parseFloat(e.currentTarget.value))}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[70%]"
        aria-label="Положение шторки"
      />

      {/* метки */}
      <span className="absolute left-3 top-3 rounded-lg bg-black/60 px-2 py-1 text-xs text-white">
        До
      </span>
      <span className="absolute right-3 top-3 rounded-lg bg-black/60 px-2 py-1 text-xs text-white">
        После
      </span>
    </div>
  );
}
