// pages/about.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>О проекте — Адепт</title>
        <meta
          name="description"
          content="Адепт — цифровой помощник для косметологов и пациентов."
        />
      </Head>

      <Header />

      <main className="max-w-3xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-3xl font-semibold mb-6">О проекте</h1>
        <div className="prose max-w-none prose-p:leading-relaxed">
          <p>
            <strong>Адепт</strong> — это прототип системы, которая помогает
            косметологам и пациентам визуализировать изменения «до/после»,
            собирать историю снимков и получать структурированные рекомендации.
          </p>
          <p>
            Сейчас мы сосредоточены на базовом UX: загрузка фото, сравнение
            снимков, быстрый старт для демонстрации. Следующий шаг — онбординг
            с анкетой и требованиями к фото, а также множественная загрузка
            (как в Qoves).
          </p>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-brand-primary hover:opacity-80">
            ← На главную
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
