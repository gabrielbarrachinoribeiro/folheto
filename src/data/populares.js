import { allComics } from './comicProfiles.js'

// Ranking demonstrativo, compartilhado pela Home e pela página de populares.
const ranking = [
  ['neon-yokohama', 312000],
  ['coral', 202000],
  ['herdeiros-do-vento', 156000],
  ['vermelho-absoluto', 128000],
  ['silencio-branco', 97000],
  ['cidade-morta', 86000],
  ['as-brumas-de-kel', 74000],
  ['protocolo-lua', 68000],
  ['o-ultimo-verao-em-lisboa', 53000],
  ['estrada-sem-mapa', 41000],
]

export const popularComics = ranking.map(([slug, readers], index) => ({
  ...allComics.find((comic) => comic.slug === slug),
  position: index + 1,
  genre: allComics.find((comic) => comic.slug === slug).genres[0],
  readers: `${readers / 1000} mil`,
}))
