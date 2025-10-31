// lib/onboarding.ts
import { z } from "zod";

export const STORAGE_KEY = "onboarding_v1";

export const onboardingSchema = z.object({
  gender: z.enum(["female", "male", "other"]),
  age: z.number().int().min(16).max(80),
  skinType: z.enum(["normal", "dry", "oily", "combination", "sensitive"]),
  concerns: z.array(z.string()).optional().default([]),
  allergies: z.string().optional().default(""),
  pregnancy: z.enum(["yes", "no", "na"]).optional().default("na"),
  contraindications: z.string().optional().default(""),
  routine: z.array(z.string()).optional().default([]),
  contact: z
    .object({
      email: z.string().email("Укажите корректный email").optional(),
      phone: z.string().min(6).optional(),
      consent: z.boolean().optional(),
    })
    .optional()
    .default({}),
});

export type OnboardingValidated = z.infer<typeof onboardingSchema>;

// (опционально) U/I-тип, если где-то нужен
export type OnboardingData = Partial<OnboardingValidated>;
