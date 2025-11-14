// pages/clinic/patients/[id].tsx
"use client";

import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PatientCard() {
  const router = useRouter();
  const { id } = router.query;

  // Моки пациентов
  const patient =
    {
      1: { name: "Анна Сергеева", age: 28 },
      2: { name: "Мария Орлова", age: 34 },
      3: { name: "Ирина Лебедева", age: 41 },
    }[id as string] || { name: "Пациент", age: "—" };

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setAnalysis(null);
  };

  const onAnalyze = async () => {
    if (!file) return;
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    setAnalysis({
      age: patient.age,
      beauty: 7.2,
      emotion: "neutral",
      skin: {
        acne: 0.6,
        dark_circle: 1.2,
        stain: 1.0,
        health: 0.9,
      },
    });

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>{patient.name} — анализ</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-[#111111] text-white pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-3"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {patient.name}
          </motion.h1>

          <p className="text-white/50 mb-10">Возраст: {patient.age}</p>

          {/* Загрузка фото */}
          <div
            className="border-2 border-dashed border-white/20 rounded-2xl p-8 mb-6 text-center cursor-pointer hover:bg-white/[0.03] transition"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            {preview ? (
              <img src={preview} className="mx-auto max-h-64 rounded-xl" />
            ) : (
              <p className="text-white/60">
                Перетащите фото или <span className="text-brand-secondary underline">выберите</span>
              </p>
            )}

            <input
              id="fileInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onPick}
            />
          </div>

          {/* Кнопки */}
          <div className="flex items-center gap-3 mb-10">
            <button
              onClick={onAnalyze}
              disabled={!file || loading}
              className="px-6 py-3 rounded-xl font-medium text-[#111111] disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #E1EEC3, #E1EEC3)" }}
            >
              {loading ? "Анализируем..." : "Анализировать фото"}
            </button>

            {file && (
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setAnalysis(null);
                }}
                className="px-6 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white/70"
              >
                Сбросить
              </button>
            )}
          </div>

          {/* РЕЗУЛЬТАТЫ */}
          {analysis && (
            <motion.div
              className="bg-white/[0.06] border border-white/10 rounded-2xl p-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-brand-secondary">
                Результаты анализа
              </h3>

              <p><b>Beauty score:</b> {analysis.beauty}</p>
              <p><b>Эмоция:</b> {analysis.emotion}</p>

              <h4 className="mt-4 font-medium">Состояние кожи</h4>
              <ul className="text-white/70 space-y-1 text-sm mt-2">
                <li>Акне: {analysis.skin.acne}</li>
                <li>Тёмные круги: {analysis.skin.dark_circle}</li>
                <li>Пигментация: {analysis.skin.stain}</li>
                <li>Здоровье кожи: {analysis.skin.health}</li>
              </ul>
            </motion.div>
          )}

          <div className="mt-10">
            <Link href="/clinic/patients" className="text-white/60 hover:text-brand-secondary">
              ← Вернуться к пациентам
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
