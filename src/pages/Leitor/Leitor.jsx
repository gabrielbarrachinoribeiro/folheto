import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { allComics, getChapters } from '../../data/comicProfiles.js'
import { clampPage, readerPages } from '../../data/readerPages.js'

export default function Leitor({ slug, chapterNumber }) {
  const comic = allComics.find((item) => item.slug === slug)
  const chapters = comic ? getChapters(comic) : []
  const chapter = chapters.find((item) => item.number === Number(chapterNumber))
  const [page, setPage] = useState(() => clampPage(new URLSearchParams(window.location.search).get('pagina') || 1))
  const touchStart = useRef(null)

  useEffect(() => {
    if (!comic || !chapter) return
    document.title = `${comic.title} · Cap. ${chapter.number} · Folheto`
    return () => { document.title = 'Folheto' }
  }, [comic, chapter?.number])

  useEffect(() => {
    if (!comic || !chapter) return
    const url = new URL(window.location.href)
    url.searchParams.set('pagina', page)
    window.history.replaceState(null, '', url)
  }, [page, comic, chapter?.number])

  useEffect(() => {
    function onKeyDown(event) {
      if (event.target instanceof HTMLElement && (event.target.closest('input, select, textarea, button, a') || event.target.isContentEditable)) return
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault()
        setPage((value) => clampPage(value + (event.key === 'ArrowRight' ? 1 : -1)))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  if (!comic || !chapter) return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-zinc-950 px-6 text-zinc-100">
      <h1 className="text-2xl font-semibold">Capítulo não encontrado</h1>
      <a href={comic ? `/quadrinhos/${comic.slug}` : '/catalogo'} className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950">{comic ? 'Voltar ao quadrinho' : 'Explorar catálogo'}</a>
    </main>
  )

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-amber-300 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-amber-300">
      <header className="border-b border-zinc-800 bg-zinc-900/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href={`/quadrinhos/${slug}`} className="inline-flex items-center gap-2 rounded text-sm text-zinc-300 hover:text-amber-300"><ArrowLeft className="size-4" aria-hidden="true" />Voltar ao quadrinho</a>
          <a href="/" className="rounded text-xl font-semibold tracking-tight hover:text-amber-300">Folheto</a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-8">
        <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div><h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{comic.title}</h1><p className="mt-2 text-sm text-zinc-400">Capítulo {chapter.number} · {chapter.title}</p></div>
          <div className="sm:w-64"><label htmlFor="reader-chapter" className="sr-only">Escolher capítulo</label><select id="reader-chapter" value={chapter.number} onChange={(event) => { window.location.href = `/ler/${slug}/${event.target.value}` }} className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300">{chapters.map((item) => <option key={item.number} value={item.number}>Cap. {item.number} · {item.title}</option>)}</select></div>
        </div>

        <div className="relative flex min-w-0 items-center justify-center rounded-2xl border border-zinc-800 bg-black px-12 py-4 sm:px-20 sm:py-6"
          onTouchStart={(event) => { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY } }}
          onTouchCancel={() => { touchStart.current = null }}
          onTouchEnd={(event) => {
            const start = touchStart.current
            touchStart.current = null
            if (!start) return
            const touch = event.changedTouches[0]
            const dx = touch.clientX - start.x
            const dy = touch.clientY - start.y
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) setPage((value) => clampPage(value + (dx < 0 ? 1 : -1)))
          }}>
          <button type="button" aria-label="Página anterior" disabled={page === 1} onClick={() => setPage((value) => clampPage(value - 1))} className="absolute left-1 flex size-10 cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-white transition-colors hover:border-amber-300 hover:text-amber-300 disabled:cursor-default disabled:opacity-25 sm:left-4 sm:size-12"><ChevronLeft className="size-6" aria-hidden="true" /></button>
          <img src={readerPages[page - 1]} alt={`Página de exemplo ${page} de ${readerPages.length}`} className="block h-auto max-h-screen w-auto max-w-full rounded object-contain" draggable="false" />
          <button type="button" aria-label="Próxima página" disabled={page === readerPages.length} onClick={() => setPage((value) => clampPage(value + 1))} className="absolute right-1 flex size-10 cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-white transition-colors hover:border-amber-300 hover:text-amber-300 disabled:cursor-default disabled:opacity-25 sm:right-4 sm:size-12"><ChevronRight className="size-6" aria-hidden="true" /></button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p role="status" className="text-sm text-zinc-300">Página <span className="font-semibold tabular-nums text-amber-300">{page}</span> de {readerPages.length}</p>
          <div className="flex gap-2" aria-label="Escolher página">{readerPages.map((_, index) => <button key={index} type="button" aria-label={`Ir para a página ${index + 1}`} aria-current={page === index + 1 ? 'page' : undefined} onClick={() => setPage(index + 1)} className={`flex size-10 cursor-pointer items-center justify-center rounded-lg border text-sm tabular-nums transition-colors ${page === index + 1 ? 'border-amber-300 bg-amber-300 text-zinc-950' : 'border-zinc-700 text-zinc-400 hover:border-amber-300 hover:text-amber-300'}`}>{index + 1}</button>)}</div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-zinc-500">Imagens de exemplo · Use as setas ou deslize para os lados para passar uma página por vez.</p>

        {page === readerPages.length && <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5"><p className="text-sm text-zinc-300">Você chegou ao fim deste capítulo.</p><a href={chapter.number < comic.chapters ? `/ler/${slug}/${chapter.number + 1}` : `/quadrinhos/${slug}`} className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-200">{chapter.number < comic.chapters ? 'Próximo capítulo' : 'Voltar ao quadrinho'}<ArrowRight className="size-4" aria-hidden="true" /></a></div>}
      </main>
    </div>
  )
}
