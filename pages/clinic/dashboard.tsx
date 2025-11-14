// pages/clinic/dashboard.tsx
"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { initSeedPatients } from "@/utils/initSeedPatients";

export default function ClinicDashboard() {
  const [patients, setPatients] = useState<any[]>([]);
  const [analyses, setAnalyses] = useState<any[]>([]);

  /* ----------- Load data ----------- */
  useEffect(() => {
    initSeedPatients();

    const list = JSON.parse(localStorage.getItem("ADEPT_PATIENTS") || "[]");
    setPatients(list);

    const all = list.flatMap((p: any) =>
      (p.analyses || []).map((a: any) => ({ ...a, patient: p }))
    );
    setAnalyses(all);
  }, []);

  /* ----------- Calculations ----------- */
  const totalPatients = patients.length;
  const totalAnalyses = analyses.length;

  // Средний возраст
  let avgAge = 0;
  if (analyses.length > 0) {
    const sumAge = analyses.reduce(
      (acc, a) => acc + Number(a?.attrs?.age?.value ?? 0),
      0
    );
    avgAge = Math.round(sumAge / analyses.length);
  }

  // Средний beauty
  let avgBeauty: string | number = 0;
  if (analyses.length > 0) {
    const sumBeauty = analyses.reduce(
      (acc, a) => acc + Number(a?.attrs?.beauty?.female_score ?? 0),
      0
    );
    avgBeauty = (sumBeauty / analyses.length).toFixed(1);
  }

  /* --- Top skin problems --- */
  const topProblem = (() => {
    if (!analyses.length) return "Нет данных";

    const counts: Record<string, number> = {};

    for (const a of analyses) {
      const skin = a?.attrs?.skinstatus;
      if (!skin) continue;

      for (const [key, val] of Object.entries(skin)) {
        counts[key] = (counts[key] ?? 0) + Number(val ?? 0);
      }
    }

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    const map: Record<string, string> = {
      acne: "Акне",
      dark_circle: "Круги под глазами",
      stain: "Пигментация",
      health: "Общее здоровье кожи",
    };

    const topKey = sorted[0][0];
    return map[topKey] || topKey;
  })();

  /* ----------- Render ----------- */
  return (
    <>
      <Head>
        <title>Статистика клиники — Adept</title>
      </Head>

      <Header />

      <main className="bg-[#111111] text-white min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-10">
            Панель управления клиники
          </h1>

          {/* -------- METRICS -------- */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Пациентов", value: totalPatients },
              { label: "Анализов", value: totalAnalyses },
              { label: "Средний возраст", value: totalAnalyses > 0 ? avgAge : "—" },
              { label: "Beauty Score ~", value: totalAnalyses > 0 ? avgBeauty : "—" },
            ].map((m, i) => (
              <motion.div
                key={i}
                className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-white/60 text-sm">{m.label}</div>
                <div className="text-3xl font-bold mt-2">{m.value}</div>
              </motion.div>
            ))}
          </div>

          {/* -------- TOP PROBLEM -------- */}
          <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 mb-12">
            <h3 className="text-xl font-semibold mb-3">
              Топ-проблема кожи среди пациентов
            </h3>
            <p className="text-white/60 text-lg">{topProblem}</p>
          </div>

          {/* -------- LAST ANALYSES -------- */}
          <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 mb-12">
            <h3 className="text-xl font-semibold mb-4">Последние анализы</h3>

            {analyses.length === 0 ? (
              <p className="text-white/50 text-sm">Нет данных</p>
            ) : (
              <div className="space-y-4">
                {analyses.slice(0, 5).map((a, i) => (
                  <Link
                    href={`/clinic/patients/${a.patient?.id}`}
                    key={i}
                    className="border-b border-white/10 pb-3 flex items-center gap-4 hover:bg-white/[0.03] p-2 rounded-xl transition"
                  >
                    {a.photo && (
                      <img
                        src={a.photo}
                        className="w-16 h-16 object-cover rounded-xl"
                        alt=""
                      />
                    )}
                    <div>
                      <div className="text-white/90">
                        {a.patient?.name || "Пациент"}
                      </div>
                      <div className="text-xs text-white/50">
                        {new Date(a.date).toLocaleString("ru-RU")}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* -------- CTA -------- */}
          <Link
            href="/clinic/patients/new"
            className="inline-block px-7 py-3 rounded-xl font-semibold text-[#111]"
            style={{
              background: "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
            }}
          >
            + Добавить пациента
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
