import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Plus,
  Star,
} from "lucide-react";
import { allComics, getChapters } from "../../data/comicProfiles.js";
import Avaliacoes from "./Avaliacoes.jsx";

function readSaved(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "false") === true;
  } catch {
    return false;
  }
}

function SavedButton({ slug }) {
  const key = `folheto:biblioteca:${slug}`;
  const [saved, setSaved] = useState(() => readSaved(key));
  function toggle() {
    const next = !saved;
    setSaved(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* Storage may be unavailable. */
    }
  }
  const Icon = saved ? Check : Plus;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      className={`inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition-colors ${saved ? "border-amber-300 bg-amber-300/10 text-amber-300" : "border-zinc-700 text-zinc-200 hover:border-amber-300 hover:text-amber-300"}`}
    >
      <Icon
        className="size-5"
        aria-hidden="true"
      />
      {saved ? "Na biblioteca" : "Adicionar à biblioteca"}
    </button>
  );
}

export default function Quadrinho({ slug }) {
  const comic = allComics.find((item) => item.slug === slug);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    document.title = comic
      ? `${comic.title} · Folheto`
      : "Quadrinho não encontrado · Folheto";
    return () => {
      document.title = "Folheto";
    };
  }, [comic]);

  if (!comic)
    return (
      <main className="container mx-auto px-6 py-20 text-zinc-100">
        <h1 className="text-3xl font-semibold">Quadrinho não encontrado</h1>
        <p className="mt-4 text-zinc-400">
          Essa história ainda não está no nosso catálogo.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950"
        >
          <ArrowLeft className="size-4" />
          Voltar para a Home
        </a>
      </main>
    );

  const chapters = getChapters(comic);
  const similar = allComics
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.genres.some((genre) => comic.genres.includes(genre))) -
        Number(a.genres.some((genre) => comic.genres.includes(genre))),
    )
    .slice(0, 4);

  return (
    <main className="text-zinc-100 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-amber-300 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-amber-300">
      <section
        aria-labelledby="comic-title"
        className="relative isolate pt-8 pb-12 sm:pt-12 lg:pt-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden mask-b-from-40% mask-b-to-100%"
        >
          <img
            src={comic.background}
            alt=""
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-zinc-950/60" />
        </div>
        <div className="container mx-auto px-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded text-sm text-zinc-300 transition-colors hover:text-amber-300"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar para explorar
          </a>
          <div className="mt-10 grid items-start gap-8 sm:grid-cols-3 lg:mt-20 lg:grid-cols-4 lg:gap-10">
            <div className="mx-auto w-full max-w-72 sm:max-w-none">
              <img
                src={comic.cover}
                alt={`Capa de ${comic.title}`}
                className="aspect-2/3 w-full rounded-xl border border-zinc-700 object-cover shadow-xl"
                fetchPriority="high"
              />

            </div>
            <div className="sm:col-span-2 sm:self-end lg:col-span-3">
              <h1
                id="comic-title"
                className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
              >
                {comic.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-300">
                {comic.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3 text-sm text-white">
                {comic.author && <span>Escritor(a): {comic.author}</span>}
                {comic.author && comic.artist && (
                  <span
                    aria-hidden="true"
                    className="size-1 shrink-0 translate-y-0.5 self-center rounded-full bg-white"
                  />
                )}
                {comic.artist && <span>Arte: {comic.artist}</span>}
                {(comic.author || comic.artist) && (
                  <span
                    aria-hidden="true"
                    className="size-1 shrink-0 translate-y-0.5 self-center rounded-full bg-white"
                  />
                )}
                <span>{comic.publisher}</span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {comic.genres.map((genre) => (
                  <li
                    key={genre}
                    className="rounded-full border border-zinc-700 bg-zinc-950/40 px-3 py-1 text-xs text-zinc-300"
                  >
                    {genre}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#capitulos"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-200"
                >
                  <BookOpen className="size-5" aria-hidden="true" />
                  Ver capítulos
                </a>
                <SavedButton
                  key={`biblioteca:${slug}`}
                  slug={slug}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-16 lg:pb-20">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <section aria-labelledby="synopsis-title" className="lg:sticky lg:top-28">
            <h2
              id="synopsis-title"
              className="text-2xl font-semibold tracking-tight"
            >
              Sinopse
            </h2>
            <p className="mt-5 text-sm leading-7 text-zinc-400">
              {comic.synopsis || comic.description}
            </p>
              <dl className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 text-center">
                  <dt className="text-xs text-zinc-400">Nota</dt>
                  <dd className="mt-1 text-xl font-semibold text-amber-300">
                    {comic.rating}
                  </dd>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 text-center">
                  <dt className="text-xs text-zinc-400">Capítulos</dt>
                  <dd className="mt-1 text-xl font-semibold">
                    {comic.chapters}
                  </dd>
                </div>
              </dl>
          </section>

          <section
            id="capitulos"
            aria-labelledby="chapters-title"
            className="scroll-mt-28"
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2
                id="chapters-title"
                className="text-2xl font-semibold tracking-tight"
              >
                Capítulos
              </h2>
              <span className="text-xs text-zinc-400">
                {chapters.length} disponíveis
              </span>
            </div>
            <ol
              id="chapter-list"
              className="divide-y divide-zinc-800 border-y border-zinc-800"
            >
              {(showAll ? chapters : chapters.slice(0, 8)).map((chapter) => (
                <li key={chapter.number}>
                  <a
                    href={`/ler/${slug}/${chapter.number}`}
                    className="group flex items-center gap-4 rounded-lg px-3 py-4 text-sm transition-colors hover:bg-zinc-900"
                  >
                    <span className="w-6 shrink-0 text-xs font-medium tabular-nums text-zinc-500">
                      {String(chapter.number).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 group-hover:text-amber-300">
                      {chapter.title}
                    </span>
                    <span className="shrink-0 whitespace-nowrap text-xs text-zinc-400">
                      {chapter.pages} páginas
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-2 text-xs text-amber-300">
                      Ler
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
            {chapters.length > 8 && (
              <button
                type="button"
                onClick={() => setShowAll((value) => !value)}
                aria-expanded={showAll}
                aria-controls="chapter-list"
                className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg py-2 text-sm font-medium text-amber-300 hover:text-amber-200"
              >
                {showAll
                  ? "Mostrar menos"
                  : `Ver todos os ${chapters.length} capítulos`}
                <ChevronDown
                  className={`size-4 transition-transform ${showAll ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            )}
          </section>
        </div>

        <Avaliacoes key={slug} slug={slug} />

        <section aria-labelledby="similar-title" className="mt-16 lg:mt-20">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2
              id="similar-title"
              className="text-2xl font-semibold tracking-tight"
            >
              Obras semelhantes
            </h2>
            <a
              href="/#catalog-title"
              className="inline-flex items-center gap-2 rounded text-sm font-medium text-amber-300 hover:text-amber-200"
            >
              Explorar mais
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-6">
            {similar.map((item) => (
              <li key={item.slug} className="min-w-0">
                <a
                  href={`/quadrinhos/${item.slug}`}
                  className="group block rounded-xl"
                >
                  <div className="aspect-2/3 overflow-hidden rounded-xl border border-zinc-800 transition-colors group-hover:border-amber-300">
                    <img
                      src={item.cover}
                      alt={`Capa de ${item.title}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold group-hover:text-amber-300">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-xs text-amber-300">
                      <Star
                        className="size-3"
                        fill="currentColor"
                        aria-hidden="true"
                      />
                      {item.rating}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">
                    {item.author || item.publisher}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
