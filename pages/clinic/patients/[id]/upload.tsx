// pages/clinic/patients/[id]/upload.tsx
"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function UploadAnalysisPage() {
  const router = useRouter();
  const { id } = router.query;

  const [patient, setPatient] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [base64img, setBase64img] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---- LOAD PATIENT ---- */
  useEffect(() => {
    if (!id) return;
    const list = JSON.parse(localStorage.getItem("ADEPT_PATIENTS") || "[]");
    const found = list.find((p: any) => p.id === id);
    setPatient(found || null);
  }, [id]);

  /* ---- Convert to Base64 ---- */
  const toBase64 = (f: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const r = new FileReader();
      r.readAsDataURL(f);
      r.onload = () => resolve(r.result as string); // FULL base64 including prefix
      r.onerror = reject;
    });

  /* ---- Upload & Analyze ---- */
  const startAnalyze = async () => {
    if (!file || !id) return;

    try {
      setLoading(true);
      setError(null);

      const fullBase64 = await toBase64(file); // includes "data:image/jpeg;base64,..."
      const pureBase64 = fullBase64.split(",")[1];

      const res = await fetch("/api/analyze-face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: pureBase64 }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      const face = data?.faces?.[0];

      /* ---- UPDATE LOCALSTORAGE ---- */
      const list = JSON.parse(localStorage.getItem("ADEPT_PATIENTS") || "[]");

      const updated = list.map((p: any) =>
        p.id === id
          ? {
              ...p,
              lastPhoto: fullBase64, // storing stable base64
              analyses: [
                {
                  date: Date.now(),
                  attrs: face?.attributes || null,
                  photo: fullBase64, // storing stable base64
                },
                ...(p.analyses || []),
              ],
            }
          : p
      );

      localStorage.setItem("ADEPT_PATIENTS", JSON.stringify(updated));

      router.push(`/clinic/patients/${id}`);
    } catch (e: any) {
      setError(e.message || "Ошибка анализа");
    } finally {
      setLoading(false);
    }
  };

  if (!patient) {
    return (
      <main className="min-h-screen bg-[#111] text-white flex items-center justify-center">
        Пациент не найден
      </main>
    );
  }

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
            Пациент:{" "}
            <span className="text-brand-secondary">{patient.name}</span>
          </p>

          {/* UPLOAD */}
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
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setFile(f);
                setPreview(URL.createObjectURL(f));
              }}
            />
          </motion.div>

          {/* ACTIONS */}
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
