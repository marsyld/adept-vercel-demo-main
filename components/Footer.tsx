import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid gap-8 md:grid-cols-3">
        <div className="flex items-center gap-3">
          <Logo className="h-7 w-auto" />
        </div>

        <div className="text-sm">
          <div className="font-semibold mb-3">Компания</div>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-brand-primary">О проекте</Link></li>
            <li><Link href="/contacts" className="hover:text-brand-primary">Контакты</Link></li>
            <li><Link href="/careers" className="hover:text-brand-primary">Карьера</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="font-semibold mb-3">Документы</div>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="hover:text-brand-primary">Политика конфиденциальности</Link></li>
            <li><Link href="/terms" className="hover:text-brand-primary">Пользовательское соглашение</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 text-xs text-gray-500 flex items-center justify-between">
          <span>© {year} Бъютичь</span>
          <span>Сделано с заботой об интерфейсе</span>
        </div>
      </div>
    </footer>
  );
}
