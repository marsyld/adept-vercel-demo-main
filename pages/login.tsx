"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Тестовый режим — пропускает любого
    await new Promise((r) => setTimeout(r, 700));
    if (email && password) {
      router.push("/analyze");
    } else {
      setError("Введите логин и пароль");
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Adept — Вход</title>
        <meta
          name="description"
          content="Войдите в Adept, чтобы загрузить фото и получить персональный анализ лица."
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-[#111111] text-white flex items-center justify-center px-6 py-20">
        <motion.div
          className="w-full max-w-md bg-white/[0.05] border border-white/10 rounded-2xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-center mb-2">
            Войти в Adept
          </h1>
          <p className="text-center text-white/60 mb-8 text-sm">
            Тестовый режим — можно использовать любые данные.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-2 text-white/70">
                Email или логин
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.07] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
                placeholder="user@example.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-white/70">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.07] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
                placeholder="Введите пароль"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 px-6 py-3 rounded-xl font-semibold text-[#111111] transition hover:opacity-90 disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
              }}
            >
              {loading ? "Входим..." : "Войти"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-white/60">
            Нет аккаунта?{" "}
            <a
              href="/register"
              className="text-brand-secondary hover:underline"
            >
              Зарегистрироваться
            </a>
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
