// pages/clinic/patients/[id]/upload.tsx
"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function UploadAnalysisPage() {
  const router = useRouter();
  const { id } = router.query;

  const [patient, setPatient] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* --------- загрузка пациента --------- */
  useEffect(() => {
    if (!id) return;
    const list = JSON.parse(localStorage.getItem("ADEPT_PATIENTS") || "[]");
    const found = list.find((p: any) => p.id === id);
    setPatient(found || null);
  }, [id]);

  const toBase64 = (f: File) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.readAsDataURL(f);
      r.onload = () => resolve((r.result as string).split(",")[1]);
      r.onerror = reject;
    });

  /* ---------- upload & analyze ---------- */
  const startAnalyze = async () => {
    if (!file || !id) return;

    try {
      setLoading(true);
      setError(null);

      const base64 = await toBase64(file);

      const res = await fetch("/api/analyze-face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      const face = data?.faces?.[0];

      /* ---------- обновляем пациента ---------- */
      const list = JSON.parse(localStorage.getItem("ADEPT_PATIENTS") || "[]");

      const updated = list.map((p: any) =>
        p.id === id
          ? {
              ...p,
              lastPhoto: preview, // закрепляем последнее фото
              analyses: [
                {
                  date: Date.now(),
                  attrs: face?.attributes || null,
                  photo: preview,
                },
                ...(p.analyses || []),
              ],
            }
          : p
      );

      localStorage.setItem("ADEPT_PATIENTS", JSON.stringify(updated));

      // переход обратно
      router.push(`/clinic/patients/${id}`);
    } catch (e: any) {
      setError(e?.message || "Ошибка анализа");
    } finally {
      setLoading(false);
    }
  };

  /* --------- no patient --------- */
  if (!patient) {
    return (
      <main className="min-h-screen bg-[#111] text-white flex items-center justify-center">
        Пациент не найден
      </main>
    );
  }

  /* --------- UI --------- */
  return (
    <>
      <Head>
        <title>Новый анализ — {patient.name}</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-[#111111] text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Новый анализ пациента
          </h1>

          <p className="text-white/60 mb-10">
            Пациент: <span className="text-brand-secondary">{patient.name}</span>
          </p>

          {/* Upload */}
          <motion.div
            className="border-2 border-dashed border-white/20 rounded-2xl p-8 mb-6 cursor-pointer hover:border-brand-secondary hover:bg-white/[0.04] transition"
            onClick={() => document.getElementById("filePatient")?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (!f) return;
              setFile(f);
              setPreview(URL.createObjectURL(f));
            }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {preview ? (
              <img
                src={preview}
                className="mx-auto rounded-xl max-h-80 object-contain shadow-lg"
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
              id="filePatient"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setFile(f);
                setPreview(URL.createObjectURL(f));
              }}
            />
          </motion.div>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={startAnalyze}
              disabled={!file || loading}
              className="px-7 py-3 rounded-xl font-semibold text-[#111] disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
              }}
            >
              {loading ? "Анализируем…" : "Запустить анализ"}
            </button>

            <Link
              href={`/clinic/patients/${id}`}
              className="px-7 py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/[0.05] transition"
            >
              Отмена
            </Link>
          </div>

          {error && (
            <p className="text-red-400 text-sm mt-4">{error}</p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
