// pages/clinic/patients/index.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PatientsList() {
  const [search, setSearch] = useState("");

  // Пока мок-данные. Потом заменим на реальную БД.
  const patients = [
    {
      id: "1",
      name: "Анна Петрова",
      gender: "female",
      age: 28,
      photo: "/placeholder-face.jpg",
      analyses: 4,
      lastAnalysis: "2025-11-15",
    },
    {
      id: "2",
      name: "Никита Смирнов",
      gender: "male",
      age: 33,
      photo: "/placeholder-face.jpg",
      analyses: 1,
      lastAnalysis: "2025-11-10",
    },
  ];

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Header />

      <main className="bg-[#111111] min-h-screen text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">Пациенты</h1>

            <Link
              href="/clinic/patients/new"
              className="px-6 py-3 rounded-xl text-[#111111] font-semibold"
              style={{
                background: "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
              }}
            >
              + Добавить пациента
            </Link>
          </div>

          {/* Поиск */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="Поиск по имени..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-brand-secondary"
            />
          </div>

          {/* Список */}
          <div className="mt-10 grid gap-6">
            {filtered.length === 0 && (
              <p className="text-white/60">Пациенты не найдены…</p>
            )}

            {filtered.map((p) => (
              <Link
                key={p.id}
                href={`/clinic/patients/${p.id}`}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition"
              >
                <img
                  src={p.photo}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded-xl bg-white/10"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{p.name}</h3>

                  <p className="text-white/50 text-sm">
                    {p.gender === "female" ? "Жен." : "Муж."},{" "}
                    {p.age ? `${p.age} лет` : "—"}
                  </p>

                  <p className="text-white/50 text-sm mt-1">
                    Анализов: <b>{p.analyses}</b> · Последний: {p.lastAnalysis}
                  </p>
                </div>

                <div className="text-brand-secondary font-medium">
                  Открыть →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
