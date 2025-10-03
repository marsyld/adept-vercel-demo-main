// components/Logo.tsx
export default function Logo({ className = "h-7 w-auto", fill = "#7B61FF" }) {
  return (
    <svg className={className} viewBox="0 0 280 48" aria-label="Бъютичь — логотип" role="img">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor="#00E0FF" />
        </linearGradient>
      </defs>
      <text x="0" y="34" fontFamily="system-ui, -apple-system, Segoe UI, Roboto" fontWeight="700" fontSize="28" fill="url(#g)">
        Бъютичь
      </text>
    </svg>
  );
}
