// pages/register-clinic.tsx
import { useState, FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function RegisterClinicPage() {
  const router = useRouter();

  const [clinicName, setClinicName] = useState("");
  const [city, setCity] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!clinicName || !email || !password) {
      setError("Пожалуйста, заполните обязательные поля.");
      return;
    }
    if (!agree) {
      setError("Для регистрации необходимо принять условия оферты.");
      return;
    }

    setLoading(true);

    // ⚠️ Тестовый режим: просто делаем вид, что всё ок и переходим в кабинет
    await new Promise((r) => setTimeout(r, 800));
    router.push("/clinic/dashboard");

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Adept — Регистрация клиники</title>
        <meta
          name="description"
          content="Регистрация частной косметологической клиники в системе Adept для работы с анализом лица клиентов."
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-[#111111] text-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-3"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            Регистрация клиники
          </motion.h1>

          <motion.p
            className="text-white/70 mb-10 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.35 }}
          >
            Подключите вашу косметологическую клинику к Adept, чтобы получать
            объективный ИИ-анализ лица пациентов, отчёты и историю наблюдений.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/[0.05] border border-white/10 rounded-2xl p-8 space-y-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Данные клиники */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">
                Данные клиники
              </h2>

              <div>
                <label className="block text-sm mb-1 text-white/70">
                  Название клиники *
                </label>
                <input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
                  placeholder="Например, «Adept Clinic»"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-white/70">
                  Город
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
                  placeholder="Москва, Санкт-Петербург..."
                />
              </div>
            </div>

            {/* Контактное лицо */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">
                Контактное лицо
              </h2>

              <div>
                <label className="block text-sm mb-1 text-white/70">
                  Имя и должность
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
                  placeholder="Например, «Марина, главный врач»"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-white/70">
                    Email (логин) *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
                    placeholder="clinic@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-white/70">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
                    placeholder="+7 ..."
                  />
                </div>
              </div>
            </div>

            {/* Доступ */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">
                Доступ в кабинет
              </h2>

              <div>
                <label className="block text-sm mb-1 text-white/70">
                  Пароль *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
                  placeholder="Придумайте надёжный пароль"
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/30 bg-white/5"
                />
                <span>
                  Я принимаю условия оферты и согласен на обработку данных
                  (пока тестовый режим).
                </span>
              </label>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 px-6 py-3 rounded-xl font-semibold text-[#111111] transition disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
              }}
            >
              {loading ? "Создаём кабинет..." : "Зарегистрировать клинику"}
            </button>

            <p className="text-center text-xs text-white/50 mt-4">
              Уже есть кабинет?{" "}
              <a
                href="/login-clinic"
                className="text-brand-secondary hover:underline"
              >
                Войти как клиника
              </a>
            </p>
          </motion.form>
        </div>
      </main>

      <Footer />
    </>
  );
}
