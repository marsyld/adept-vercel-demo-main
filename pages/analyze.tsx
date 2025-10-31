// pages/analyze.tsx
"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function AnalyzePage() {
  const title = "Adept — Анализ лица с ИИ";
  const description =
    "Загрузите фото и получите детальный анализ состояния кожи, возраста, эмоций и показателей красоты.";

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // ===== helpers =====
  const toBase64 = (f: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
    });

  // skinstatus — коэффициенты: чем больше, тем хуже.
  // Нормализуем к 0–100% (5 — условный "плохой" максимум).
  const normalizeValue = (val?: number) => {
    if (val === undefined || val === null || Number.isNaN(val)) return 0;
    const p = Math.min(Math.max((val / 5) * 100, 0), 100);
    return p;
  };

  const badgeFor = (percent: number) => {
    if (percent < 35) return { text: "хорошо", cls: "text-green-600 bg-green-50" };
    if (percent < 70) return { text: "средне", cls: "text-yellow-700 bg-yellow-50" };
    return { text: "нужно внимание", cls: "text-red-700 bg-red-50" };
    // интерпретация: больше % — выраженнее проблема
  };

  const barColor = (percent: number) => {
    if (percent < 35) return "bg-green-500";
    if (percent < 70) return "bg-yellow-400";
    return "bg-red-500";
  };

  const renderBar = (label: string, val?: number) => {
    const percent = normalizeValue(val);
    const color = barColor(percent);
    const b = badgeFor(percent);

    return (
      <div key={label} className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-700 mb-1">
          <span className="flex items-center gap-2">
            {label}
            <span className={`px-2 py-0.5 rounded-md text-xs ${b.cls}`}>{b.text}</span>
          </span>
          <span>{percent.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <motion.div
            className={`h-2 ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    );
  };

  // ===== events =====
  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  };

  const onAnalyze = async () => {
    if (!file) return;
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const base64 = await toBase64(file);
      const res = await fetch("/api/analyze-face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `API error ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setError(e?.message || "Ошибка анализа. Попробуйте другое фото.");
    } finally {
      setLoading(false);
    }
  };

  // ===== derived =====
  const face = result?.faces?.[0];
  const attrs = face?.attributes;
  const skin = attrs?.skinstatus;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Header />

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-12 text-center">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          Загрузите фото — получите анализ по возрасту, эмоциям и состоянию кожи.
        </motion.p>

        {/* Upload */}
        <motion.div
          className="border-2 border-dashed border-gray-300 rounded-2xl p-8 mb-6 transition hover:border-brand-primary hover:bg-gray-50 cursor-pointer"
          onClick={() => document.getElementById("fileInput")?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
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
            onChange={onPick}
            className="hidden"
          />
        </motion.div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onAnalyze}
            disabled={!file || loading}
            className="px-6 py-3 bg-brand-primary text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-40 transition"
          >
            {loading ? "Анализируем..." : "Анализировать фото"}
          </button>
          {file && !loading && (
            <button
              onClick={() => {
                setFile(null);
                setPreview(null);
                setResult(null);
                setError(null);
              }}
              className="px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              Сбросить
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="mt-4 text-red-600 text-sm">{error}</p>
        )}

        {/* Results */}
        {face && (
          <motion.div
            className="mt-10 bg-white border border-gray-200 rounded-2xl p-8 shadow-md text-left max-w-md mx-auto"
            initial={{ opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              Результаты анализа
            </h3>

            <div className="space-y-2 text-gray-700 mb-5">
              <p><b>Возраст:</b> {attrs?.age?.value ?? "—"}</p>
              <p><b>Пол:</b> {attrs?.gender?.value ?? "—"}</p>
              <p>
                <b>Эмоция:</b>{" "}
                {attrs?.emotion
                  ? (Object.entries(attrs.emotion) as [string, number][])
                      .sort((a, b) => b[1] - a[1])[0][0]
                  : "—"}
              </p>
              <p>
                <b>Beauty score (♀):</b>{" "}
                {attrs?.beauty?.female_score != null
                  ? attrs.beauty.female_score.toFixed(1)
                  : "—"}
              </p>
              <p>
                <b>Beauty score (♂):</b>{" "}
                {attrs?.beauty?.male_score != null
                  ? attrs.beauty.male_score.toFixed(1)
                  : "—"}
              </p>
            </div>

            {skin && (
              <>
                <h4 className="font-medium mb-3 text-gray-800">Состояние кожи</h4>
                {renderBar("Акне", skin.acne)}
                {renderBar("Темные круги", skin.dark_circle)}
                {renderBar("Пятна", skin.stain)}
                {renderBar("Морщины (общее здоровье кожи)", skin.health)}
              </>
            )}
          </motion.div>
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
