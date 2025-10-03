// pages/onboarding/q/[step].tsx
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import OnboardingProgress from "@/components/OnboardingProgress";
import { STORAGE_KEY, onboardingSchema } from "@/lib/onboarding";
import type { OnboardingData } from "@/types/onboarding";
import Head from "next/head";
import Link from "next/link";

const TOTAL_STEPS = 9;

const defaultData: OnboardingData = {
  gender: undefined,
  age: undefined,
  skinType: undefined,
  concerns: [],
  allergies: "",
  pregnancy: "na",
  contraindications: "",
  routine: [],
  contact: { email: "", phone: "", consent: false },
};

export default function OnboardingStep() {
  const router = useRouter();
  const step = Math.max(1, Math.min(TOTAL_STEPS, Number(router.query.step ?? 1)));

  const [data, setData] = useState<OnboardingData>(defaultData);
  const [error, setError] = useState<string | null>(null);

  // загрузка/сохранение в localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData({ ...defaultData, ...JSON.parse(raw) });
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  const next = () => router.push(`/onboarding/q/${step + 1}`);
  const prev = () => router.push(`/onboarding/q/${step - 1}`);

  const canPrev = step > 1;
  const isLast = step === TOTAL_STEPS;

  // вопросы
  const Question = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <fieldset className="space-y-4">
            <legend className="text-lg font-medium">Ваш пол</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                { v: "female", label: "Женский" },
                { v: "male", label: "Мужской" },
                { v: "other", label: "Другое" },
              ].map((o) => (
                <label
                  key={o.v}
                  className={`border rounded-xl p-3 cursor-pointer ${
                    data.gender === o.v
                      ? "border-brand-primary ring-2 ring-brand-primary/30"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    className="mr-2"
                    checked={data.gender === (o.v as any)}
                    onChange={() =>
                      setData((d) => ({
                        ...d,
                        gender: o.v as any,
                        pregnancy: o.v === "female" ? d.pregnancy ?? "no" : "na",
                      }))
                    }
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>
        );

      case 2:
        return (
          <div>
            <label className="block text-lg font-medium mb-2">Возраст</label>
            <input
              type="number"
              min={16}
              max={80}
              value={data.age ?? ""}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  age: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="w-full rounded-xl border border-gray-300 px-3 py-2"
              placeholder="Например, 28"
            />
          </div>
        );

      case 3:
        return (
          <fieldset>
            <legend className="text-lg font-medium mb-3">Тип кожи</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                ["normal", "Нормальная"],
                ["dry", "Сухая"],
                ["oily", "Жирная"],
                ["combination", "Комбинированная"],
                ["sensitive", "Чувствительная"],
              ].map(([v, label]) => (
                <label
                  key={v}
                  className={`border rounded-xl p-3 cursor-pointer ${
                    data.skinType === v
                      ? "border-brand-primary ring-2 ring-brand-primary/30"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    className="mr-2"
                    checked={data.skinType === (v as any)}
                    onChange={() => setData((d) => ({ ...d, skinType: v as any }))}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        );

      case 4:
        return (
          <fieldset>
            <legend className="text-lg font-medium mb-3">Основные задачи</legend>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Акне/высыпания",
                "Пигментация",
                "Морщины/эластичность",
                "Покраснение/розацеа",
                "Расширенные поры",
                "Тусклый цвет",
              ].map((label) => {
                const checked = data.concerns?.includes(label);
                return (
                  <label
                    key={label}
                    className={`border rounded-xl p-3 cursor-pointer ${
                      checked
                        ? "border-brand-primary ring-2 ring-brand-primary/30"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={checked}
                      onChange={() =>
                        setData((d) => {
                          const list = new Set(d.concerns ?? []);
                          checked ? list.delete(label) : list.add(label);
                          return { ...d, concerns: Array.from(list) };
                        })
                      }
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        );

      case 5:
        return (
          <div>
            <label className="block text-lg font-medium mb-2">
              Чувствительность/аллергии (опционально)
            </label>
            <textarea
              value={data.allergies ?? ""}
              onChange={(e) => setData((d) => ({ ...d, allergies: e.target.value }))}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 min-h-[96px]"
            />
          </div>
        );

      case 6:
        return (
          <fieldset>
            <legend className="text-lg font-medium mb-3">
              Беременность/лактация
            </legend>
            <div className="grid sm:grid-cols-3 gap-2">
              {[
                ["no", "Нет"],
                ["yes", "Да"],
                ["na", "Не применимо"],
              ].map(([v, label]) => (
                <label
                  key={v}
                  className={`border rounded-xl p-3 cursor-pointer ${
                    data.pregnancy === v
                      ? "border-brand-primary ring-2 ring-brand-primary/30"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    className="mr-2"
                    checked={data.pregnancy === v}
                    onChange={() => setData((d) => ({ ...d, pregnancy: v as any }))}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        );

      case 7:
        return (
          <div>
            <label className="block text-lg font-medium mb-2">
              Противопоказания/недавние процедуры (опционально)
            </label>
            <textarea
              value={data.contraindications ?? ""}
              onChange={(e) =>
                setData((d) => ({ ...d, contraindications: e.target.value }))
              }
              className="w-full rounded-xl border border-gray-300 px-3 py-2 min-h-[96px]"
            />
          </div>
        );

      case 8:
        return (
          <fieldset>
            <legend className="text-lg font-medium mb-3">Текущий уход</legend>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Очищение",
                "Тоник/эссенция",
                "Кислоты (AHA/BHA/PHA)",
                "Ретиноиды",
                "Витамин C",
                "Увлажняющий крем",
                "SPF",
              ].map((label) => {
                const checked = data.routine?.includes(label);
                return (
                  <label
                    key={label}
                    className={`border rounded-xl p-3 cursor-pointer ${
                      checked
                        ? "border-brand-primary ring-2 ring-brand-primary/30"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={checked}
                      onChange={() =>
                        setData((d) => {
                          const list = new Set(d.routine ?? []);
                          checked ? list.delete(label) : list.add(label);
                          return { ...d, routine: Array.from(list) };
                        })
                      }
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        );

      case 9:
        return (
          <fieldset className="space-y-4">
            <legend className="text-lg font-medium">Контакты</legend>
            <input
              type="email"
              placeholder="Email"
              value={data.contact?.email ?? ""}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  contact: { ...d.contact, email: e.target.value },
                }))
              }
              className="w-full rounded-xl border border-gray-300 px-3 py-2"
            />
            <input
              type="tel"
              placeholder="Телефон"
              value={data.contact?.phone ?? ""}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  contact: { ...d.contact, phone: e.target.value },
                }))
              }
              className="w-full rounded-xl border border-gray-300 px-3 py-2"
            />
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={Boolean(data.contact?.consent)}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    contact: { ...d.contact, consent: e.target.checked },
                  }))
                }
              />
              Согласие на обработку данных
            </label>
          </fieldset>
        );

      default:
        return null;
    }
  }, [step, data]);

  async function handleSubmit() {
    try {
      onboardingSchema.parse({
        ...data,
        pregnancy: data.gender === "female" ? data.pregnancy ?? "no" : "na",
      });
      localStorage.removeItem(STORAGE_KEY);
      router.push("/thanks?from=onboarding");
    } catch (e: any) {
      setError(e?.message ?? "Ошибка валидации");
    }
  }

  return (
    <>
      <Head>
        <title>Анкета — шаг {step} из {TOTAL_STEPS}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="max-w-2xl mx-auto px-4 md:px-6 py-10">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          &larr; На главную
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold mt-2 mb-6">Анкета</h1>

        <OnboardingProgress step={step} total={TOTAL_STEPS} />

        <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
          {Question}
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex items-center justify-between">
          <button
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            onClick={prev}
            disabled={!canPrev}
          >
            Назад
          </button>

          {!isLast ? (
            <button
              className="px-5 py-2 rounded-xl bg-brand-primary text-white hover:opacity-90"
              onClick={next}
            >
              Далее
            </button>
          ) : (
            <button
              className="px-5 py-2 rounded-xl bg-brand-primary text-white hover:opacity-90"
              onClick={handleSubmit}
            >
              Завершить
            </button>
          )}
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Данные сохраняются только локально в браузере и будут удалены после
          завершения.
        </p>
      </main>
    </>
  );
}
