export function normalizeText(value = '') {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim()
}

export function filterComics(comics, { query = '', genre = '', format = '', publisher = '' } = {}) {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean)
  return comics.filter((comic) => {
    const text = normalizeText([comic.title, comic.author, comic.artist, comic.publisher].filter(Boolean).join(' '))
    return terms.every((term) => text.includes(term)) &&
      (!genre || comic.genres.some((item) => normalizeText(item) === normalizeText(genre))) &&
      (!format || comic.format === format) &&
      (!publisher || normalizeText(comic.publisher).replace(/\s+/g, '-') === normalizeText(publisher))
  })
}
