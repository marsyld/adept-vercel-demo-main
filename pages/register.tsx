// pages/register.tsx
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    // Проверяем, если пользователь уже сохранён
    const user = localStorage.getItem("adeptUser");
    if (user) {
      setRegistered(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    const user = { name, email, password };
    if (remember) {
      localStorage.setItem("adeptUser", JSON.stringify(user));
    }

    // Можно в будущем добавить API-запрос на регистрацию
    setRegistered(true);

    setTimeout(() => {
      router.push("/analyze");
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("adeptUser");
    setRegistered(false);
  };

  return (
    <>
      <Head>
        <title>Adept — Регистрация</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-[#111111] flex items-center justify-center px-4 py-12 text-white">
        <div className="w-full max-w-md bg-white/[0.06] border border-white/10 rounded-2xl p-8">
          {registered ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Вы уже зарегистрированы</h2>
              <p className="text-white/70 mb-6">
                Вы можете перейти к анализу лица или выйти из аккаунта.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/analyze"
                  className="px-6 py-3 rounded-xl font-medium text-[#111111] text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
                  }}
                >
                  Перейти к анализу
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition"
                >
                  Выйти
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Создайте аккаунт
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm mb-1">Имя</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/[0.08] border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.08] border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Пароль</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.08] border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-white/70">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="accent-brand-secondary"
                  />
                  <label htmlFor="remember">Запомнить меня</label>
                </div>

                {error && <p className="text-brand-secondary text-sm">{error}</p>}

                <button
                  type="submit"
                  className="w-full mt-4 px-6 py-3 rounded-xl font-medium text-[#111111]"
                  style={{
                    background:
                      "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
                  }}
                >
                  Зарегистрироваться
                </button>
              </form>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
