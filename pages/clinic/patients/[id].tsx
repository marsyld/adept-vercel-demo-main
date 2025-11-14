// pages/clinic/patients/[id].tsx
"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PatientProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [noteEdit, setNoteEdit] = useState("");
  const [saving, setSaving] = useState(false);

  /* --------- Загружаем пациента --------- */
  useEffect(() => {
    if (!id) return;

    const list = JSON.parse(localStorage.getItem("ADEPT_PATIENTS") || "[]");
    const found = list.find((p: any) => p.id === id);

    setPatient(found || null);
    setNoteEdit(found?.notes || "");
    setLoading(false);
  }, [id]);

  /* --------- Сохранить заметки --------- */
  const saveNotes = () => {
    setSaving(true);

    const list = JSON.parse(localStorage.getItem("ADEPT_PATIENTS") || "[]");
    const updated = list.map((p: any) =>
      p.id === id ? { ...p, notes: noteEdit } : p
    );

    localStorage.setItem("ADEPT_PATIENTS", JSON.stringify(updated));
    setPatient((p: any) => ({ ...p, notes: noteEdit }));
    setSaving(false);
  };

  /* --------- Вид --------- */
  if (loading)
    return (
      <main className="min-h-screen bg-[#111] text-white flex items-center justify-center">
        Загрузка…
      </main>
    );

  if (!patient)
    return (
      <main className="min-h-screen bg-[#111] text-white flex flex-col items-center justify-center">
        <p className="text-white/70 mb-4">Пациент не найден</p>
        <Link
          href="/clinic/patients"
          className="text-brand-secondary underline"
        >
          Вернуться к списку
        </Link>
      </main>
    );

  const analyses = patient.analyses || [];

  return (
    <>
      <Head>
        <title>{patient.name} — Профиль пациента</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-[#111111] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* -------- Назад -------- */}
          <Link
            href="/clinic/patients"
            className="text-white/60 hover:text-brand-secondary transition text-sm"
          >
            ← Все пациенты
          </Link>

          {/* -------- Заголовок -------- */}
          <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-6">
            {patient.name}
          </h1>

          {/* -------- Основной блок -------- */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Левая панель: фото пациента */}
            <div>
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-4">
                <h3 className="text-lg font-semibold mb-3 text-brand-secondary">
                  Фото пациента
                </h3>

                {patient.lastPhoto ? (
                  <img
                    src={patient.lastPhoto}
                    className="rounded-xl object-cover w-full shadow-lg"
                  />
                ) : (
                  <div className="text-white/50 text-sm italic">
                    Фото ещё не загружено
                  </div>
                )}

                <Link
                  href={`/clinic/patients/${id}/upload`}
                  className="block mt-4 px-5 py-3 rounded-xl text-center font-semibold text-[#111] hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
                  }}
                >
                  Загрузить анализ
                </Link>
              </div>

              {/* Заметки */}
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-5 mt-6">
                <h3 className="text-lg font-semibold mb-3 text-brand-secondary">
                  Заметки
                </h3>

                <textarea
                  className="w-full rounded-xl px-4 py-3 bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-brand-secondary"
                  rows={4}
                  value={noteEdit}
                  onChange={(e) => setNoteEdit(e.target.value)}
                />

                <button
                  onClick={saveNotes}
                  disabled={saving}
                  className="mt-3 w-full py-2 rounded-xl text-[#111] font-semibold disabled:opacity-50"
                  style={{
                    background:
                      "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
                  }}
                >
                  {saving ? "Сохраняем…" : "Сохранить заметки"}
                </button>
              </div>
            </div>

            {/* Правая панель: история анализов */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">
                История анализов
              </h3>

              {analyses.length === 0 && (
                <p className="text-white/60 text-sm">
                  Анализов пока нет.
                </p>
              )}

              <div className="space-y-6">
                {analyses.map((a: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/[0.04] border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-white/70 text-sm">
                        {new Date(a.date).toLocaleString("ru-RU")}
                      </div>
                      <span className="text-brand-secondary text-sm font-semibold">
                        {a.attrs?.age?.value
                          ? `Возраст: ${a.attrs.age.value}`
                          : ""}
                      </span>
                    </div>

                    {a.photo && (
                      <img
                        src={a.photo}
                        className="rounded-xl w-40 object-cover mb-4"
                      />
                    )}

                    <pre className="text-xs text-white/60 overflow-auto">
                      {JSON.stringify(a.attrs, null, 2)}
                    </pre>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
