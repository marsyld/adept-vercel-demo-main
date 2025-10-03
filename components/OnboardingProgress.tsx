// components/OnboardingProgress.tsx
import React from "react";

export default function OnboardingProgress({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">Шаг {step} из {total}</p>
        <p className="text-sm text-gray-600">{pct}%</p>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-brand-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
