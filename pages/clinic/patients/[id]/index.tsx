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
    const pid = Array.isArray(id) ? id[0] : id;
    if (!pid) return;

    const list = JSON.parse(localStorage.getItem("ADEPT_PATIENTS") || "[]");
    const p = list.find((x: any) => x.id === pid);
    setPatient(p || null);
  }, [id]);

  if (!patient) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#111] text-white p-10">
          <p>Пациент не найден</p>
        </main>
        <Footer />
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
          <div className="flex items-center gap-4 text-sm text-white/70 mb-6">
            <Link href="/clinic/dashboard" className="hover:text-white">
              ← Панель управления
            </Link>
            <span>·</span>
            <Link href="/clinic/patients" className="hover:text-white">
              Все пациенты
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-10">{patient.name}</h1>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Левая колонка */}
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

                <p className="text-white/70 text-sm mt-2">
                  Возраст: {patient.age ?? "—"}
                </p>

                <Link
                  href={`/clinic/patients/${patient.id}/upload`}
                  className="block text-center mt-6 px-5 py-3 rounded-xl font-semibold text-[#111]"
                  style={{
                    background:
                      "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
                  }}
                >
                  Загрузить анализ
                </Link>
              </div>
            </div>

            {/* Правая колонка — история анализов */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-brand-secondary">
                История анализов
              </h3>

              {patient.analyses?.length === 0 ? (
                <p className="text-white/50">Пока нет анализов</p>
              ) : (
                <div className="space-y-6">
                  {patient.analyses.map((a: any, idx: number) => {
                    const emotionLabel = (() => {
                      const em = a.attrs?.emotion;
                      if (!em) return "—";
                      const entries = Object.entries(em) as [string, number][];
                      if (!entries.length) return "—";
                      const sorted = entries.sort(
                        (x, y) =>
                          Number(y[1] ?? 0) - Number(x[1] ?? 0)
                      );
                      return sorted[0][0] || "—";
                    })();

                    return (
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
                            className="w-28 h-28 object-cover rounded-xl mb-4"
                            alt=""
                          />
                        )}

                        <div className="text-sm text-white/80 space-y-1">
                          <p>
                            <b>Пол:</b> {a.attrs?.gender?.value ?? "—"}
                          </p>
                          <p>
                            <b>Эмоция:</b> {emotionLabel}
                          </p>
                          <p>
                            <b>Beauty (♀):</b>{" "}
                            {a.attrs?.beauty?.female_score ?? "—"}
                          </p>
                          <p>
                            <b>Beauty (♂):</b>{" "}
                            {a.attrs?.beauty?.male_score ?? "—"}
                          </p>
                        </div>

                        {a.attrs?.skinstatus && (
                          <div className="mt-3 text-xs text-white/70 space-y-1">
                            <div>Акне: {a.attrs.skinstatus.acne}</div>
                            <div>
                              Круги под глазами:{" "}
                              {a.attrs.skinstatus.dark_circle}
                            </div>
                            <div>Пигментация: {a.attrs.skinstatus.stain}</div>
                            <div>
                              Здоровье кожи: {a.attrs.skinstatus.health}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
