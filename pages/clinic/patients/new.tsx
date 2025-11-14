// pages/clinic/patients/new.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NewPatientPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [age, setAge] = useState<string>("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Введите имя пациента");
    if (!gender) return setError("Выберите пол");

    // Генерация фейкового ID пациента
    const id = Date.now().toString();

    // Сохраняем в мок "БД" — localStorage
    const existing = JSON.parse(
      localStorage.getItem("ADEPT_PATIENTS") || "[]"
    );

    const newPatient = {
      id,
      name,
      gender,
      age: age ? Number(age) : null,
      notes,
      createdAt: new Date().toISOString(),
      analyses: [],
    };

    localStorage.setItem(
      "ADEPT_PATIENTS",
      JSON.stringify([...existing, newPatient])
    );

    router.push(`/clinic/patients/${id}`);
  };

  return (
    <>
      <Head>
        <title>Добавить пациента</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-[#111111] text-white py-20 px-6">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Новый пациент
          </h1>

          <form
            onSubmit={onSubmit}
            className="bg-white/[0.06] border border-white/10 rounded-2xl p-8 space-y-6"
          >
            {/* Имя */}
            <div>
              <label className="block text-sm mb-2">Имя клиента *</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-brand-secondary"
                placeholder="Например: Анна Петрова"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Пол */}
            <div>
              <label className="block text-sm mb-2">Пол *</label>
              <select
                value={gender}
                onChange={(e) =>
                  setGender(e.target.value as any)
                }
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white focus:outline-none focus:border-brand-secondary"
              >
                <option value="" disabled>
                  Выберите пол
                </option>
                <option value="female">Женский</option>
                <option value="male">Мужской</option>
                <option value="other">Другое</option>
              </select>
            </div>

            {/* Возраст */}
            <div>
              <label className="block text-sm mb-2">Возраст</label>
              <input
                type="number"
                min="1"
                max="120"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-brand-secondary"
                placeholder="Например: 29"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Заметки */}
            <div>
              <label className="block text-sm mb-2">
                Заметки о пациенте
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-brand-secondary"
                placeholder="Необязательное поле. Например: чувствительная кожа, аллергии…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Ошибка */}
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-xl font-semibold text-[#111111]"
              style={{
                background:
                  "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
              }}
            >
              Создать пациента
            </button>
          </form>

          <button
            onClick={() => history.back()}
            className="mt-6 text-white/60 hover:text-brand-secondary transition text-sm"
          >
            ← Назад
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
