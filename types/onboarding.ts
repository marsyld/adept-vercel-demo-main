// types/onboarding.ts
export type Gender = "female" | "male" | "other";

export type OnboardingData = {
  gender?: Gender;
  age?: number;
  skinType?: "normal" | "dry" | "oily" | "combination" | "sensitive";
  concerns?: string[]; // акне, пигментация и т.п.
  allergies?: string;  // чувствительность/аллергии (опц.)
  pregnancy?: "yes" | "no" | "na"; // (для женщин можно выбрать N/A)
  contraindications?: string; // недавние процедуры/противопоказания
  routine?: string[]; // текущий уход
  contact?: {
    email?: string;
    phone?: string;
    consent?: boolean; // согласие на обработку и обратную связь
  };
};
