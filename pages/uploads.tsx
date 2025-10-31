// pages/upload.tsx
import Head from "next/head";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";

type Analysis = {
  avgBrightness: number;   // 0..255
  contrast: number;        // stddev 0..128+
  rednessIndex: number;    // 0..2 (условно)
  sharpness: number;       // относительная резкость (0..N)
  notes: string[];
  summary: string;
};

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const reset = () => {
    setFile(null);
    setPreview(null);
    setAnalysis(null);
    inputRef.current?.value && (inputRef.current.value = "");
  };

  const onSelect = useCallback((f?: File) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) return alert("Загрузите изображение");
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    setAnalysis(null);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    onSelect(f || undefined);
  };

  const dropHandlers = {
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files?.[0];
      onSelect(f || undefined);
    },
  };

  const analyze = async () => {
    if (!imgRef.current) return;
    setLoading(true);
    try {
      const res = await analyzeImageInBrowser(imgRef.current);
      setAnalysis(res);
    } catch (e) {
      console.error(e);
      alert("Не удалось проанализировать изображение.");
    } finally {
      setLoading(false);
    }
  };

  const tips = useMemo(() => {
    if (!analysis) return [];
    const arr: string[] = [];
    if (analysis.avgBrightness < 90) arr.push("Снимок тёмный — попробуйте более яркое освещение спереди.");
    if (analysis.avgBrightness > 200) arr.push("Снимок пересвечен — уменьшите яркость света.");
    if (analysis.sharpness < 8) arr.push("Возможно, картинка слегка размыта — попросим держать камеру устойчиво.");
    return arr;
  }, [analysis]);

  return (
    <>
      <Head>
        <title>Загрузка фото — тестовый анализ</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="max-w-3xl mx-auto px-4 md:px-6 py-10">
        <div className="mb-4">
          <Link href="/" className="text-sm text-gray-500 hover:underline">&larr; На главную</Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-2">Тестовый анализ фото (локально)</h1>
        <p className="text-gray-600 mb-6">
          Загрузите портрет (анфас). Анализ выполняется в браузере, без отправки на сервер. Результат сохраняется только на время сессии.
        </p>

        {/* Dropzone */}
        {!preview ? (
          <label
            {...dropHandlers}
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 p-10 text-center cursor-pointer hover:bg-gray-50"
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onInputChange}
            />
            <div className="text-lg font-medium">Перетащите фото сюда или кликните для выбора</div>
            <div className="text-sm text-gray-500">Форматы: JPG/PNG/HEIC, до ~10 МБ</div>
          </label>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Preview */}
            <div className="bg-white border border-gray-200 rounded-2xl p-3">
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
                <img
                  ref={imgRef}
                  src={preview}
                  alt="Предпросмотр"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
                  onClick={() => inputRef.current?.click()}
                >
                  Заменить фото
                </button>
                <button
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50"
                  onClick={reset}
                >
                  Сбросить
                </button>
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-white border border-gray-200 rounded-2xl p-3">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Результат анализа</h2>
                <button
                  className="px-4 py-2 rounded-xl bg-brand-primary text-white hover:opacity-90 disabled:opacity-50"
                  onClick={analyze}
                  disabled={loading}
                >
                  {loading ? "Анализируем…" : "Анализировать"}
                </button>
              </div>

              {!analysis ? (
                <p className="text-gray-500 text-sm">
                  Нажмите «Анализировать», чтобы получить тестовый результат.
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Metric label="Яркость" value={`${Math.round(analysis.avgBrightness)}/255`} />
                    <Metric label="Контраст" value={analysis.contrast.toFixed(1)} />
                    <Metric label="Краснота (индекс)" value={analysis.rednessIndex.toFixed(2)} />
                    <Metric label="Резкость (отн.)" value={analysis.sharpness.toFixed(1)} />
                  </div>

                  <div className="rounded-xl bg-gray-50 p-3 text-sm">
                    <div className="font-medium mb-1">Итог:</div>
                    <p className="text-gray-700">{analysis.summary}</p>
                  </div>

                  {analysis.notes.length > 0 && (
                    <div className="rounded-xl bg-gray-50 p-3 text-sm">
                      <div className="font-medium mb-1">Рекомендации по снимку:</div>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {analysis.notes.map((n, i) => <li key={i}>{n}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

/** Плашка метрики */
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 p-2">
      <div className="text-gray-500">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

/**
 * Анализ изображения целиком в браузере.
 * Простейшие метрики:
 * - средняя яркость (по Y=luma),
 * - "контраст" как stddev по Y,
 * - индекс красноты (R / (G+B)),
 * - "резкость" как дисперсия лапласиана (оценка).
 */
async function analyzeImageInBrowser(img: HTMLImageElement): Promise<Analysis> {
  // Рисуем уменьшенную копию (быстрее считать)
  const MAX_W = 600;
  const ratio = img.naturalWidth / img.naturalHeight;
  const w = Math.min(MAX_W, img.naturalWidth);
  const h = Math.round(w / ratio);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, w, h);

  const { data } = ctx.getImageData(0, 0, w, h);
  const n = w * h;
  let sumY = 0, sumY2 = 0, sumR = 0, sumG = 0, sumB = 0;

  // Быстрый проход по пикселям
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    // Luma по Rec.601 (приближённо)
    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    sumY += y;
    sumY2 += y * y;
    sumR += r; sumG += g; sumB += b;
  }

  const avgY = sumY / n;
  const variance = sumY2 / n - avgY * avgY;
  const stddev = Math.sqrt(Math.max(variance, 0));

  // Индекс "красноты": чем выше R относительно G+B, тем больше.
  // Добавляем маленький эпсилон, чтобы не делить на 0.
  const redness = (sumR / n) / ((sumG / n + sumB / n) + 1e-6);

  // Оценка резкости: дисперсия лапласиана
  const sharpness = estimateSharpness(ctx, w, h);

  // Простейшая логика интерпретации
  const notes: string[] = [];
  if (avgY < 100) notes.push("Низкая яркость — добавьте мягкий фронтальный свет.");
  if (avgY > 200) notes.push("Очень ярко — возможна пересветка деталей.");
  if (stddev < 40) notes.push("Низкий контраст — возможна плоская картинка.");
  if (sharpness < 8) notes.push("Низкая резкость — попробуйте перефокусироваться или удерживать камеру устойчивее.");
  if (redness > 1.15) notes.push("Замечена лёгкая выраженность красных оттенков (покраснение).");

  let summary = "Кожа выглядит нейтрально, значимых артефактов не обнаружено.";
  if (redness > 1.2) summary = "Замечена выраженная краснота — возможно, чувствительность или локальные воспаления.";
  else if (redness > 1.05) summary = "Лёгкая покрасненность; можно рекомендовать успокаивающие средства.";
  if (stddev < 35) summary += " Контраст невысокий — освещение мягкое.";
  if (stddev > 60) summary += " Контраст высокий — возможно, жёсткий свет.";
  if (sharpness < 8) summary += " Снимок слегка размытый.";

  return {
    avgBrightness: avgY,
    contrast: stddev,
    rednessIndex: redness,
    sharpness,
    notes,
    summary,
  };
}

/** очень простая оценка резкости по дисперсии лапласиана */
function estimateSharpness(ctx: CanvasRenderingContext2D, w: number, h: number): number {
  const src = ctx.getImageData(0, 0, w, h);
  const g = new Float32Array(w * h);

  // Грейскейл
  for (let i = 0, p = 0; i < src.data.length; i += 4, p++) {
    const r = src.data[i], gg = src.data[i + 1], b = src.data[i + 2];
    g[p] = 0.299 * r + 0.587 * gg + 0.114 * b;
  }

  // Лапласиан 3x3
  const k = [
    0,  1, 0,
    1, -4, 1,
    0,  1, 0,
  ];
  const out = new Float32Array(w * h);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let acc = 0, idx = y * w + x, p = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          acc += g[idx + ky * w + kx] * k[p++];
        }
      }
      out[idx] = acc;
    }
  }

  // дисперсия
  let sum = 0, sum2 = 0, count = 0;
  for (let i = 0; i < out.length; i++) {
    const v = out[i];
    sum += v;
    sum2 += v * v;
    count++;
  }
  const mean = sum / count;
  const variance = sum2 / count - mean * mean;
  return Math.max(variance, 0) ** 0.5 / 10; // нормируем «для красоты»
}