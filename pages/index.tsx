// pages/index.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BeforeAfter from "../components/BeforeAfter";

export default function Home() {
  return (
    <>
      <Head>
        <title>Бъютичь — онлайн-демо</title>
        <meta
          name="description"
          content="Здесь в режиме реального времени вы можете оценить изменения: слайдер До/После и персональная визуализация."
        />
      </Head>

      {/* Хедер */}
      <Header />

      {/* Основной контент */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-2xl font-bold mb-2">Бъютичь — онлайн-демо</h1>
        <p className="text-gray-600 mb-8">
          Здесь в режиме реального времени вы можете оценить изменения.
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-4">Визуализация «До / После»</h2>
          <BeforeAfter
            before="/demo/before.jpg"
            after="/demo/after.jpg"
            beforeAlt="Фото лица — До"
            afterAlt="Фото лица — После"
          />
          <ul className="list-disc list-inside mt-6 text-gray-700">
            <li>Классическая шторка (как у QOVES)</li>
            <li>Работает мышью и на touch-экранах</li>
            <li>Без внешних библиотек</li>
          </ul>
        </section>
      </main>

      {/* Футер */}
      <Footer />
    </>
  );
}
