import { ArrowRight } from "lucide-react";
import cover1 from "../../../assets/capa1.png";
import cover2 from "../../../assets/capa2.png";
import cover3 from "../../../assets/capa3.png";

const publishers = [
  {
    name: "Selo Brasa",
    slug: "selo-brasa",
    description: "Ficção científica de closets e o terror que vem do recife.",
    comics: [
      { title: "Vermelho Absoluto", cover: cover1 },
      { title: "Coral", cover: cover3 },
      { title: "Protocolo Lua", cover: cover1 },
    ],
  },
  {
    name: "Nuvem Negra",
    slug: "nuvem-negra",
    description: "Grandes amores de verão e sombras em Lisboa onde só os mais corajosos entram.",
    comics: [
      { title: "O Último Verão em Lisboa", cover: cover2 },
      { title: "Cidade Morta", cover: cover2 },
      { title: "Silêncio Branco", cover: cover3 },
    ],
  },
  {
    name: "Editora Maré Alta",
    slug: "editora-mare-alta",
    description: "Fantasia de arquipélago e florestas que devolvem quem sumiu.",
    comics: [
      { title: "As Brumas de Kel", cover: cover1 },
      { title: "Herdeiros do Vento", cover: cover1 },
    ],
  },
  {
    name: "Ponte Norte",
    slug: "ponte-norte",
    description: "Mangás e HQs de estrada — do neon de Yokohama ao deserto sem mapa.",
    comics: [
      { title: "Neon Yokohama", cover: cover2 },
      { title: "Estrada sem Mapa", cover: cover1 },
    ],
  },
];

export default function Editoras() {
  return (
    <section
      aria-labelledby="publishers-title"
      className="border-b border-[#101017]/20 bg-[#f1c84b] bg-[radial-gradient(#10101715_1px,transparent_1px)] bg-size-[7px_7px] py-12 text-[#101017] sm:py-24"
    >
      <div className="container mx-auto grid items-center gap-10 px-6 lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-24">
        <div>
          <p className="mb-3 font-['Barlow_Condensed',sans-serif] text-xs font-semibold tracking-widest uppercase">
            As casas editoriais
          </p>
          <h2
            id="publishers-title"
            className="max-w-100 font-['Barlow_Condensed',sans-serif] text-5xl leading-[0.88] font-black tracking-tight uppercase sm:text-6xl xl:text-7xl"
          >
            As editoras<br />que a gente<br />relê
          </h2>
          <p className="mt-6 max-w-96 text-sm leading-relaxed text-[#101017]/85">
            Quatro selos por trás das capas que voltam à nossa estante — da ficção científica silenciosa ao terror que acontece na neve. Sem algoritmo, só vontade de publicar.
          </p>
          <a
            href="/catalogo"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#101017] px-6 py-3.5 font-['Barlow_Condensed',sans-serif] text-xs font-semibold tracking-widest text-[#faf9f6] uppercase transition-colors duration-300 hover:bg-[#272833] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#101017]"
          >
            Ver catálogo completo
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {publishers.map((publisher) => (
            <li key={publisher.slug} className="min-w-0">
              <a
                href={`/explorar?editora=${publisher.slug}`}
                className="group flex h-full flex-col border border-transparent bg-[#151620] p-5 text-[#faf9f6] transition-colors duration-300 hover:border-[#f1c84b] hover:bg-[#1d1e27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#101017]"
              >
                <p className="font-['Barlow_Condensed',sans-serif] text-xs font-semibold tracking-widest text-[#f1c84b] uppercase">
                  {publisher.comics.length} títulos no catálogo
                </p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <h3 className="font-['Barlow_Condensed',sans-serif] text-2xl leading-tight font-extrabold uppercase">
                    {publisher.name}
                  </h3>
                  <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-[#f1c84b] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {publisher.description}
                </p>
                <div className="mt-auto flex -space-x-1 pt-6">
                  {publisher.comics.map((comic) => (
                    <img
                      key={comic.title}
                      src={comic.cover}
                      alt={`Capa de ${comic.title}`}
                      title={comic.title}
                      loading="lazy"
                      className="h-16 w-11 border-2 border-[#151620] object-cover"
                    />
                  ))}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
