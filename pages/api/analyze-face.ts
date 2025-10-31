// pages/api/analyze-face.ts
import type { NextApiRequest, NextApiResponse } from "next";

const FPP_ENDPOINT = "https://api-us.faceplusplus.com/facepp/v3/detect";

// ✅ Валидные атрибуты из Face++
// (убрали exposure, оставили проверенные)
const RETURN_ATTRIBUTES_PRIMARY =
  "age,gender,emotion,beauty,skinstatus,facequality,blur,headpose,ethnicity,eyestatus,smiling,mouthstatus";

// 🔁 Фолбэк на случай странностей тарифа/региона
const RETURN_ATTRIBUTES_FALLBACK = "age,gender,emotion,beauty";

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

    // helper для запроса
    const callFace = async (attrs: string) => {
      const payload = new URLSearchParams();
      payload.set("api_key", apiKey);
      payload.set("api_secret", apiSecret);
      payload.set("image_base64", imageBase64);
      payload.set("return_attributes", attrs);

      const fppRes = await fetch(FPP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      const data = await fppRes.json();
      return { ok: fppRes.ok, status: fppRes.status, data };
    };

    // 1) Пытаемся с расширенным списком
    let { ok, status, data } = await callFace(RETURN_ATTRIBUTES_PRIMARY);

    // 2) Если ругань на return_attributes — пробуем короткий набор
    const msg = (data?.error_message || "").toString().toUpperCase();
    if (!ok && (msg.includes("BAD_ARGUMENTS") || msg.includes("RETURN_ATTRIBUTES"))) {
      const retry = await callFace(RETURN_ATTRIBUTES_FALLBACK);
      ok = retry.ok;
      status = retry.status;
      data = retry.data;
      // добавим подсказку в ответ клиенту
      if (ok) data.__note = "Some attributes were trimmed for compatibility.";
    }

    if (!ok) {
      return res.status(status).json({ error: data?.error_message || "Face++ error", raw: data });
    }

    return res.status(200).json(data);
  } catch (e: any) {
    console.error("analyze-face error:", e);
    return res.status(500).json({ error: "Server error", detail: e?.message || e });
  }
}
