import { useEffect } from 'react'
import { ArrowLeft, ArrowUpRight, BookOpen, Star, TrendingUp, Users } from 'lucide-react'
import { popularComics } from '../../data/populares.js'

export default function Populares() {
  useEffect(() => {
    document.title = 'Os 10 mais populares · Folheto'
    return () => { document.title = 'Folheto' }
  }, [])

  return (
    <main className="text-zinc-100 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-amber-300">
      <div className="container mx-auto px-6 py-10 sm:py-16 lg:py-20">
        <a href="/" className="inline-flex items-center gap-2 rounded text-sm text-zinc-400 transition-colors hover:text-amber-300"><ArrowLeft className="size-4" aria-hidden="true" />Voltar para a Home</a>

        <header className="mt-10 border-b border-zinc-800 pb-10 sm:mt-12">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-amber-300"><TrendingUp className="size-4" aria-hidden="true" />Ranking semanal</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">Os 10 mais populares</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">As histórias que estão conquistando os leitores do Folheto. Encontre seu próximo quadrinho entre os destaques da semana.</p>
          <p className="mt-5 text-xs text-zinc-500">Ranking demonstrativo · Ordenado por quantidade de leitores</p>
        </header>

        <section aria-labelledby="ranking-title" className="mt-10">
          <h2 id="ranking-title" className="sr-only">Ranking dos 10 quadrinhos mais populares</h2>
          <ol className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            {popularComics.map((comic) => (
              <li key={comic.slug} className="min-w-0">
                <a href={`/quadrinhos/${comic.slug}`} aria-label={`${comic.position}º lugar: ${comic.title}, ver detalhes`} className="group relative flex h-full gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 transition-colors hover:border-amber-300/60 hover:bg-zinc-900 sm:gap-6 sm:p-6">
                  <div className="relative w-24 shrink-0 self-start sm:w-32">
                    <img src={comic.cover} alt={`Capa de ${comic.title}`} className="aspect-2/3 w-full rounded-lg border border-zinc-700 object-cover" loading={comic.position <= 2 ? 'eager' : 'lazy'} />
                    <span aria-hidden="true" className={`absolute -top-2 -left-2 flex size-9 items-center justify-center rounded-full border text-sm font-bold tabular-nums sm:size-10 ${comic.position <= 3 ? 'border-amber-300 bg-amber-300 text-zinc-950' : 'border-zinc-600 bg-zinc-900 text-white'}`}>{String(comic.position).padStart(2, '0')}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-xs text-zinc-500">{comic.format} · {comic.publisher}</p>
                    <h3 className="mt-2 text-lg leading-tight font-semibold tracking-tight transition-colors group-hover:text-amber-300 sm:text-2xl">{comic.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">{comic.genres.join(' · ')}</p>
                    <p className="mt-3 hidden text-sm leading-relaxed text-zinc-400 sm:line-clamp-2">{comic.description}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                      <span aria-label={`Nota ${comic.rating} de 5`} className="inline-flex items-center gap-1.5 text-amber-300"><Star className="size-3.5 fill-current" aria-hidden="true" />{comic.rating}</span>
                      <span className="inline-flex items-center gap-1.5 text-zinc-400"><Users className="size-3.5" aria-hidden="true" />{comic.readers} leitores</span>
                      <span className="inline-flex items-center gap-1.5 text-zinc-400"><BookOpen className="size-3.5" aria-hidden="true" />{comic.chapters} capítulos</span>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-amber-300">Ver detalhes<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" aria-hidden="true" /></span>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  )
}
