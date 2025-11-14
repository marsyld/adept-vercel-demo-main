// pages/login-clinic.tsx
"use client";

import { useState, FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function LoginClinicPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Введите логин и пароль.");
      return;
    }

    setLoading(true);

    // ⚠️ Тестовый режим — любой логин/пароль подходит
    await new Promise((r) => setTimeout(r, 800));
    router.push("/clinic/dashboard");

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Adept — Вход для клиник</title>
        <meta
          name="description"
          content="Вход в личный кабинет косметологической клиники Adept."
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-[#111111] text-white py-20 px-6">
        <div className="max-w-md mx-auto">

          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-3 text-center"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            Вход для клиник
          </motion.h1>

          <motion.p
            className="text-white/70 text-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.35 }}
          >
            Авторизуйтесь, чтобы получать доступ к анализам пациентов и отчётам.
          </motion.p>

          <motion.form
            onSubmit={handleLogin}
            className="bg-white/[0.05] border border-white/10 rounded-2xl p-8 space-y-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >

            <div>
              <label className="block text-sm mb-1 text-white/70">Email (логин)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
                placeholder="clinic@example.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-white/70">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
                placeholder="Введите пароль"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-xl font-semibold text-[#111111] transition disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
              }}
            >
              {loading ? "Входим..." : "Войти"}
            </button>

            <p className="text-center text-xs text-white/50 mt-4">
              Нет кабинета?{" "}
              <a href="/register-clinic" className="text-brand-secondary hover:underline">
                Создать аккаунт клиники
              </a>
            </p>
          </motion.form>
        </div>
      </main>

      <Footer />
    </>
  );
}
