import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Search, SlidersHorizontal, Star, X } from 'lucide-react'
import { allComics } from '../../data/comicProfiles.js'
import { filterComics } from './filters.js'

const genres = [...new Set(allComics.flatMap((comic) => comic.genres))].sort((a, b) => a.localeCompare(b, 'pt-BR'))
const formats = [...new Set(allComics.map((comic) => comic.format))]

export default function Catalogo() {
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('q') || '')
  const [genre, setGenre] = useState(() => new URLSearchParams(window.location.search).get('genero') || '')
  const [format, setFormat] = useState('')
  const [publisher, setPublisher] = useState(() => new URLSearchParams(window.location.search).get('editora') || '')
  const filtered = filterComics(allComics, { query, genre, format, publisher })
  const hasFilters = Boolean(query || genre || format || publisher)

  useEffect(() => {
    document.title = 'Catálogo completo · Folheto'
    return () => { document.title = 'Folheto' }
  }, [])

  function clearFilters() {
    setQuery('')
    setGenre('')
    setFormat('')
    setPublisher('')
  }

  return (
    <main className="text-zinc-100 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-amber-300 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-amber-300">
      <div className="container mx-auto px-6 py-10 sm:py-16 lg:py-20">
        <a href="/" className="inline-flex items-center gap-2 rounded text-sm text-zinc-400 transition-colors hover:text-amber-300"><ArrowLeft className="size-4" aria-hidden="true" />Voltar para a Home</a>
        <header className="mt-10 sm:mt-12">
          <p className="text-sm font-medium text-amber-300">Sua próxima história começa aqui</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Catálogo completo</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">Explore quadrinhos, mangás e webtoons. Busque uma história ou combine os filtros para encontrar um novo universo.</p>
        </header>

        <section aria-label="Busca e filtros do catálogo" className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6">
          <div className="grid items-end gap-5 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label htmlFor="catalog-search" className="text-sm font-medium">Buscar no catálogo</label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 focus-within:border-amber-300 focus-within:ring-1 focus-within:ring-amber-300">
                <Search className="size-5 shrink-0 text-zinc-500" aria-hidden="true" />
                <input id="catalog-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por título, autor ou editora" aria-controls="full-catalog-results" className="min-w-0 w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-zinc-500" />
              </div>
            </div>
            <div>
              <label htmlFor="catalog-format" className="text-sm font-medium">Formato</label>
              <select id="catalog-format" value={format} onChange={(event) => setFormat(event.target.value)} aria-controls="full-catalog-results" className="mt-2 min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300">
                <option value="">Todos os formatos</option>
                {formats.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <fieldset className="mt-6 border-t border-zinc-800 pt-5">
            <legend className="sr-only">Filtrar por gênero</legend>
            <p className="mb-4 flex items-center gap-2 text-sm font-medium"><SlidersHorizontal className="size-4 text-amber-300" aria-hidden="true" />Gêneros</p>
            <div className="flex flex-wrap gap-2">
              {['', ...genres].map((item) => <button key={item} type="button" aria-pressed={genre === item} aria-controls="full-catalog-results" onClick={() => setGenre(item)} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${genre === item ? 'border-amber-300 bg-amber-300 text-zinc-950' : 'border-zinc-700 text-zinc-300 hover:border-amber-300 hover:text-amber-300'}`}>{item || 'Todos'}</button>)}
            </div>
          </fieldset>
          {publisher && <p className="mt-4 text-sm text-zinc-400">Editora: {publisher.replaceAll('-', ' ')}</p>}
        </section>

        <section aria-labelledby="catalog-results-title" className="mt-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 id="catalog-results-title" role="status" className="text-sm text-zinc-400">{filtered.length} {filtered.length === 1 ? 'história encontrada' : 'histórias encontradas'}</h2>
            {hasFilters && <button type="button" onClick={clearFilters} className="inline-flex cursor-pointer items-center gap-2 rounded text-sm text-amber-300 hover:text-amber-200"><X className="size-4" aria-hidden="true" />Limpar filtros</button>}
          </div>
          {filtered.length ? (
            <ul id="full-catalog-results" className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {filtered.map((comic) => (
                <li key={comic.slug} className="min-w-0">
                  <a href={`/quadrinhos/${comic.slug}`} className="group flex h-full flex-col rounded-xl">
                    <div className="relative aspect-2/3 overflow-hidden rounded-xl border border-zinc-800 transition-colors group-hover:border-amber-300">
                      <img src={comic.cover} alt={`Capa de ${comic.title}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none" />
                      <span className="absolute top-3 left-3 rounded-full border border-white/10 bg-zinc-950/90 px-3 py-1 text-xs text-white">{comic.format}</span>
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-2">
                      <h3 className="text-base leading-tight font-semibold group-hover:text-amber-300">{comic.title}</h3>
                      <span aria-label={`Nota ${comic.rating} de 5`} className="inline-flex shrink-0 items-center gap-1 text-xs text-amber-300"><Star className="size-3.5 fill-current" aria-hidden="true" />{comic.rating}</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">{comic.genres.join(' · ')}</p>
                    <p className="mt-1 text-xs text-zinc-500">{comic.author || comic.publisher}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-medium text-amber-300">Ver detalhes<ArrowUpRight className="size-4" aria-hidden="true" /></span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div id="full-catalog-results" className="rounded-2xl border border-dashed border-zinc-800 px-6 py-16 text-center">
              <Search className="mx-auto size-9 text-zinc-600" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold">Nenhuma história encontrada</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">Tente outro título, autor ou uma combinação diferente de filtros.</p>
              <button type="button" onClick={clearFilters} className="mt-6 cursor-pointer rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-200">Ver todo o catálogo</button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
