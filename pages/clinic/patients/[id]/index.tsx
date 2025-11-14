// pages/clinic/patients/[id]/index.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PatientPage() {
  const router = useRouter();
  const { id } = router.query;

  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const list = JSON.parse(localStorage.getItem("ADEPT_PATIENTS") || "[]");
    const p = list.find((x: any) => x.id === id);
    setPatient(p || null);
  }, [id]);

  if (!patient) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#111] text-white p-10">
          <p>Пациент не найден</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{patient.name} — профиль</title>
      </Head>

      <Header />

      <main className="bg-[#111] text-white min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <Link href="/clinic/patients" className="text-white/70 hover:text-white">
            ← Все пациенты
          </Link>

          <h1 className="text-4xl font-bold mt-4 mb-10">{patient.name}</h1>

          <div className="grid md:grid-cols-2 gap-10">

            {/* ==== ЛЕВАЯ КОЛОНКА ==== */}
            <div>
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-3 text-brand-secondary">
                  Фото пациента
                </h3>

                {patient.photo ? (
                  <img
                    src={patient.photo}
                    className="w-40 h-40 object-cover rounded-xl mb-3"
                    alt="Фото пациента"
                  />
                ) : (
                  <p className="text-white/50">Фото ещё нет</p>
                )}

                <Link
                  href={`/clinic/patients/${id}/upload`}
                  className="block text-center mt-4 px-5 py-3 rounded-xl font-semibold text-[#111]"
                  style={{
                    background: "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
                  }}
                >
                  Загрузить анализ
                </Link>
              </div>
            </div>

            {/* ==== ПРАВАЯ КОЛОНКА ==== */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-brand-secondary">
                История анализов
              </h3>

              {patient.analyses?.length === 0 ? (
                <p className="text-white/50">Пока нет анализов</p>
              ) : (
                <div className="space-y-6">
                  {patient.analyses.map((a: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white/[0.05] border border-white/10 rounded-2xl p-6"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-white/50">
                          {new Date(a.date).toLocaleString("ru-RU")}
                        </span>
                        <span className="text-brand-secondary font-semibold text-sm">
                          Возраст: {a.attrs?.age?.value ?? "—"}
                        </span>
                      </div>

                      {a.photo && (
                        <img
                          src={a.photo}
                          className="w-32 h-32 object-cover rounded-xl mb-4"
                        />
                      )}

                      {/* ОПИСАННЫЕ ПОЛЯ */}
                      <div className="text-sm text-white/80 space-y-1">
                        <p><b>Пол:</b> {a.attrs?.gender?.value}</p>
                        {/* Эмоция — исправлено для TypeScript */}
<p>
  <b>Эмоция:</b>{" "}
  {(() => {
    const entries = Object.entries(a.attrs?.emotion || {}) as [string, number][];

    if (!entries.length) return "—";

    const sorted = entries.sort(
      (x, y) => Number(y[1] ?? 0) - Number(x[1] ?? 0)
    );

    return sorted[0][0] || "—";
  })()}
</p>

                        <p><b>Beauty:</b> {a.attrs?.beauty?.female_score ?? "—"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
