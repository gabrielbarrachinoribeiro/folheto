import { comics, comicDetails } from './comics.js'
import background1 from '../assets/fundo1.png'
import background2 from '../assets/fundo2.png'
import background3 from '../assets/fundo3.png'
import cover3 from '../assets/capa3.png'
import cover1 from '../assets/capa1.png'
import { readerPages } from './readerPages.js'

const profiles = {
  'vermelho-absoluto': {
    author: 'Lia Ferraz', artist: 'Tomás Aguiar', readers: '128 mil',
    synopsis: 'Cinco anos depois do Eclipse, a colônia K-2 desapareceu do mapa sem emitir um único sinal. A piloto Íris Nascimento é a única sobrevivente da equipe de resgate — e a única pessoa que viu o que dorme sob a cratera vermelha. Com seis dias de oxigênio e uma gravação que ninguém deveria ouvir, ela precisa decidir o que contar à Terra.',
  },
  'neon-yokohama': { author: 'Kenji Mori', readers: '312 mil', status: 'Completo' },
  coral: { author: 'Marina Costa', readers: '202 mil' },
  'herdeiros-do-vento': { author: 'Sofia Menezes', readers: '156 mil' },
  'protocolo-lua': { author: 'Alex Prado' },
}

export const allComics = [
  ...comics,
  { title: 'Silêncio Branco', slug: 'silencio-branco', cover: cover3, format: 'HQ', genres: ['Terror', 'Mistério'] },
  { title: 'Estrada sem Mapa', slug: 'estrada-sem-mapa', cover: cover1, format: 'Graphic novel', genres: ['Aventura'], description: 'Uma viajante atravessa o deserto seguindo uma estrada que não aparece em mapa algum. Cada parada revela um novo caminho — e um segredo de quem passou por ali.', publisher: 'Ponte Norte', rating: '4.5', chapters: 14 },
].map((comic) => ({
  ...comic,
  status: 'Em andamento',
  background: comic.cover === cover3 ? background3 : comic.slug === 'neon-yokohama' || comic.slug === 'cidade-morta' || comic.slug === 'o-ultimo-verao-em-lisboa' ? background2 : background1,
  ...comicDetails[comic.slug],
  ...(comic.slug === 'silencio-branco' ? { description: 'Uma estação isolada, um inverno sem fim e um silêncio que esconde mais do que parece.', publisher: 'Nuvem Negra', rating: '4.8', chapters: 15, readers: '97 mil' } : {}),
  ...profiles[comic.slug],
}))

const chapterTitles = [
  'O primeiro sinal', 'Ruído branco', 'Sem retorno', 'Água parada',
  'O outro lado', 'Ponto de ruptura', 'Fim de linha', 'Sombras no vidro',
  'Ecos do passado', 'A travessia', 'Entre dois mundos', 'O despertar',
  'Fragmentos', 'Além do horizonte', 'O que ficou para trás', 'A última mensagem',
  'No escuro', 'De volta ao início', 'Tudo o que perdemos', 'Um novo começo',
]

export function getChapters(comic) {
  return Array.from({ length: comic.chapters }, (_, index) => ({
    number: index + 1,
    pages: readerPages.length,
    title: chapterTitles[index] || `Novos caminhos — parte ${index - chapterTitles.length + 1}`,
  }))
}
