import page1 from '../assets/pag1.png'
import page2 from '../assets/pag2.png'
import page3 from '../assets/pag3.png'

// Imagens demonstrativas compartilhadas por todos os capítulos.
export const readerPages = [page1, page2, page3]

export function clampPage(value) {
  const page = Number(value)
  return Number.isInteger(page) ? Math.min(readerPages.length, Math.max(1, page)) : 1
}
