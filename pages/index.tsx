// pages/index.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BeforeAfter from "../components/BeforeAfter";

export default function Home() {
  return (
    <>
      <Head>
        <title>Адепт — онлайн-демо</title>
        <meta
          name="description"
          content="Адепт — цифровой помощник для косметолога и пациента: слайдер До/После, загрузка фото и история изменений."
        />
        <meta name="keywords" content="косметология, ИИ, анализ лица, до и после, skin analysis" />
        <meta name="author" content="Adept" />
      </Head>

      <Header />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        {/* Hero */}
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Адепт — онлайн-демо</h1>
          <p className="text-gray-600 mb-6">
            Загрузите фото, смотрите «До / После» и собирайте историю изменений.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/upload"
              className="inline-flex items-center px-5 py-3 rounded-xl bg-brand-primary text-white font-medium hover:opacity-90 transition"
            >
              Попробовать демо
            </a>
            <a
              href="/onboarding/q/1"
              className="inline-flex items-center px-5 py-3 rounded-xl border border-gray-300 text-gray-900 hover:bg-gray-50 transition"
            >
              Пройти анкету
            </a>
          </div>
        </section>

        {/* Двойной слайдер: женщины / мужчины */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Визуализация «До / После»</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Блок: Женщины */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-medium text-gray-800">Женщины</h3>
                <span className="text-xs text-gray-500">Демо</span>
              </div>
              <BeforeAfter
                // заменишь на свои файлы, когда добавишь женские фото
                before="/demo/before.jpg"
                after="/demo/after.jpg"
                beforeAlt="Женский портрет — До"
                afterAlt="Женский портрет — После"
              />
            </div>

            {/* Блок: Мужчины */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-medium text-gray-800">Мужчины</h3>
                <span className="text-xs text-gray-500">Демо</span>
              </div>
              <BeforeAfter
                // пока используем те же файлы, чтобы не было 404
                before="/demo/before.jpg"
                after="/demo/after.jpg"
                beforeAlt="Мужской портрет — До"
                afterAlt="Мужской портрет — После"
              />
            </div>
          </div>

          <ul className="list-disc list-inside mt-6 text-gray-700 space-y-1">
            <li>Классическая шторка с перетаскиванием</li>
            <li>Работает мышью и на touch-экранах</li>
            <li>Без внешних библиотек</li>
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
