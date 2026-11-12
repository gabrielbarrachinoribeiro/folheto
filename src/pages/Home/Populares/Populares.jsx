import { ArrowRight, Star } from "lucide-react";
import cover1 from "../../../assets/capa1.png";
import cover2 from "../../../assets/capa2.png";
import cover3 from "../../../assets/capa3.png";

const popularComics = [
  {
    title: "Neon Yokohama",
    slug: "neon-yokohama",
    cover: cover2,
    genre: "Ficção Científica",
    rating: "4.9",
    readers: "312 mil",
  },
  {
    title: "Coral",
    slug: "coral",
    cover: cover3,
    genre: "Terror",
    rating: "4.8",
    readers: "202 mil",
  },
  {
    title: "Herdeiros do Vento",
    slug: "herdeiros-do-vento",
    cover: cover1,
    genre: "Fantasia",
    rating: "4.9",
    readers: "156 mil",
  },
  {
    title: "Vermelho Absoluto",
    slug: "vermelho-absoluto",
    cover: cover1,
    genre: "Ação",
    rating: "4.8",
    readers: "128 mil",
  },
  {
    title: "Silêncio Branco",
    slug: "silencio-branco",
    cover: cover3,
    genre: "Terror",
    rating: "4.8",
    readers: "97 mil",
  },
];

export default function Populares() {
  return (
    <section
      className="border-b border-[#303039] bg-[#101017] py-12 text-[#faf9f6] sm:py-20"
      aria-labelledby="popular-comics-title"
    >
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
          <div>
            <p className="mb-0.5 font-['Barlow_Condensed',sans-serif] text-xs font-semibold tracking-widest text-[#f1c84b] uppercase">
              Ranking semanal
            </p>
            <h2
              id="popular-comics-title"
              className="font-['Barlow_Condensed',sans-serif] text-4xl leading-none font-black tracking-tight uppercase lg:text-5xl"
            >
              Populares da semana
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              As histórias que o Folheto inteiro está lendo agora.
            </p>
          </div>
          <a
            href="/populares"
            className="inline-flex items-center gap-2.5 py-1 font-['Barlow_Condensed',sans-serif] text-xs font-semibold tracking-widest whitespace-nowrap text-[#f1c84b] uppercase hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1c84b]"
          >
            Ver os 10 mais
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

        <ol className="grid grid-cols-1 gap-x-8 gap-y-8 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {popularComics.map((comic, index) => (
            <li key={comic.slug} className="min-w-0">
              <a
                href={`/ler/${comic.slug}/1`}
                className="group relative block pl-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1c84b]"
                aria-label={`${index + 1}º lugar: ${comic.title}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-2 top-0 font-['Barlow_Condensed',sans-serif] text-[104px] leading-[0.85] font-black tracking-tighter text-[#232530] transition-colors duration-300 ease-in-out group-hover:text-[#f1c84b] group-focus-visible:text-[#f1c84b]"
                >
                  {index + 1}
                </span>
                <div className="relative aspect-2/3 overflow-hidden rounded-md border border-[#30313c] bg-[#1d1e27]">
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
                </div>
                <h3 className="mt-2 font-['Barlow_Condensed',sans-serif] text-sm leading-tight font-extrabold uppercase">
                  {comic.title}
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">{comic.genre}</p>
                <div className="mt-1.5 flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 text-[#f1c84b]">
                    <Star size={12} fill="currentColor" aria-hidden="true" />
                    <span aria-label={`Nota ${comic.rating} de 5`}>
                      {comic.rating}
                    </span>
                  </span>
                  <span className="text-slate-400">{comic.readers}</span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
