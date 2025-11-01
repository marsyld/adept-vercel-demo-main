// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0f0f0f] text-white mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Левая часть — логотип и копирайт */}
        <div>
          <h3 className="text-lg font-semibold text-brand-secondary mb-2">
            Adept
          </h3>
          <p className="text-sm text-white/70 leading-relaxed">
            Персональный анализ лица с помощью ИИ. <br />
            Осознанный уход, уверенность и самопрезентация.
          </p>
          <p className="text-xs text-white/50 mt-4">
            © {new Date().getFullYear()} Adept. Все права защищены.
          </p>
        </div>

        {/* Центральная навигация */}
        <div className="flex flex-col gap-2 text-sm">
          <h4 className="font-semibold text-white mb-2">Разделы</h4>
          <Link href="/#how-it-works" className="hover:text-brand-secondary transition">Как это работает</Link>
          <Link href="/#research" className="hover:text-brand-secondary transition">Почему это работает</Link>
          <Link href="/#plans" className="hover:text-brand-secondary transition">Тарифы</Link>
          <Link href="/#faq" className="hover:text-brand-secondary transition">FAQ</Link>
        </div>

        {/* Правая зона — контакты */}
        <div className="flex flex-col gap-2 text-sm">
          <h4 className="font-semibold text-white mb-2">Контакты</h4>
          <a href="mailto:info@adept.ai" className="hover:text-brand-secondary transition">
            info@adept.ai
          </a>
          <a href="tel:+79999999999" className="hover:text-brand-secondary transition">
            +7 999 999-99-99
          </a>
          <Link href="/privacy" className="hover:text-brand-secondary transition">
            Политика конфиденциальности
          </Link>
        </div>
      </div>

      {/* Нижняя плашка */}
      <div className="border-t border-white/10 bg-[#111111] py-4 text-center text-xs text-white/50">
        Сделано с 💡 на базе технологий искусственного интеллекта
      </div>
    </footer>
  );
}
