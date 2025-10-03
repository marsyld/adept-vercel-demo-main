// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Адепт. Все права защищены.
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link href="/about" className="hover:text-brand-primary">
            О проекте
          </Link>
          <Link href="/conacts" className="hover:text-brand-primary">
            Контакты
          </Link>
          <Link href="/upload" className="hover:text-brand-primary">
            Загрузка
          </Link>
          <Link href="/history" className="hover:text-brand-primary">
            История
          </Link>
        </nav>
      </div>
    </footer>
  );
}
