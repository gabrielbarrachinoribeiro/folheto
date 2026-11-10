import { ArrowRight } from "lucide-react";
import cover1 from "../../../assets/capa1.png";
import cover2 from "../../../assets/capa2.png";
import cover3 from "../../../assets/capa3.png";

const readings = [
  {
    title: "Neon Yokohama",
    slug: "neon-yokohama",
    cover: cover2,
    chapter: 12,
    chapterTitle: "Vozes no corredor",
    page: 4,
    totalPages: 10,
  },
  {
    title: "As Brumas de Kel",
    slug: "as-brumas-de-kel",
    cover: cover1,
    chapter: 3,
    chapterTitle: "Sem retorno",
    page: 7,
    totalPages: 10,
  },
  {
    title: "Coral",
    slug: "coral",
    cover: cover3,
    chapter: 1,
    chapterTitle: "O primeiro sinal",
    page: 2,
    totalPages: 10,
  },
];

export default function ContinueReading() {
  return (
    <section
      className="border-b border-[#303039] bg-[#0d0e15] py-12 text-[#faf9f6] sm:pt-19 sm:pb-21"
      aria-labelledby="continue-reading-title"
    >
      <div className="container mx-auto px-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end sm:gap-6">
          <div>
            <p className="font-['Barlow_Condensed',sans-serif] font-semibold uppercase mb-0.5 text-xs tracking-widest text-[#f1c84b]">
              Sua estante
            </p>
            <h2
              className="font-['Barlow_Condensed',sans-serif] text-4xl lg:text-5xl leading-none font-black tracking-tight uppercase"
              id="continue-reading-title"
            >
              Continue lendo
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Retome exatamente do painel onde você parou.
            </p>
          </div>
          <a
            className="font-['Barlow_Condensed',sans-serif] font-semibold uppercase focus-visible:outline-2 focus-visible:outline-[#f1c84b] focus-visible:outline-offset-4 inline-flex items-center gap-2.5 py-1 text-xs tracking-widest whitespace-nowrap text-[#f1c84b] hover:underline hover:underline-offset-4"
            href="/biblioteca"
          >
            Ver biblioteca
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

        <div className="grid w-full max-w-261 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {readings.map((reading) => (
            <a
              key={reading.slug}
              className="focus-visible:outline-2 focus-visible:outline-[#f1c84b] focus-visible:outline-offset-4 flex min-w-0 gap-3 border border-[#30313c] bg-[#1d1e27] p-3 transition-colors duration-180 hover:border-[#f1c84b]/50 hover:bg-[#23242e] motion-reduce:transition-none"
              href={`/ler/${reading.slug}/${reading.chapter}?pagina=${reading.page}`}
              aria-label={`Continuar ${reading.title}, capítulo ${reading.chapter}, página ${reading.page}`}
            >
              <img
                className="block h-26 w-17 shrink-0 border border-white/10 object-cover"
                src={reading.cover}
                alt={`Capa de ${reading.title}`}
                loading="lazy"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="font-['Barlow_Condensed',sans-serif] text-lg leading-tight font-extrabold uppercase">
                  {reading.title}
                </h3>
                <p className="mt-1.5 text-xs leading-normal text-slate-400">
                  Cap. {reading.chapter} · {reading.chapterTitle}
                </p>
                <div className="mt-auto pt-4">
                  <progress
                    className="block h-1 w-full appearance-none overflow-hidden rounded-full border-0 bg-[#2a2b36] text-[#f1c84b] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[#2a2b36] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[#f1c84b] [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-[#f1c84b]"
                    value={reading.page}
                    max={reading.totalPages}
                    aria-label={`Progresso de ${reading.title}`}
                  />
                  <div className="font-['Barlow_Condensed',sans-serif] font-semibold uppercase mt-2 flex items-center justify-between gap-2 text-xs tracking-wider text-slate-400">
                    <span>
                      Pág. {reading.page} de {reading.totalPages}
                    </span>
                    <span className="inline-flex items-center gap-1.25 text-[#f1c84b]">
                      Continuar
                      <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
