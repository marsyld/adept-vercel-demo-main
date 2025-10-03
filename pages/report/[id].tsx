import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BeforeAfter from "../../components/BeforeAfter";

type A = {
  id: string;
  status: string;
  assets?: { normalized_url?: string; after_simulation_url?: string };
};

export default function Report() {
  const { query } = useRouter();
  const [data, setData] = useState<A | null>(null);

  useEffect(() => {
    if (!query.id) return;
    (async () => {
      const r = await fetch(`/api/analyses/${query.id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      const j = await r.json();
      setData(j);
    })();
  }, [query.id]);

  if (!data) return <main className="mx-auto max-w-5xl px-5 py-8">Загрузка…</main>;
  if (data.status !== "done")
    return <main className="mx-auto max-w-5xl px-5 py-8">Статус: {data.status}</main>;

  const before = data.assets?.normalized_url || "/demo/before.jpg";
  const after = data.assets?.after_simulation_url || "/demo/after.jpg";

  return (
    <main className="mx-auto max-w-5xl px-5 py-8">
      <header className="mb-6 flex items-center">
        <h1 className="text-2xl font-bold">Отчёт #{data.id}</h1>
        <a
          className="ml-auto rounded-xl bg-primary px-4 py-2 text-white hover:opacity-90"
          href={`/api/analyses/${data.id}/report.pdf`}
          target="_blank"
          rel="noreferrer"
        >
          Скачать PDF
        </a>
      </header>

      <BeforeAfter before={before} after={after} ratio={16 / 9} />
      <p className="mt-3 text-sm text-slate-600">Слева «До», справа «После». Потяните ползунок.</p>
    </main>
  );
}
