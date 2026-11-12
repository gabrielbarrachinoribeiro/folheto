import cover1 from "../assets/capa1.png";
import cover2 from "../assets/capa2.png";
import cover3 from "../assets/capa3.png";

export const comicDetails = {
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

export const comics = [
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

