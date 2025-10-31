// pages/api/analyze-face.ts
import type { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "No image provided" });
    }

    const form = new FormData();
    form.append("api_key", process.env.FACE_API_KEY!);
    form.append("api_secret", process.env.FACE_API_SECRET!);
    form.append("image_base64", imageBase64);
    form.append("return_attributes", "age,gender,skinstatus,emotion,beauty");

    const response = await fetch("https://api-us.faceplusplus.com/facepp/v3/detect", {
      method: "POST",
      body: form as any,
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
