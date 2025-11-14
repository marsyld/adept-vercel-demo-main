// pages/clinic/patients.tsx
"use client";

import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function ClinicPatientsPage() {
  const title = "Пациенты клиники — Adept B2B";

  const [patients] = useState([
    {
      id: "1",
      name: "Анна Сергеева",
      age: 28,
      updated: "Сегодня",
    },
    {
      id: "2",
      name: "Мария Орлова",
      age: 34,
      updated: "Вчера",
    },
    {
      id: "3",
      name: "Ирина Лебедева",
      age: 41,
      updated: "3 дня назад",
    },
  ]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-[#111111] text-white pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Пациенты
          </motion.h1>

          <p className="text-white/60 mb-10">
            Здесь отображаются все пациенты клиники. Нажмите на пациента, чтобы открыть профиль
            и выполнить анализ.
          </p>

          <div className="grid gap-4">
            {patients.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/clinic/patients/${p.id}`}
                  className="block bg-white/[0.05] border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold">{p.name}</div>
                      <div className="text-sm text-white/50">
                        Возраст: {p.age}
                      </div>
                    </div>
                    <div className="text-sm text-white/40">{p.updated}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/clinic/dashboard"
              className="text-white/60 hover:text-brand-secondary transition text-sm"
            >
              ← Назад в кабинет
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
