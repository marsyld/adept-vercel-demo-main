// pages/analyze.tsx
"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AnalyzePage() {
  const title = "Adept — Анализ лица с ИИ";
  const description =
    "Загрузите фото и получите детальный анализ состояния кожи, возраста, эмоций и показателей красоты.";

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

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

  const renderBar = (label: string, value: number) => (
    <div key={label} className="mb-3">
      <div className="flex justify-between text-sm text-gray-700 mb-1">
        <span>{label}</span>
        <span>{(value * 100).toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="h-2 bg-brand-primary transition-all duration-500"
          style={{ width: `${value * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Header />

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 mb-10">
          Загрузите фото — получите анализ по возрасту, эмоциям и состоянию кожи.
        </p>

        {/* Загрузка */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-2xl p-8 mb-6 transition hover:border-brand-primary hover:bg-gray-50 cursor-pointer"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto rounded-xl max-h-64 object-contain"
            />
          ) : (
            <p className="text-gray-500">
              Перетащите фото сюда или{" "}
              <span className="text-brand-primary underline">выберите файл</span>
            </p>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {file && !loading && (
          <button
            onClick={handleAnalyze}
            className="px-6 py-3 bg-brand-primary text-white rounded-xl font-medium hover:opacity-90 transition"
          >
            Анализировать фото
          </button>
        )}

        {loading && (
          <p className="mt-6 text-gray-600 animate-pulse">
            🔍 Анализируем изображение...
          </p>
        )}

        {/* Результаты */}
        {result && result.faces && result.faces.length > 0 && (
          <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-8 shadow-md text-left max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Результаты анализа
            </h3>

            <div className="space-y-2 text-gray-700 mb-4">
              <p><b>Возраст:</b> {result.faces[0].attributes.age.value}</p>
              <p><b>Пол:</b> {result.faces[0].attributes.gender.value}</p>
              <p>
                <b>Эмоция:</b>{" "}
                {
                  Object.entries(result.faces[0].attributes.emotion)
                    .sort((a: any, b: any) => b[1] - a[1])[0][0]
                }
              </p>
              <p>
                <b>Beauty score (♀):</b>{" "}
                {result.faces[0].attributes.beauty.female_score.toFixed(1)}
              </p>
              <p>
                <b>Beauty score (♂):</b>{" "}
                {result.faces[0].attributes.beauty.male_score.toFixed(1)}
              </p>
            </div>

            {result.faces[0].attributes.skinstatus && (
              <>
                <h4 className="font-medium mb-3 text-gray-800">
                  Состояние кожи
                </h4>
                {renderBar("Акне", result.faces[0].attributes.skinstatus.acne)}
                {renderBar("Темные круги", result.faces[0].attributes.skinstatus.dark_circle)}
                {renderBar("Пятна", result.faces[0].attributes.skinstatus.stain)}
                {renderBar("Морщины", result.faces[0].attributes.skinstatus.health)}
              </>
            )}
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/"
            className="inline-block px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
