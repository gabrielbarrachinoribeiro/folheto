import { useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import cover1 from "../../../assets/capa1.png";
import cover2 from "../../../assets/capa2.png";
import cover3 from "../../../assets/capa3.png";

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

const comicDetails = {
  "vermelho-absoluto": {
    description:
      "Depois do Eclipse, o céu de Marte virou um teto de poeira. Íris voltou sozinha — e trouxe algo com ela.",
    publisher: "Selo Brasa",
    rating: "4.8",
    chapters: 20,
  },
  "o-ultimo-verao-em-lisboa": {
    description:
      "Entre as ruas de Lisboa e um verão prestes a acabar, dois caminhos se cruzam e mudam para sempre.",
    publisher: "Ponte Norte",
    rating: "4.7",
    chapters: 12,
  },
  "cidade-morta": {
    description:
      "Uma cidade sem testemunhas. Um detetive seguindo pistas que todos preferiam deixar enterradas.",
    publisher: "Selo Brasa",
    rating: "4.8",
    chapters: 24,
  },
  "protocolo-lua": {
    description:
      "Uma transmissão interrompe o silêncio da base lunar. A ordem é ignorá-la, mas alguém já respondeu.",
    publisher: "Órbita",
    rating: "4.6",
    chapters: 16,
  },
  "as-brumas-de-kel": {
    description:
      "Nas brumas de Kel, uma viajante procura o caminho de casa e encontra um reino que desapareceu dos mapas.",
    publisher: "Ponte Norte",
    rating: "4.7",
    chapters: 18,
  },
  coral: {
    description:
      "Algo no recife está colecionando mergulhadores. E eles continuam sorrindo.",
    publisher: "Selo Brasa",
    rating: "4.8",
    chapters: 17,
  },
  "herdeiros-do-vento": {
    description:
      "Acima das nuvens, ilhas guardam os últimos segredos de um povo que aprendeu a ouvir o vento.",
    publisher: "Ponte Norte",
    rating: "4.9",
    chapters: 28,
  },
  "neon-yokohama": {
    description:
      "Yokohama, 2091. Lembranças são aluguel. Rin vendeu as dela — e encontrou uma que não é sua.",
    publisher: "Ponte Norte",
    rating: "4.9",
    chapters: 42,
  },
};

const comics = [
  {
    title: "Vermelho Absoluto",
    slug: "vermelho-absoluto",
    cover: cover1,
    format: "HQ",
    genres: ["Ação", "Ficção Científica"],
  },
  {
    title: "O Último Verão em Lisboa",
    slug: "o-ultimo-verao-em-lisboa",
    cover: cover2,
    format: "Graphic novel",
    genres: ["Romance"],
  },
  {
    title: "Cidade Morta",
    slug: "cidade-morta",
    cover: cover2,
    format: "Graphic novel",
    genres: ["Mistério", "Terror"],
  },
  {
    title: "Protocolo Lua",
    slug: "protocolo-lua",
    cover: cover1,
    format: "Graphic novel",
    genres: ["Ficção Científica", "Mistério"],
  },
  {
    title: "As Brumas de Kel",
    slug: "as-brumas-de-kel",
    cover: cover1,
    format: "HQ",
    genres: ["Fantasia", "Aventura"],
  },
  {
    title: "Coral",
    slug: "coral",
    cover: cover3,
    format: "Webtoon",
    genres: ["Terror", "Mistério"],
  },
  {
    title: "Herdeiros do Vento",
    slug: "herdeiros-do-vento",
    cover: cover1,
    format: "HQ",
    genres: ["Fantasia", "Aventura"],
  },
  {
    title: "Neon Yokohama",
    slug: "neon-yokohama",
    cover: cover2,
    format: "Mangá",
    genres: ["Ficção Científica", "Ação"],
  },
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
