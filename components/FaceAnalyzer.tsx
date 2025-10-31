"use client";
import { useState } from "react";

export default function FaceAnalyzer() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);

    const base64 = await toBase64(file);
    const res = await fetch("/api/analyze-face", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: base64 }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="p-4 text-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {loading && <p>Анализируем...</p>}
      {result && result.faces && result.faces.length > 0 && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg text-left inline-block">
          <p><b>Возраст:</b> {result.faces[0].attributes.age.value}</p>
          <p><b>Пол:</b> {result.faces[0].attributes.gender.value}</p>
          <p><b>Красота (жен):</b> {result.faces[0].attributes.beauty.female_score.toFixed(1)}</p>
          <p><b>Красота (муж):</b> {result.faces[0].attributes.beauty.male_score.toFixed(1)}</p>
          <p><b>Эмоция:</b> {
            Object.entries(result.faces[0].attributes.emotion)
              .sort((a: any, b: any) => b[1] - a[1])[0][0]
          }</p>
        </div>
      )}
    </div>
  );
}
