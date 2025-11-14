"use client";
import { useState, useRef, useEffect } from "react";
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

  const resultRef = useRef<HTMLDivElement | null>(null);

  /* ---------- Автоскролл ---------- */
  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        const yOffset = -150; // немного выше, чтобы не прокручивало до футера
        const elementTop =
          resultRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: elementTop, behavior: "smooth" });
      }, 400);
    }
  }, [result]);

  /* ---------- Helpers ---------- */
  const toBase64 = (f: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
    });

  const normalizeValue = (val?: number) => {
    if (val === undefined || val === null || Number.isNaN(val)) return 0;
    return Math.min(Math.max((val / 5) * 100, 0), 100);
  };

  const badgeFor = (percent: number) => {
    if (percent < 35)
      return { text: "хорошо", cls: "text-green-400 bg-green-900/30" };
    if (percent < 70)
      return { text: "средне", cls: "text-yellow-300 bg-yellow-800/30" };
    return { text: "нужно внимание", cls: "text-red-400 bg-red-900/30" };
  };

  const barColor = (percent: number) => {
    if (percent < 35) return "bg-green-400";
    if (percent < 70) return "bg-yellow-300";
    return "bg-red-400";
  };

  const renderBar = (label: string, val?: number) => {
    const percent = normalizeValue(val);
    const color = barColor(percent);
    const b = badgeFor(percent);
    return (
      <div key={label} className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="flex items-center gap-2">
            {label}
            <span className={`px-2 py-0.5 rounded-md text-xs ${b.cls}`}>
              {b.text}
            </span>
          </span>
          <span className="text-white/70">{percent.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
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

  /* ---------- Handlers ---------- */
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

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setError(e?.message || "Ошибка анализа. Попробуйте другое фото.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Derived ---------- */
  const face = result?.faces?.[0];
  const attrs = face?.attributes;
  const skin = attrs?.skinstatus;

  /* ---------- Render ---------- */
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Header />

      <main className="min-h-screen bg-[#111111] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-white/70 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.35 }}
          >
            Загрузите фото — получите объективный анализ по возрасту, эмоциям и состоянию кожи.
          </motion.p>

          {/* Требования к фото */}
          <motion.div
            className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 text-left mb-12"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-3 text-brand-secondary">
              Требования к фото
            </h3>
            <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
              <li>Фронтальный ракурс (лицо смотрит прямо в камеру)</li>
              <li>Ровное освещение без резких теней</li>
              <li>Нейтральное выражение лица</li>
              <li>Одно лицо на фото, без посторонних объектов</li>
              <li>Фон — однотонный, желательно светлый</li>
              <li>Без фильтров и сильной ретуши</li>
            </ul>
          </motion.div>

          {/* Upload */}
          <motion.div
            className="border-2 border-dashed border-white/20 rounded-2xl p-8 mb-6 transition hover:border-brand-secondary hover:bg-white/[0.03] cursor-pointer"
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
                className="mx-auto rounded-xl max-h-72 object-contain shadow-md"
              />
            ) : (
              <p className="text-white/60">
                Перетащите фото сюда или{" "}
                <span className="text-brand-secondary underline">
                  выберите файл
                </span>
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
              className="px-7 py-3 rounded-xl font-medium text-[#111111] transition disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
              }}
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
                className="px-6 py-3 rounded-xl font-medium bg-white/[0.05] border border-white/10 text-white/70 hover:bg-white/[0.1] transition"
              >
                Сбросить
              </button>
            )}
          </div>

          {/* Error */}
          {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}

          {/* Results */}
          {face && (
            <motion.div
              ref={resultRef}
              className="mt-12 bg-white/[0.06] border border-white/10 rounded-2xl p-8 shadow-md text-left max-w-md mx-auto"
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-center text-brand-secondary">
                Результаты анализа
              </h3>

              <div className="space-y-2 text-white/80 mb-5 text-sm">
                <p><b>Возраст:</b> {attrs?.age?.value ?? "—"}</p>
                <p><b>Пол:</b> {attrs?.gender?.value ?? "—"}</p>
                <p>
                  <b>Эмоция:</b>{" "}
                  {attrs?.emotion
                    ? (Object.entries(attrs.emotion) as [string, number][])
                        .sort((a, b) => b[1] - a[1])[0][0]
                    : "—"}
                </p>
                <p><b>Beauty (♀):</b> {attrs?.beauty?.female_score?.toFixed(1) ?? "—"}</p>
                <p><b>Beauty (♂):</b> {attrs?.beauty?.male_score?.toFixed(1) ?? "—"}</p>
              </div>

              {skin && (
                <>
                  <h4 className="font-medium mb-3 text-brand-secondary">
                    Состояние кожи
                  </h4>
                  {renderBar("Акне", skin.acne)}
                  {renderBar("Темные круги", skin.dark_circle)}
                  {renderBar("Пятна", skin.stain)}
                  {renderBar("Здоровье кожи", skin.health)}
                </>
              )}
            </motion.div>
          )}

          <div className="mt-12">
            <Link
              href="/"
              className="inline-block px-5 py-3 rounded-xl border border-white/10 hover:bg-white/[0.05] text-white/80 font-medium transition"
            >
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}