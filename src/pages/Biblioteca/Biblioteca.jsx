import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Library, Search, Star } from 'lucide-react'
import { allComics } from '../../data/comicProfiles.js'
import { readings } from '../../data/readings.js'
import { filterComics } from '../Catalogo/filters.js'

function getSavedComics() {
  return allComics.filter((comic) => {
    try { return localStorage.getItem(`folheto:biblioteca:${comic.slug}`) === 'true' }
    catch { return false }
  })
}

export default function Biblioteca() {
  const [saved, setSaved] = useState(getSavedComics)
  const [query, setQuery] = useState('')
  const filtered = filterComics(saved, { query })

  useEffect(() => {
    document.title = 'Minha biblioteca · Folheto'
    const sync = () => setSaved(getSavedComics())
    window.addEventListener('storage', sync)
    window.addEventListener('focus', sync)
    return () => {
      document.title = 'Folheto'
      window.removeEventListener('storage', sync)
      window.removeEventListener('focus', sync)
    }
  }, [])

  return (
    <main className="text-zinc-100 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-amber-300 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-amber-300">
      <div className="container mx-auto px-6 py-10 sm:py-16 lg:py-20">
        <a href="/" className="inline-flex items-center gap-2 rounded text-sm text-zinc-400 transition-colors hover:text-amber-300"><ArrowLeft className="size-4" aria-hidden="true" />Voltar para a Home</a>
        <header className="mt-10 sm:mt-12">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-amber-300"><Library className="size-4" aria-hidden="true" />Sua estante</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Minha biblioteca</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">Suas histórias, todas em um lugar. Continue de onde parou ou escolha sua próxima leitura.</p>
        </header>

        <section aria-labelledby="library-continue-title" className="mt-12">
          <h2 id="library-continue-title" className="text-2xl font-semibold tracking-tight">Continue lendo</h2>
          <p className="mt-3 text-sm text-zinc-400">Retome exatamente do painel onde você parou.</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {readings.map((reading) => (
              <li key={reading.slug} className="min-w-0">
                <a href={`/ler/${reading.slug}/${reading.chapter}?pagina=${reading.page}`} className="group flex h-full gap-4 rounded-xl border border-zinc-700/70 bg-zinc-800/60 p-4 transition-colors hover:border-amber-300/60 hover:bg-zinc-800">
                  <img src={reading.cover} alt={`Capa de ${reading.title}`} loading="lazy" className="h-28 w-18 shrink-0 rounded-md border border-zinc-700 object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="text-base leading-tight font-semibold group-hover:text-amber-300">{reading.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">Cap. {reading.chapter} · {reading.chapterTitle}</p>
                    <div className="mt-auto pt-5">
                      <progress value={reading.page} max={reading.totalPages} aria-label={`Progresso de ${reading.title}`} className="block h-1 w-full appearance-none overflow-hidden rounded-full border-0 bg-zinc-700 text-amber-300 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-zinc-700 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-amber-300 [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-amber-300" />
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="text-zinc-400">Pág. {reading.page} de {reading.totalPages}</span>
                        <span className="inline-flex items-center gap-1.5 font-medium text-amber-300">Continuar<ArrowRight className="size-3.5" aria-hidden="true" /></span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-zinc-500">Progresso demonstrativo de leitura.</p>
        </section>

        <section aria-labelledby="saved-comics-title" className="mt-12 border-t border-zinc-800 pt-10 lg:mt-16">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 id="saved-comics-title" className="text-2xl font-semibold tracking-tight">Na sua biblioteca</h2>
              <p role="status" className="mt-3 text-sm text-zinc-400">{filtered.length} {filtered.length === 1 ? 'história' : 'histórias'}{query ? ' encontradas' : ' salvas neste navegador'}</p>
            </div>
            {saved.length > 0 && <div className="flex w-full items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900/40 px-4 focus-within:border-amber-300 focus-within:ring-1 focus-within:ring-amber-300 sm:max-w-sm"><Search aria-hidden="true" className="size-4 shrink-0 text-zinc-500" /><label htmlFor="library-search" className="sr-only">Buscar na biblioteca</label><input id="library-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar na sua biblioteca" aria-controls="saved-comics" className="min-w-0 w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-zinc-500" /></div>}
          </div>

          {filtered.length ? (
            <ul id="saved-comics" className="mt-7 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {filtered.map((comic) => <li key={comic.slug} className="min-w-0"><a href={`/quadrinhos/${comic.slug}`} className="group block rounded-xl"><div className="aspect-2/3 overflow-hidden rounded-xl border border-zinc-800 transition-colors group-hover:border-amber-300"><img src={comic.cover} alt={`Capa de ${comic.title}`} loading="lazy" className="h-full w-full object-cover" /></div><div className="mt-4 flex items-start justify-between gap-2"><h3 className="text-base leading-tight font-semibold group-hover:text-amber-300">{comic.title}</h3><span aria-label={`Nota ${comic.rating} de 5`} className="inline-flex shrink-0 items-center gap-1 text-xs text-amber-300"><Star aria-hidden="true" className="size-3.5 fill-current" />{comic.rating}</span></div><p className="mt-2 text-xs text-zinc-400">{comic.genres.join(' · ')}</p><p className="mt-2 text-xs text-zinc-500">{comic.chapters} capítulos</p></a></li>)}
            </ul>
          ) : (
            <div id="saved-comics" className="mt-7 rounded-2xl border border-dashed border-zinc-800 px-6 py-14 text-center">
              <BookOpen className="mx-auto size-9 text-zinc-600" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold">{query ? 'Nenhuma história encontrada' : 'Sua próxima história cabe aqui'}</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">{query ? 'Tente buscar por outro título, autor ou editora.' : 'Explore o catálogo e use “Adicionar à biblioteca” na página de um quadrinho para guardá-lo na sua estante.'}</p>
              {query ? <button type="button" onClick={() => setQuery('')} className="mt-6 cursor-pointer rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-200">Limpar busca</button> : <a href="/catalogo" className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-200">Explorar catálogo<ArrowRight className="size-4" aria-hidden="true" /></a>}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
