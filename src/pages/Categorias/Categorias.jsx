import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, Compass, Heart, Mountain, Orbit, Search, Sparkles, Swords, Ghost } from 'lucide-react'
import { allComics } from '../../data/comicProfiles.js'
import { filterComics } from '../Catalogo/filters.js'

const categories = [
  { name: 'Ação', icon: Swords, description: 'Confrontos intensos e histórias que não deixam você respirar.', color: 'text-orange-300', background: 'bg-orange-300/10' },
  { name: 'Aventura', icon: Compass, description: 'Novos caminhos, grandes jornadas e descobertas inesperadas.', color: 'text-amber-300', background: 'bg-amber-300/10' },
  { name: 'Fantasia', icon: Sparkles, description: 'Mundos impossíveis, magia e lendas esperando por você.', color: 'text-violet-300', background: 'bg-violet-300/10' },
  { name: 'Ficção científica', icon: Orbit, description: 'Outros planetas, futuros distantes e perguntas sem resposta.', color: 'text-sky-300', background: 'bg-sky-300/10' },
  { name: 'Mistério', icon: Search, description: 'Siga as pistas e descubra o que se esconde em cada painel.', color: 'text-teal-300', background: 'bg-teal-300/10' },
  { name: 'Romance', icon: Heart, description: 'Encontros, desencontros e sentimentos que ficam com você.', color: 'text-rose-300', background: 'bg-rose-300/10' },
  { name: 'Terror', icon: Ghost, description: 'Sombras, silêncios e histórias para ler com a luz acesa.', color: 'text-red-300', background: 'bg-red-300/10' },
]

export default function Categorias() {
  useEffect(() => {
    document.title = 'Categorias · Folheto'
    return () => { document.title = 'Folheto' }
  }, [])

  return (
    <main className="text-zinc-100 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-amber-300">
      <div className="container mx-auto px-6 py-10 sm:py-16 lg:py-20">
        <a href="/" className="inline-flex items-center gap-2 rounded text-sm text-zinc-400 transition-colors hover:text-amber-300"><ArrowLeft className="size-4" aria-hidden="true" />Voltar para a Home</a>
        <header className="mt-10 sm:mt-12">
          <p className="text-sm font-medium text-amber-300">Um universo para cada leitor</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Explore por categoria</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">De grandes aventuras a mistérios que prendem até o último painel. Escolha um gênero e descubra sua próxima história.</p>
        </header>

        <section aria-labelledby="categories-title" className="mt-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 id="categories-title" className="text-sm text-zinc-400">{categories.length} categorias para explorar</h2>
            <a href="/catalogo" className="inline-flex items-center gap-2 rounded text-sm font-medium text-amber-300 hover:text-amber-200">Ver catálogo completo<ArrowRight className="size-4" aria-hidden="true" /></a>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ name, icon: Icon, description, color, background }) => {
              const comics = filterComics(allComics, { genre: name })
              return (
                <li key={name} className="min-w-0">
                  <a href={`/catalogo?genero=${encodeURIComponent(name)}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-colors hover:border-zinc-600 hover:bg-zinc-900">
                    <div className="flex items-center justify-between gap-4">
                      <span className={`flex size-12 items-center justify-center rounded-xl ${background} ${color}`}><Icon className="size-6" aria-hidden="true" /></span>
                      <span className="text-xs text-zinc-400">{comics.length} {comics.length === 1 ? 'história' : 'histórias'}</span>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight group-hover:text-amber-300">{name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{description}</p>
                    <div aria-hidden="true" className="mt-auto flex items-end justify-between gap-4 pt-6">
                      <div className="flex -space-x-3">
                        {comics.slice(0, 3).map((comic) => <img key={comic.slug} src={comic.cover} alt="" loading="lazy" className="h-20 w-14 rounded-lg border-2 border-zinc-900 object-cover shadow-sm" />)}
                      </div>
                      <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${background} ${color}`}><ArrowRight className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" /></span>
                    </div>
                    <span className="sr-only">Explorar {name}</span>
                  </a>
                </li>
              )
            })}
            <li>
              <a href="/catalogo" className="group flex h-full flex-col items-start justify-center rounded-2xl border border-dashed border-zinc-700 p-6 transition-colors hover:border-amber-300">
                <Mountain className="size-8 text-amber-300" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">Ainda está decidindo?</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">Todas as histórias estão a um clique. Explore o catálogo e deixe a curiosidade escolher.</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-300">Explorar todas as histórias<ArrowRight className="size-4" aria-hidden="true" /></span>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}
