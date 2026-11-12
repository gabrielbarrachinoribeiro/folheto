import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Star } from "lucide-react";
import cover1 from "../../../assets/capa1.png";
import cover2 from "../../../assets/capa2.png";
import cover3 from "../../../assets/capa3.png";
import background1 from "../../../assets/fundo1.png";
import background2 from "../../../assets/fundo2.png";
import background3 from "../../../assets/fundo3.png";

const highlights = [
  {
    title: "Vermelho Absoluto",
    slug: "vermelho-absoluto",
    cover: cover1,
    background: background1,
    format: "HQ · Em andamento",
    description:
      "Depois do Eclipse, o céu de Marte virou um teto de poeira. Íris voltou sozinha — e trouxe algo com ela.",
    genres: ["Ação", "Ficção científica"],
    rating: "4.8",
    chapters: 20,
    readers: 128,
    publisher: "Selo Brasa",
    action: "Começar a ler",
    chapter: 1,
  },
  {
    title: "Neon Yokohama",
    slug: "neon-yokohama",
    cover: cover2,
    background: background2,
    format: "Mangá · Completo",
    description:
      "Yokohama, 2091. Lembranças são aluguel. Rin vendeu as dela — e encontrou uma que não é sua.",
    genres: ["Ficção científica", "Ação"],
    rating: "4.9",
    chapters: 42,
    readers: 312,
    publisher: "Ponte Norte",
    action: "Continuar cap. 12",
    chapter: 12,
  },
  {
    title: "Coral",
    slug: "coral",
    cover: cover3,
    background: background3,
    format: "Webtoon · Em andamento",
    description:
      "Algo no recife está colecionando mergulhadores. E eles continuam sorrindo.",
    genres: ["Terror", "Mistério"],
    rating: "4.8",
    chapters: 17,
    readers: 202,
    publisher: "Selo Brasa",
    action: "Continuar cap. 1",
    chapter: 1,
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const item = highlights[displayedIndex];
  const fadeClass = `transition-opacity duration-180 ease-in-out motion-reduce:transition-none ${activeIndex !== displayedIndex ? "opacity-0" : "opacity-100"}`;
  const changeSlide = (direction) =>
    setActiveIndex(
      (current) =>
        (current + direction + highlights.length) % highlights.length,
    );

  useEffect(() => {
    if (activeIndex === displayedIndex) return;
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 180;
    const timeout = window.setTimeout(
      () => setDisplayedIndex(activeIndex),
      delay,
    );
    return () => window.clearTimeout(timeout);
  }, [activeIndex, displayedIndex]);

  useEffect(() => {
    highlights.forEach(({ cover, background }) => {
      [cover, background].forEach((src) => {
        const image = new Image();
        image.src = src;
      });
    });
  }, []);

  return (
    <main
      className="relative isolate border-b border-[#2b2b35] bg-[#101017] text-[#faf9f6] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-[#f1c84b] [&_a:focus-visible]:outline-offset-[5px] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-[#f1c84b] [&_button:focus-visible]:outline-offset-[5px]"
      aria-label="Destaques do mês"
      aria-roledescription="carrossel"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={item.background}
          alt=""
          className={`h-full w-full object-cover ${fadeClass}`}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[#101017]/85" />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 pt-9 pb-12 sm:grid-cols-2 sm:pt-12 sm:pb-14 lg:gap-20 lg:pt-14 lg:pb-20">
        <div className="flex min-w-0 flex-col justify-between">
          <div className={fadeClass} aria-live="polite" aria-atomic="true">
            <div className="font-['Barlow_Condensed',sans-serif] font-semibold uppercase tracking-[1.8px] flex flex-wrap items-center gap-3.5 text-xs text-[#f1c84b]">
              <span>Destaque do mês</span>
              <i className="h-px w-8 bg-[#f1c84b70]" aria-hidden="true" />
              <span className="text-slate-400">{item.format}</span>
            </div>
            <h1 className="font-['Barlow_Condensed',sans-serif] mt-4 mb-5.5 max-w-120 text-[clamp(64px,14vw,88px)] leading-[.88] font-black tracking-[-2px] text-balance uppercase sm:max-w-155 sm:text-[clamp(60px,8vw,88px)] lg:text-[clamp(64px,6vw,108px)]">
              {item.title}
            </h1>
            <p className="max-w-106.25 text-base leading-[1.6] text-slate-400">
              {item.description}
            </p>
          </div>
          <div className="pt-9 sm:pt-18">
            <div
              className={`flex flex-wrap items-center gap-3 text-xs text-slate-400 lg:gap-5 ${fadeClass}`}
            >
              <div className="font-['Barlow_Condensed',sans-serif] font-semibold uppercase tracking-[1.8px] flex flex-wrap gap-2 text-xs text-zinc-200 [&>span]:border [&>span]:border-[#303039] [&>span]:px-2.25 [&>span]:py-0.75">
                {item.genres.map((genre) => (
                  <span key={genre} className="rounded-full">{genre}</span>
                ))}
              </div>
              <span
                className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-[#f1c84b]"
                aria-label={`Nota ${item.rating}`}
              >
                <Star size={14} fill="currentColor" aria-hidden="true" />
                {item.rating}
              </span>
              <span>{item.chapters} capítulos</span>
              <span>{item.readers} mil leitores</span>
            </div>
            <div className={`mt-8 flex flex-wrap gap-3 ${fadeClass}`}>
              <a
                className="font-['Barlow_Condensed',sans-serif] font-semibold uppercase tracking-[1.8px] inline-flex min-h-11.5 items-center justify-center gap-3 rounded-full px-4.5 py-3 text-xs no-underline transition-colors duration-180 motion-reduce:transition-none lg:px-6 bg-[#f1c84b] text-[#101017] hover:bg-[#f7d775]"
                href={`/ler/${item.slug}/${item.chapter}`}
              >
                <BookOpen size={16} aria-hidden="true" />
                {item.action}
              </a>
              <a
                className="font-['Barlow_Condensed',sans-serif] font-semibold uppercase tracking-[1.8px] inline-flex min-h-11.5 items-center justify-center gap-3 rounded-full px-4.5 py-3 text-xs no-underline transition-colors duration-180 motion-reduce:transition-none lg:px-6 border border-[#303039] text-[#faf9f6] hover:border-[#f1c84b] hover:bg-[#f1c84b08]"
                href={`/quadrinhos/${item.slug}`}
              >
                Ver detalhes
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 sm:mt-9">
              <div className="flex gap-2 [&>button]:grid [&>button]:size-9 [&>button]:cursor-pointer [&>button]:place-items-center [&>button]:rounded-full [&>button]:border [&>button]:border-[#303039] [&>button]:text-slate-300 [&>button:hover]:border-[#f1c84b] [&>button:hover]:text-[#f1c84b]">
                <button
                  type="button"
                  onClick={() => changeSlide(-1)}
                  aria-label="Destaque anterior"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => changeSlide(1)}
                  aria-label="Próximo destaque"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              <div
                className="flex gap-1.5 [&>button]:flex [&>button]:h-9 [&>button]:min-w-4 [&>button]:cursor-pointer [&>button]:items-center [&_span]:block [&_span]:h-0.75 [&_span]:w-4 [&_span]:bg-[#303039] [&_span]:transition-[width,background-color] [&_span]:duration-180 motion-reduce:[&_span]:transition-none [&>button[aria-current]>span]:w-9 [&>button[aria-current]>span]:bg-[#f1c84b]"
                aria-label="Escolher destaque"
              >
                {highlights.map((slide, index) => (
                  <button
                    key={slide.slug}
                    type="button"
                    aria-label={`Mostrar ${slide.title}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span />
                  </button>
                ))}
              </div>
              <span className="font-['Barlow_Condensed',sans-serif] font-semibold uppercase tracking-[1.8px] text-xs text-slate-400">
                0{activeIndex + 1} / 0{highlights.length}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`flex min-w-0 items-center justify-center px-2.5 sm:justify-end sm:px-0 ${fadeClass}`}
        >
          <a
            className="relative isolate block max-w-90 rounded-lg outline outline-[#ffffff0d] outline-offset-10 after:pointer-events-none after:absolute after:inset-x-0 after:top-[40%] after:bottom-0 after:z-0 after:rounded-b-lg after:bg-[linear-gradient(transparent,#08090be8)] after:content-[''] sm:max-w-full"
            href={`/quadrinhos/${item.slug}`}
            aria-label={`Ver detalhes de ${item.title}`}
          >
            <img
              className="block h-auto max-h-none w-full max-w-full rounded-[inherit] sm:max-h-153.75 sm:w-auto"
              src={item.cover}
              alt={`Capa de ${item.title}`}
              fetchPriority="high"
            />
            <div className="absolute right-4 bottom-4.5 left-4 z-1 flex items-end justify-between gap-4">
              <div>
                <span className="font-['Barlow_Condensed',sans-serif] font-semibold uppercase tracking-[1.8px] mb-1 block text-xs text-[#f1c84b]">
                  {item.publisher}
                </span>
                <span className="font-['Barlow_Condensed',sans-serif] block text-xl leading-[1.1] font-extrabold text-[#faf9f6] uppercase">
                  {item.title}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-[#f1c84b]">
                <Star size={12} fill="currentColor" aria-hidden="true" />
                {item.rating}
              </span>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
