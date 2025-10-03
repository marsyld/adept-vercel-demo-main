import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-7 w-auto" />
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/login" className="hover:text-brand-primary transition-colors">Войти</Link>
          <Link href="/upload" className="hover:text-brand-primary transition-colors">Загрузка</Link>
          <Link href="/history" className="hover:text-brand-primary transition-colors">История</Link>
        </nav>
      </div>
    </header>
  );
}
