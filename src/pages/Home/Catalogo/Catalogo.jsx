import { useState } from "react";
import { ArrowRight, Star } from "lucide-react";

import { comics, comicDetails } from "../../../data/comics.js";

const genres = [
  "Todos",
  "Ação",
  "Fantasia",
  "Ficção Científica",
  "Romance",
  "Terror",
  "Aventura",
  "Mistério",
];

export default function Catalogo() {
  const [activeGenre, setActiveGenre] = useState("Todos");
  const filteredComics =
    activeGenre === "Todos"
      ? comics
      : comics.filter((comic) => comic.genres.includes(activeGenre));

  return (
    <section
      className="border-b border-[#303039] bg-[#0d0e15] py-12 text-[#faf9f6] sm:py-20"
      aria-labelledby="catalog-title"
    >
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
          <div>
            <p className="mb-0.5 font-['Barlow_Condensed',sans-serif] text-xs font-semibold tracking-widest text-[#f1c84b] uppercase">
              Catálogo
            </p>
            <h2
              id="catalog-title"
              className="font-['Barlow_Condensed',sans-serif] text-4xl leading-none font-black tracking-tight uppercase lg:text-5xl"
            >
              Explore novos universos
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Filtre por gênero e encontre a próxima história que vai ocupar sua
              cabeça.
            </p>
          </div>
          <a
            href="/catalogo"
            className="inline-flex items-center gap-2.5 py-1 font-['Barlow_Condensed',sans-serif] text-xs font-semibold tracking-widest whitespace-nowrap text-[#f1c84b] uppercase hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1c84b]"
          >
            Catálogo completo
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrar por gênero"
        >
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              aria-pressed={activeGenre === genre}
              aria-controls="catalog-results"
              onClick={() => setActiveGenre(genre)}
              className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1c84b] ${
                activeGenre === genre
                  ? "border-[#f1c84b] bg-[#f1c84b] text-[#101017]"
                  : "border-zinc-700 text-zinc-200 hover:border-[#f1c84b] hover:text-[#f1c84b]"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <p className="sr-only" role="status">
          {filteredComics.length} histórias encontradas para {activeGenre}.
        </p>
        <ul
          id="catalog-results"
          className="grid grid-cols-1 gap-x-4 gap-y-6 min-[400px]:grid-cols-2 lg:grid-cols-4"
        >
          {filteredComics.map((comic) => (
            <li key={comic.slug} className="min-w-0">
              <a
                href={`/quadrinhos/${comic.slug}`}
                className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1c84b]"
              >
                <div className="relative aspect-2/3 overflow-hidden rounded-md border border-[#30313c] bg-[#1d1e27] transition-colors duration-300 group-hover:border-[#f1c84b]">
                  <img
                    src={comic.cover}
                    alt={`Capa de ${comic.title}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#08090e] via-transparent to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#08090e] via-[#08090e]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
                    <h3 className="min-w-0 font-['Barlow_Condensed',sans-serif] text-xl leading-tight font-extrabold uppercase">
                      {comic.title}
                    </h3>
                    <span className="font-['Barlow_Condensed',sans-serif] text-xs font-semibold tracking-widest text-slate-400 uppercase">
                      {comic.genres.join(" · ")}
                    </span>
                    <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-in-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                      <div className="min-h-0 overflow-hidden">
                        <div className="pt-3">
                          <p className="text-xs leading-relaxed text-[#faf9f6]">
                            {comicDetails[comic.slug].description}
                          </p>
                          <p className="mt-2 text-xs text-slate-400">
                            {comicDetails[comic.slug].publisher}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#f1c84b]">
                            <span
                              className="inline-flex items-center gap-1"
                              aria-label={`Nota ${comicDetails[comic.slug].rating} de 5`}
                            >
                              <Star
                                size={12}
                                fill="currentColor"
                                aria-hidden="true"
                              />
                              {comicDetails[comic.slug].rating}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>
                              {comicDetails[comic.slug].chapters} capítulos
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
