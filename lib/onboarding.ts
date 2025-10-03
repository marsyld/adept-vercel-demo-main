// lib/onboarding.ts
import { z } from "zod";
import type { OnboardingData } from "@/types/onboarding";

export const onboardingSchema = z.object({
  gender: z.enum(["female", "male", "other"]),
  age: z.number().int().min(16).max(80),
  skinType: z.enum(["normal", "dry", "oily", "combination", "sensitive"]),
  concerns: z.array(z.string()).min(1, "Выберите хотя бы один пункт"),
  allergies: z.string().optional().default(""),
  pregnancy: z.enum(["yes", "no", "na"]),
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
}) satisfies z.ZodType<OnboardingData>;

export type OnboardingValidated = z.infer<typeof onboardingSchema>;

export const STORAGE_KEY = "onboarding_v1";
