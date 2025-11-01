// pages/index-v2.tsx
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeforeAfter from "@/components/BeforeAfter";

export default function HomeV2() {
  const title = "Adept — Анализ лица и уход без операций";
  const description =
    "Персонализированный анализ лица на базе ИИ: рекомендации по уходу, самопрезентации и улучшению внешнего вида без инвазивных процедур.";

  // Research tabs (как у QOVES: несколько доменов влияния)
  const researchTabs = [
    {
      key: "confidence",
      label: "Самооценка",
      text:
        "Осознание сильных сторон внешности связано с более высокой уверенностью и качеством коммуникации. Adept помогает увидеть это объективно.",
      img: "/qoves/research-confidence.jpg",
    },
    {
      key: "health",
      label: "Здоровье кожи",
      text:
        "ИИ выявляет морщины, пятна и оттенок кожи, подсказывает уход и режим восстановления — от сна и воды до SPF.",
      img: "/qoves/research-skin.jpg",
    },
    {
      key: "first-impression",
      label: "Первое впечатление",
      text:
        "Первые секунды взаимодействия формируют отношение. Adept подсказывает детали, влияющие на доверие и воспринимаемую компетентность.",
      img: "/qoves/research-impression.jpg",
    },
    {
      key: "career",
      label: "Карьера",
      text:
        "Аккуратная самопрезентация коррелирует с результатами переговоров и найма. ИИ-подсказки помогают попадать в правильный тон.",
      img: "/qoves/research-career.jpg",
    },
    {
      key: "relationships",
      label: "Отношения",
      text:
        "Чёткие сигналы открытости и доброжелательности улучшают восприятие в онлайне и офлайне. Adept объясняет, как это транслировать.",
      img: "/qoves/research-relationship.jpg",
    },
  ];
  const [activeTab, setActiveTab] = useState(researchTabs[0].key);

  // FAQ
  const faqs = [
    {
      q: "Нужны ли салонные процедуры?",
      a: "Нет. Adept предлагает мягкие способы: уход, режим, освещение, ракурсы. Инвазивные методы не требуются.",
    },
    {
      q: "Какие фото подходят для анализа?",
      a: "Фронтальный портрет при хорошем освещении, без сильных фильтров. Одно лицо на кадр — лучший вариант.",
    },
    {
      q: "Безопасны ли мои данные?",
      a: "Мы обрабатываем изображения только для анализа, не публикуем и не передаём третьим сторонам без вашего согласия.",
    },
    {
      q: "Сколько это стоит?",
      a: "Базовый анализ — бесплатно. Планы с расширенными рекомендациями и отчётами доступны по подписке.",
    },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#111111" />
      </Head>

      <Header />

      <main className="bg-[#111111] text-white">
        {/* ================= HERO (video bg + BA) ================= */}
        <section className="relative overflow-hidden">
          {/* фоновое видео (заглушка) */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            {/* Заменишь img на video, когда будет готов файл:
              <video autoPlay muted loop playsInline src="/qoves/ai-bg.mp4" className="w-full h-full object-cover" />
            */}
            <img
              src="/qoves/ai-bg-placeholder.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          {/* градиент-тон */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-[#111111]/70 to-[#111111]" />

          <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              Анализ лица и уход{" "}
              <span className="text-brand-secondary">без операций</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-2xl text-lg text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.5 }}
            >
              Adept с ИИ-анализом подскажет, что подчеркнуть и как улучшить
              состояние кожи и самопрезентацию — мягко, понятно и действенно.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.5 }}
            >
              <Link
                href="/register"
                className="px-7 py-3 rounded-xl text-[#111111] font-semibold"
                style={{ background: "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)" }}
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

            {/* Before / After: 2 колонки (жен/муж), как у QOVES */}
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

            {/* Feature strip — короткие пункты (career/dating/confidence-стиль) */}
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-secondary" />
                Уверенность и самопрезентация
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

        {/* ================= MEDIA / PRESS ================= */}
        <section className="py-14 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="uppercase tracking-widest text-xs text-white/50 mb-6">
              О нас пишут
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-80">
              <img src="/qoves/press-forbes.svg" alt="Forbes" className="h-6 mx-auto" />
              <img src="/qoves/press-wired.svg" alt="Wired" className="h-6 mx-auto" />
              <img src="/qoves/press-guardian.svg" alt="The Guardian" className="h-6 mx-auto" />
              <img src="/qoves/press-vogue.svg" alt="Vogue" className="h-6 mx-auto" />
              <img src="/qoves/press-cosmopolitan.svg" alt="Cosmopolitan" className="h-6 mx-auto" />
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS (3 шага) ================= */}
        <section className="py-24 bg-[#0f0f0f]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold">Как это работает</h2>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {[
                { step: "Шаг 1", title: "Зарегистрируйтесь", text: "Создайте аккаунт и подготовьте фронтальное фото при хорошем свете." },
                { step: "Шаг 2", title: "ИИ-анализ", text: "Модель оценит эмоции, тон кожи, морщины и ключевые черты." },
                { step: "Шаг 3", title: "Рекомендации", text: "Получите персональный план ухода и советы по самопрезентации." },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="rounded-2xl p-6 bg-white/[0.06] border border-white/10"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <div className="text-brand-secondary text-sm font-semibold">{s.step}</div>
                  <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-white/70 text-sm">{s.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= RESEARCH (tabs) ================= */}
        <section id="research" className="py-24 bg-[#111111]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold">Почему это важно</h2>
            <p className="mt-4 max-w-2xl text-white/70">
              Исследования показывают влияние внешности на уверенность, карьеру и отношения.
              Adept помогает корректно интерпретировать сигналы и мягко усиливать сильные стороны.
            </p>

            <div className="mt-10 grid md:grid-cols-4 gap-3">
              {researchTabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`text-left rounded-xl px-4 py-3 text-sm border transition ${
                    activeTab === t.key
                      ? "border-brand-secondary bg-white/10"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6 items-center">
              {researchTabs
                .filter((t) => t.key === activeTab)
                .map((t) => (
                  <FragmentedTab key={t.key} text={t.text} img={t.img} />
                ))}
            </div>
          </div>
        </section>

        {/* ================= PLANS ================= */}
        <section className="py-24 bg-[#0f0f0f]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold">Тарифы</h2>
            <p className="mt-3 text-white/70 max-w-2xl">
              Начните бесплатно. Расширенные отчёты и персональные планы доступны в подписке.
            </p>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
  {[
    {
      name: "Free",
      price: "0 ₽",
      desc: "Базовый анализ, эмоции, возраст, beauty-оценки.",
      features: ["Загрузка 1 фото", "Эмоции и возраст", "Beauty-оценка"],
      cta: "Зарегистрироваться",
      href: "/register",
      disabled: false,
    },
    {
      name: "Plus",
      price: "990 ₽",
      desc: "Расширенный skin-анализ, рекомендации по уходу.",
      features: ["Skinstatus", "Советы по уходу", "Экспорт отчёта PDF"],
      cta: "Скоро",
      href: "#",
      disabled: true,
    },
    {
      name: "Pro",
      price: "2 490 ₽",
      desc: "Полный план самопрезентации + рекомендации по съёмке.",
      features: [
        "План самопрезентации",
        "Подсказки по свету/ракурсу",
        "Сравнение До/После",
      ],
      cta: "Скоро",
      href: "#",
      disabled: true,
    },
  ].map((p, i) => (
    <motion.div
      key={p.name}
      className={`rounded-2xl p-6 border ${
        p.disabled
          ? "border-white/10 bg-white/[0.04] opacity-70"
          : "border-brand-secondary bg-white/[0.08]"
      }`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
    >
      <div className="text-sm text-brand-secondary font-semibold">{p.name}</div>
      <div className="mt-2 text-3xl font-bold">{p.price}</div>
      <p className="mt-2 text-white/70 text-sm">{p.desc}</p>

      <ul className="mt-4 space-y-2 text-sm text-white/80">
        {p.features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary inline-block" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={p.disabled ? "#" : p.href}
        onClick={(e) => p.disabled && e.preventDefault()}
        className={`mt-6 inline-block w-full text-center px-5 py-3 rounded-xl font-semibold transition ${
          p.disabled
            ? "cursor-not-allowed opacity-60 bg-gray-500 text-gray-300"
            : "text-[#111111] hover:opacity-90"
        }`}
        style={{
          background: p.disabled
            ? "linear-gradient(135deg, #555 0%, #666 100%)"
            : "linear-gradient(135deg, #E1EEC3 0%, #E1EEC3 100%)",
        }}
      >
        {p.cta}
      </Link>
    </motion.div>
  ))}
</div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="py-24 bg-[#111111]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold">Отзывы</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {[
                { name: "Наталья", text: "Лёгкое улучшение ежедневной рутины — и результат заметен через 2 недели." },
                { name: "Алексей", text: "Подсказки по свету и ракурсу сделали фото и созвоны намного увереннее." },
                { name: "Мирослав", text: "Рекомендации по уходу простые и понятные. Чувствую себя лучше в кадре." },
              ].map((t, i) => (
                <motion.blockquote
                  key={t.name}
                  className="bg-white/[0.06] border border-white/10 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <p className="text-white/80">“{t.text}”</p>
                  <footer className="mt-3 text-sm text-white/60">— {t.name}</footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ (аккордеон) ================= */}
        <section className="py-24 bg-[#0f0f0f]">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold">FAQ</h2>
            <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 overflow-hidden">
              {faqs.map((f, i) => (
                <FaqRow key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ================= helpers ================= */

function FragmentedTab({ text, img }: { text: string; img: string }) {
  return (
    <>
      <motion.div
        className="rounded-2xl p-6 bg-white/[0.06] border border-white/10"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-white/80">{text}</p>
      </motion.div>
      <motion.div
        className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <img src={img} alt="" className="w-full h-full object-cover" />
      </motion.div>
    </>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/[0.02]">
      <button
        className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-white/[0.04] transition"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium">{q}</span>
        <span className="text-white/60">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0 text-white/75">{a}</div>
      )}
    </div>
  );
}
