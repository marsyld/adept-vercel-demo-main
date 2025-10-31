// pages/api/onboarding.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { onboardingSchema } from "../../lib/onboarding";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  try {
    const parsed = onboardingSchema.parse(req.body);

    // TODO: здесь можно добавить сохранение в БД/почту/CRM
    // пример логирования в серверные логи:
    console.log("[onboarding] submit", parsed);

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(400).json({ ok: false, error: e?.message ?? "Validation error" });
  }
}
