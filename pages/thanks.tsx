// pages/thanks.tsx
import Head from "next/head";
import Link from "next/link";

export default function Thanks() {
  return (
    <>
      <Head>
        <title>Спасибо!</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="max-w-xl mx-auto px-4 md:px-6 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Спасибо за ответы!</h1>
        <p className="mt-3 text-gray-600">
          Мы учтём ваши данные при подготовке рекомендаций.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-50"
          >
            На главную
          </Link>
          <Link
            href="/onboarding/q/1"
            className="px-5 py-3 rounded-xl bg-brand-primary text-white hover:opacity-90"
          >
            Пройти заново
          </Link>
        </div>
      </main>
    </>
  );
}
