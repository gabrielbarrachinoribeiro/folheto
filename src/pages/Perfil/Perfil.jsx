import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Clock3, Library } from 'lucide-react'
import { allComics } from '../../data/comicProfiles.js'
import Preferencias from './Preferencias.jsx'

const stats = [
  { label: 'Obras na estante', value: 9, icon: Library },
  { label: 'Capítulos lidos', value: 31, icon: BookOpen },
  { label: 'Sessões', value: 5, icon: Clock3 },
]
const genres = [
  { name: 'Mistério', count: 6 },
  { name: 'Ficção científica', count: 3 },
  { name: 'Terror', count: 3 },
  { name: 'Ação', count: 2 },
]
const history = [
  { slug: 'vermelho-absoluto', chapter: 1, date: '2026-11-12' },
  { slug: 'neon-yokohama', chapter: 12, date: '2026-11-08' },
  { slug: 'as-brumas-de-kel', chapter: 3, date: '2026-11-07' },
  { slug: 'coral', chapter: 1, date: '2026-11-05' },
  { slug: 'neon-yokohama', chapter: 11, date: '2026-11-03' },
]

export default function Perfil() {
  const [showAll, setShowAll] = useState(false)
  useEffect(() => {
    document.title = 'Meu perfil · Folheto'
    return () => { document.title = 'Folheto' }
  }, [])

  return (
    <main className="text-zinc-100 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-amber-300 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-amber-300">
      <div className="container mx-auto px-6 py-10 sm:py-16 lg:py-20">
        <a href="/" className="inline-flex items-center gap-2 rounded text-sm text-zinc-400 hover:text-amber-300"><ArrowLeft className="size-4" aria-hidden="true" />Voltar para a Home</a>
        <header className="mt-10 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:items-center">
          <span aria-hidden="true" className="flex size-24 shrink-0 items-center justify-center rounded-2xl border border-amber-300/30 bg-amber-300/10 text-3xl font-semibold text-amber-300">LE</span>
          <div><p className="text-sm font-medium text-amber-300">Meu perfil</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Leitora Folheto</h1><p className="mt-3 text-sm text-zinc-400">@leitora <span aria-hidden="true">·</span> membro desde 2024</p></div>
          <a href="/biblioteca" className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-zinc-700 px-5 py-3 text-sm font-medium transition-colors hover:border-amber-300 hover:text-amber-300 sm:ml-auto sm:self-auto"><Library className="size-4" aria-hidden="true" />Minha biblioteca</a>
        </header>

        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => <div key={label} className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"><Icon className="size-6 shrink-0 text-amber-300" aria-hidden="true" /><div className="flex flex-col"><dt className="order-2 mt-1 text-sm text-zinc-400">{label}</dt><dd className="text-3xl font-semibold tabular-nums">{value}</dd></div></div>)}
        </dl>
        <p className="mt-3 text-xs text-zinc-500">Estatísticas e histórico demonstrativos.</p>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-3 lg:gap-8">
          <section aria-labelledby="genres-title" className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
            <h2 id="genres-title" className="text-2xl font-semibold tracking-tight">Gêneros mais lidos</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">As histórias que mais aparecem nas suas leituras.</p>
            <ul className="mt-7 space-y-5">
              {genres.map(({ name, count }) => <li key={name}><a href={`/catalogo?genero=${encodeURIComponent(name)}`} className="group block rounded"><div className="flex items-center justify-between gap-3 text-sm"><span className="group-hover:text-amber-300">{name}</span><span className="text-xs tabular-nums text-zinc-400">{count}</span></div><progress aria-label={`${name}: ${count} leituras`} value={count} max={6} className="mt-3 block h-1.5 w-full appearance-none overflow-hidden rounded-full border-0 bg-zinc-800 text-amber-300 [&::-webkit-progress-bar]:bg-zinc-800 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-amber-300 [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-amber-300" /></a></li>)}
            </ul>
          </section>
          <div className="lg:col-span-2"><Preferencias /></div>
        </div>

        <section aria-labelledby="history-title" className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4"><h2 id="history-title" className="text-2xl font-semibold tracking-tight">Histórico recente</h2><button type="button" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll} aria-controls="reading-history" className="inline-flex cursor-pointer items-center gap-2 rounded text-sm font-medium text-amber-300 hover:text-amber-200">{showAll ? 'Mostrar menos' : 'Ver tudo'}<ArrowRight className="size-4" aria-hidden="true" /></button></div>
          <ul id="reading-history" className="mt-6 divide-y divide-zinc-800">
            {(showAll ? history : history.slice(0, 4)).map((entry) => {
              const comic = allComics.find((item) => item.slug === entry.slug)
              return <li key={`${entry.slug}:${entry.chapter}`}><a href={`/quadrinhos/${entry.slug}`} className="group flex items-center gap-4 rounded-lg py-4 transition-colors hover:bg-white/5 sm:px-3"><img src={comic.cover} alt={`Capa de ${comic.title}`} loading="lazy" className="h-16 w-11 shrink-0 rounded border border-zinc-700 object-cover" /><div className="min-w-0 flex-1"><h3 className="text-sm font-semibold group-hover:text-amber-300">{comic.title}</h3><p className="mt-2 text-xs leading-relaxed text-zinc-400">Cap. {entry.chapter} · <time dateTime={entry.date}>{new Date(`${entry.date}T12:00:00-03:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Sao_Paulo' })}</time></p></div><ArrowRight className="size-4 shrink-0 text-zinc-500 group-hover:text-amber-300" aria-hidden="true" /></a></li>
            })}
          </ul>
        </section>
      </div>
    </main>
  )
}
