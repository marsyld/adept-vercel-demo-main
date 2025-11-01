// pages/index-v2.tsx
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeforeAfter from "@/components/BeforeAfter";
import { motion } from "framer-motion";

export default function HomeV2() {
  const title = "Adept — Анализ лица и уход без операций";
  const description =
    "Персонализированный анализ лица на базе искусственного интеллекта. Узнайте, как улучшить кожу, подчеркнуть сильные стороны и повысить уверенность в себе.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Header />

      <main className="overflow-hidden">
        {/* ============ HERO ============ */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 bg-gradient-to-b from-white to-gray-50">
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Анализ лица и уход <br className="hidden md:block" /> без операций
          </motion.h1>

          <motion.p
            className="text-gray-600 max-w-xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Adept использует ИИ, чтобы проанализировать ваше лицо и предложить персональные рекомендации для улучшения кожи, уверенности и самопрезентации.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              href="/analyze"
              className="px-8 py-4 bg-brand-primary text-white rounded-xl text-lg font-medium hover:opacity-90 transition"
            >
              Начать анализ
            </Link>
            <Link
              href="#research"
              className="px-8 py-4 border border-gray-300 rounded-xl text-lg text-gray-800 hover:bg-gray-50 transition"
            >
              Подробнее
            </Link>
          </motion.div>

          {/* Before / After */}
          <div className="mt-20 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
            <BeforeAfter
              before="/demo/before-women.jpg"
              after="/demo/after-women.jpg"
              beforeAlt="Женский портрет — До"
              afterAlt="Женский портрет — После"
            />
            <BeforeAfter
              before="/demo/before-man.jpg"
              after="/demo/after-man.jpg"
              beforeAlt="Мужской портрет — До"
              afterAlt="Мужской портрет — После"
            />
          </div>
        </section>

        {/* ============ PRESS / MEDIA ============ */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <p className="uppercase tracking-widest text-gray-400 text-sm mb-8">
              О нас писали
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
              <img src="/press/forbes.svg" alt="Forbes" className="mx-auto h-8" />
              <img src="/press/wired.svg" alt="Wired" className="mx-auto h-8" />
              <img src="/press/guardian.svg" alt="The Guardian" className="mx-auto h-8" />
              <img src="/press/vogue.svg" alt="Vogue" className="mx-auto h-8" />
            </div>
          </div>
        </section>

        {/* ============ RESEARCH TABS ============ */}
        <section id="research" className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">
              Ваше лицо влияет на жизнь во многих аспектах
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Исследования показывают, что восприятие внешности влияет на карьеру, уверенность и межличностные отношения. Adept помогает понять эти связи и улучшить самопрезентацию.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-medium mb-2">Самооценка</h3>
                <p className="text-gray-600 text-sm">
                  Осознание своих сильных сторон помогает снизить тревожность и повысить уверенность. Adept подскажет, какие черты стоит подчеркнуть.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-medium mb-2">Здоровье кожи</h3>
                <p className="text-gray-600 text-sm">
                  Алгоритм анализирует морщины, пятна и тон кожи — это помогает выявить сигналы усталости и подобрать уход.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-medium mb-2">Карьера и впечатление</h3>
                <p className="text-gray-600 text-sm">
                  Первое впечатление формируется за секунды. Adept покажет, как вы воспринимаетесь и что улучшить для уверенного образа.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="py-24 bg-white text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Начните свой анализ уже сегодня
          </motion.h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Получите персональный отчёт и рекомендации, основанные на данных нейросети.
          </p>
          <Link
            href="/analyze"
            className="inline-block px-8 py-4 bg-brand-primary text-white rounded-xl text-lg font-medium hover:opacity-90 transition"
          >
            Пройти анализ
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}