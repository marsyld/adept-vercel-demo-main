import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        {/* === ЛОГО === */}
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-7 w-auto" />
        </Link>

        {/* === ЦЕНТРАЛЬНОЕ МЕНЮ === */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a
            href="#how-it-works"
            className="hover:text-brand-primary transition-colors"
          >
            Как это работает
          </a>
          <a
            href="#plans"
            className="hover:text-brand-primary transition-colors"
          >
            Тарифы
          </a>
          <a
            href="#faq"
            className="hover:text-brand-primary transition-colors"
          >
            F.A.Q.
          </a>
        </nav>

        {/* === CTA-ПРАВАЯ ЗОНА === */}
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/register"
            className="px-4 py-2 rounded-xl bg-brand-primary text-[#111111] font-medium hover:opacity-90 transition"
          >
            Регистрация
          </Link>
          <Link
            href="/login"
            className="text-white/80 hover:text-brand-secondary transition"
          >
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}
