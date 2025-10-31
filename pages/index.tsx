// pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BeforeAfter from "../components/BeforeAfter";
import FaceAnalyzer from "@/components/FaceAnalyzer";

export default function Home() {
  const siteName = "Adept";
  const title = "Adept — Анализ лица с ИИ";
  const description =
    "Загрузите фото и получите анализ состояния кожи, эмоций и возраста с помощью искусственного интеллекта.";
  const ogImage = "/og-image.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: "/",
    potentialAction: {
      "@type": "SearchAction",
      target: "/search?q={query}",
      "query-input": "required name=query",
    },
  };

  return (
    <>
      <Head>
        <title>{title}</title>

        {/* Basic SEO */}
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="косметология, ИИ, анализ лица, до и после, skin analysis"
        />
        <meta name="author" content="Adept" />

        {/* Open Graph */}
        <meta property="og:site_name" content={siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* Header */}
      <Header />

      {/* Основной контент */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <section aria-labelledby="hero-title" className="mb-10 scroll-mt-24">
          <h1 id="hero-title" className="text-3xl md:text-4xl font-bold mb-3">
            {title}
          </h1>
          <p className="text-gray-600 mb-6">
            Загрузите фото, смотрите «До / После» и анализируйте результат с
            помощью ИИ.
          </p>

          {/* Компонент анализа лица */}
          <FaceAnalyzer />
        </section>

        {/* Блок: Визуализация До / После */}
        <section aria-labelledby="ba-title" className="mb-12 scroll-mt-24">
          <h2 id="ba-title" className="text-xl font-semibold mb-4">
            Визуализация «До / После»
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-medium text-gray-800">Женщины</h3>
                <span className="text-xs text-gray-500">Демо</span>
              </div>
              <BeforeAfter
                before="/demo/before-women.jpg"
                after="/demo/after-women.jpg"
                beforeAlt="Женский портрет — До"
                afterAlt="Женский портрет — После"
              />
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-medium text-gray-800">Мужчины</h3>
                <span className="text-xs text-gray-500">Демо</span>
              </div>
              <BeforeAfter
                before="/demo/before-man.jpg"
                after="/demo/after-man.jpg"
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

      {/* Sticky CTA (только мобилки) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-30 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Link
            href="/upload"
            prefetch
            className="block w-full text-center px-5 py-3 rounded-xl bg-brand-primary text-white font-medium hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
          >
            Попробовать демо
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
