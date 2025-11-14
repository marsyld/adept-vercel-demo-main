// pages/clinic/dashboard.tsx
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function ClinicDashboardPage() {
  // Пока всё статично: тестовый кабинет
  const clinicName = "Adept Clinic (демо)";
  const stats = {
    patients: 18,
    analysesTotal: 64,
    analysesWeek: 7,
  };

  return (
    <>
      <Head>
        <title>Adept — Кабинет клиники</title>
        <meta
          name="description"
          content="Кабинет косметологической клиники в Adept: пациенты, анализы и отчёты."
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-[#111111] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок и приветствие */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Кабинет клиники
              </h1>
              <p className="text-white/60 text-sm">
                {clinicName}. Тестовый режим — данные сохранены только на этой сессии.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/clinic/patients"
                className="px-5 py-3 rounded-xl text-sm font-semibold text-[#111111]"
                style={{
                  background:
                    "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
                }}
              >
                Открыть список пациентов
              </Link>
              <Link
                href="/analyze"
                className="px-5 py-3 rounded-xl text-sm font-semibold border border-white/20 text-white/80 hover:bg-white/[0.06] transition"
              >
                Быстрый анализ фото
              </Link>
            </div>
          </motion.div>

          {/* Статистика */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-5">
              <div className="text-xs text-white/50 mb-1">Пациентов</div>
              <div className="text-3xl font-semibold">{stats.patients}</div>
              <div className="text-xs text-white/40 mt-1">
                Общее количество заведённых пациентов
              </div>
            </div>
            <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-5">
              <div className="text-xs text-white/50 mb-1">Анализов всего</div>
              <div className="text-3xl font-semibold">{stats.analysesTotal}</div>
              <div className="text-xs text-white/40 mt-1">
                Все выполненные ИИ-анализы
              </div>
            </div>
            <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-5">
              <div className="text-xs text-white/50 mb-1">
                Анализов за 7 дней
              </div>
              <div className="text-3xl font-semibold">{stats.analysesWeek}</div>
              <div className="text-xs text-white/40 mt-1">
                Динамика использования за последнюю неделю
              </div>
            </div>
          </motion.div>

          {/* Быстрые действия */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-16"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Добавить пациента
                </h2>
                <p className="text-sm text-white/70 mb-4">
                  Создайте карточку пациента с базовыми данными, чтобы
                  хранить историю его анализов и работы с ним.
                </p>
              </div>
              <Link
                href="/clinic/patients"
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-white/20 text-sm text-white/80 hover:bg-white/[0.06] transition"
              >
                Перейти к пациентам
              </Link>
            </div>

            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Анализ по фото
                </h2>
                <p className="text-sm text-white/70 mb-4">
                  Загрузите фото пациента, чтобы получить ИИ-анализ:
                  возраст, эмоции, состояние кожи и beauty-показатели.
                </p>
              </div>
              <Link
                href="/analyze"
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-[#111111]"
                style={{
                  background:
                    "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
                }}
              >
                Запустить анализ
              </Link>
            </div>
          </motion.div>

          {/* Заглушка под будущие разделы */}
          <motion.div
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="text-lg font-semibold mb-2">
              Что появится дальше
            </h2>
            <ul className="text-sm text-white/70 list-disc list-inside space-y-1">
              <li>Отчёты по каждому пациенту в PDF</li>
              <li>История анализов и динамика изменений</li>
              <li>Командный доступ для врачей и администраторов</li>
              <li>Настройки брендинга вашей клиники</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
