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
    "Персонализированный анализ лица на базе искусственного интеллекта. Улучшите кожу, подчеркните сильные стороны и повысьте уверенность в себе.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#111111" />
      </Head>

      <Header />

      <main className="bg-[#111111] text-white">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden">
          {/* Фон-видео (заглушка) */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            aria-hidden="true"
          >
            {/* Когда будет готово видео — заменишь img на <video muted autoPlay loop src="/bg/ai-bg.mp4" className="w-full h-full object-cover" /> */}
            <img
              src="/bg/ai-bg-placeholder.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Тонирующий градиент поверх видео */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-[#111111]/70 to-[#111111]"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              Анализ лица и уход <br className="hidden md:block" />
              <span className="text-brand-secondary">без операций</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-2xl text-lg text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.55 }}
            >
              Adept использует ИИ, чтобы проанализировать ваше лицо и предложить персональные рекомендации: от ухода за кожей до улучшения самопрезентации — быстро и без вмешательств.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.55 }}
            >
              <Link
                href="/register"
                className="px-7 py-3 rounded-xl text-[#111111] font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
                }}
              >
                Зарегистрироваться
              </Link>

              <a
                href="#research"
                className="px-7 py-3 rounded-xl border border-white/25 hover:bg-white/5 transition"
              >
                Подробнее
              </a>
            </motion.div>

            {/* Before / After, как у QOVES под хедлайном */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm">
                <BeforeAfter
                  before="/demo/before-women.jpg"
                  after="/demo/after-women.jpg"
                  beforeAlt="Женский портрет — До"
                  afterAlt="Женский портрет — После"
                />
              </div>
              <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm">
                <BeforeAfter
                  before="/demo/before-man.jpg"
                  after="/demo/after-man.jpg"
                  beforeAlt="Мужской портрет — До"
                  afterAlt="Мужской портрет — После"
                />
              </div>
            </div>

            {/* Плюсы в одну строку (career / dating / confidence-стиль) */}
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-secondary" />
                Самопрезентация и уверенность
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-secondary" />
                Уход за кожей на основе данных
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-secondary" />
                Профессиональные рекомендации
              </li>
            </ul>
          </div>
        </section>

        {/* ================= PRESS / MEDIA ================= */}
        <section className="py-14 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="uppercase tracking-widest text-xs text-white/50 mb-6">
              О нас пишут
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-80">
              {/* Положи SVG/PNG логотипы в /public/press/ */}
              <img src="/press/forbes.svg" alt="Forbes" className="h-6 mx-auto" />
              <img src="/press/wired.svg" alt="Wired" className="h-6 mx-auto" />
              <img src="/press/guardian.svg" alt="The Guardian" className="h-6 mx-auto" />
              <img src="/press/vogue.svg" alt="Vogue" className="h-6 mx-auto" />
            </div>
          </div>
        </section>

        {/* ================= RESEARCH ================= */}
        <section id="research" className="py-24 bg-[#111111]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              Как ИИ-анализ влияет на реальную жизнь
            </motion.h2>
            <p className="mt-4 max-w-2xl text-white/70">
              Исследования показывают связь внешнего вида с самооценкой, карьерой и отношениями. Adept объясняет, что именно видят люди и как мягко усилить сильные стороны.
            </p>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <article className="bg-white/[0.06] rounded-2xl p-6 border border-white/10 hover:border-white/20 transition">
                <h3 className="text-lg font-semibold mb-2 text-brand-primary">
                  Самооценка и уверенность
                </h3>
                <p className="text-white/70 text-sm">
                  Осознанность своих черт помогает говорить увереннее и чувствовать себя свободнее в кадре и вживую.
                </p>
              </article>

              <article className="bg-white/[0.06] rounded-2xl p-6 border border-white/10 hover:border-white/20 transition">
                <h3 className="text-lg font-semibold mb-2 text-brand-primary">
                  Здоровье кожи
                </h3>
                <p className="text-white/70 text-sm">
                  ИИ замечает морщины, пятна и оттенок кожи — подбирает уход и режим, который реально помогает.
                </p>
              </article>

              <article className="bg-white/[0.06] rounded-2xl p-6 border border-white/10 hover:border-white/20 transition">
                <h3 className="text-lg font-semibold mb-2 text-brand-primary">
                  Первое впечатление
                </h3>
                <p className="text-white/70 text-sm">
                  Первые секунды решают многое. Adept подсказывает детали, которые влияют на восприятие и доверие.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="py-24 bg-[#0f0f0f]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold">Как это работает</h2>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              <div className="rounded-2xl p-6 bg-white/[0.06] border border-white/10">
                <div className="text-brand-secondary text-sm font-semibold">Шаг 1</div>
                <h3 className="mt-2 text-lg font-semibold">Загрузка фото</h3>
                <p className="mt-2 text-white/70 text-sm">
                  Зарегистрируйтесь и добавьте фото с фронтальным ракурсом.
                </p>
              </div>
              <div className="rounded-2xl p-6 bg-white/[0.06] border border-white/10">
                <div className="text-brand-secondary text-sm font-semibold">Шаг 2</div>
                <h3 className="mt-2 text-lg font-semibold">ИИ-анализ</h3>
                <p className="mt-2 text-white/70 text-sm">
                  Модель выявит особенности кожи, эмоции и ключевые черты лица.
                </p>
              </div>
              <div className="rounded-2xl p-6 bg-white/[0.06] border border-white/10">
                <div className="text-brand-secondary text-sm font-semibold">Шаг 3</div>
                <h3 className="mt-2 text-lg font-semibold">Персональные рекомендации</h3>
                <p className="mt-2 text-white/70 text-sm">
                  Получите план ухода и советы по самопрезентации — без инвазивных процедур.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}