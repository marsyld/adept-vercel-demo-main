// pages/api/analyze-face.ts
import type { NextApiRequest, NextApiResponse } from "next";

const FPP_ENDPOINT = "https://api-us.faceplusplus.com/facepp/v3/detect";

// Под какие поля мы просим Face++ вернуть атрибуты
const RETURN_ATTRIBUTES =
  "age,gender,emotion,beauty,skinstatus,facequality,blur,exposure,headpose,ethnicity,eyestatus";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { imageBase64 } = req.body as { imageBase64?: string };
    if (!imageBase64) {
      return res.status(400).json({ error: "No image provided" });
    }

    const apiKey = process.env.FACE_API_KEY;
    const apiSecret = process.env.FACE_API_SECRET;
    if (!apiKey || !apiSecret) {
      return res.status(500).json({ error: "Server misconfigured: missing API keys" });
    }

    // Face++ принимает и x-www-form-urlencoded
    const payload = new URLSearchParams();
    payload.set("api_key", apiKey);
    payload.set("api_secret", apiSecret);
    payload.set("image_base64", imageBase64);
    payload.set("return_attributes", RETURN_ATTRIBUTES);

    const fppRes = await fetch(FPP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    });

    const data = await fppRes.json();

    if (!fppRes.ok) {
      // Проксируем ошибку Face++
      return res.status(fppRes.status).json({ error: data?.error_message || "Face++ error", raw: data });
    }

    return res.status(200).json(data);
  } catch (e: any) {
    console.error("analyze-face error:", e);
    return res.status(500).json({ error: "Server error", detail: e?.message || e });
  }
}
