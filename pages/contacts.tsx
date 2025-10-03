// pages/contacts.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Contacts() {
  return (
    <>
      <Head>
        <title>Контакты — Адепт</title>
        <meta name="description" content="Свяжитесь с командой Адепт." />
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-3xl font-semibold mb-4">Контакты</h1>
        <p className="text-gray-600 mb-8">
          Напишите нам:{" "}
          <a
            href="mailto:hello@adept.app"
            className="text-brand-primary hover:opacity-80"
          >
            hello@adept.app
          </a>
        </p>

        {/* Форма-заглушка */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-medium mb-3">Форма обратной связи</h2>
          <p className="text-gray-500 mb-6">
            Здесь будет форма. Пока можете написать нам на почту.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/30"
              placeholder="Ваше имя"
              disabled
            />
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/30"
              placeholder="Email"
              disabled
            />
          </div>

          <textarea
            className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/30"
            rows={5}
            placeholder="Сообщение"
            disabled
          />

          <button
            className="mt-4 rounded-xl bg-gray-200 px-5 py-3 text-gray-500"
            disabled
          >
            Отправить (скоро)
          </button>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-brand-primary hover:opacity-80">
            ← На главную
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}