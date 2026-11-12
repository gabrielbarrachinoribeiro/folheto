import { useState } from 'react'
import { MessageSquare, Star } from 'lucide-react'

function loadReviews(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(saved) ? saved.filter((review) => (
      typeof review.id === 'string' && typeof review.name === 'string' &&
      typeof review.comment === 'string' && Number.isInteger(review.rating) &&
      review.rating >= 1 && review.rating <= 5 && Number.isFinite(Date.parse(review.date))
    )) : []
  } catch { return [] }
}

export default function Avaliacoes({ slug }) {
  const storageKey = `folheto:avaliacoes:${slug}`
  const [reviews, setReviews] = useState(() => loadReviews(storageKey))
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function submitReview(event) {
    event.preventDefault()
    if (!rating || !name.trim() || !comment.trim()) {
      setError('Escolha uma nota e preencha seu nome e comentário.')
      setMessage('')
      return
    }
    const next = [{
      id: crypto.randomUUID(), name: name.trim(), rating,
      comment: comment.trim(), date: new Date().toISOString(),
    }, ...reviews]
    try {
      localStorage.setItem(storageKey, JSON.stringify(next))
      setMessage('Sua avaliação foi salva neste navegador.')
    } catch {
      setMessage('Sua avaliação foi adicionada, mas não foi possível salvá-la neste navegador.')
    }
    setReviews(next)
    setName('')
    setComment('')
    setRating(0)
    setError('')
  }

  return (
    <section aria-labelledby="reviews-title" className="mt-16 border-t border-zinc-800 pt-12 lg:mt-20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="reviews-title" className="text-2xl font-semibold tracking-tight">Avaliações e comentários</h2>
        <span className="text-xs text-zinc-400">{reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">O que você achou dessa história? Deixe sua nota e compartilhe sua opinião.</p>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
        <form onSubmit={submitReview} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6">
          <fieldset>
            <legend className="text-sm font-medium text-white">Sua nota</legend>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="relative cursor-pointer rounded-lg p-2 transition-colors hover:bg-white/5">
                    <input type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} required className="peer sr-only" />
                    <span className="sr-only">{value} {value === 1 ? 'estrela' : 'estrelas'}</span>
                    <Star aria-hidden="true" className={`size-6 rounded peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-amber-300 ${value <= rating ? 'fill-amber-300 text-amber-300' : 'text-zinc-500'}`} />
                  </label>
                ))}
              </div>
              <span className="text-xs text-zinc-400">{rating ? `${rating} de 5` : 'Escolha de 1 a 5'}</span>
            </div>
          </fieldset>
          <label htmlFor="review-name" className="mt-6 block text-sm font-medium">Seu nome</label>
          <input id="review-name" name="name" autoComplete="nickname" required maxLength={60} value={name} onChange={(event) => setName(event.target.value)} placeholder="Como você quer aparecer?" className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-amber-300 focus:ring-1 focus:ring-amber-300" />
          <label htmlFor="review-comment" className="mt-5 block text-sm font-medium">Seu comentário</label>
          <textarea id="review-comment" name="comment" required rows={4} maxLength={1500} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Conte o que achou, sem spoilers…" className="mt-2 w-full resize-y rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-3 text-sm leading-relaxed text-white outline-none placeholder:text-zinc-500 focus:border-amber-300 focus:ring-1 focus:ring-amber-300" />
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">As avaliações ficam salvas apenas neste navegador.</p>
          {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
          <p role="status" className="mt-3 text-sm text-amber-300">{message}</p>
          <button type="submit" className="mt-4 inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-200"><MessageSquare aria-hidden="true" className="size-4" />Enviar avaliação</button>
        </form>

        <div>
          <h3 className="text-base font-semibold">O que os leitores estão dizendo</h3>
          {reviews.length ? (
            <ul className="mt-5 space-y-4">
              {reviews.map((review) => (
                <li key={review.id}>
                  <article className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold wrap-anywhere">{review.name}</h4>
                        <time dateTime={review.date} className="mt-1 block text-xs text-zinc-500">{new Date(review.date).toLocaleDateString('pt-BR')}</time>
                      </div>
                      <span aria-label={`Nota ${review.rating} de 5`} className="inline-flex items-center gap-1 text-xs font-medium text-amber-300"><Star aria-hidden="true" className="size-4 fill-current" />{review.rating} de 5</span>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed wrap-anywhere text-zinc-300">{review.comment}</p>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-zinc-800 px-6 py-10 text-center">
              <MessageSquare aria-hidden="true" className="mx-auto size-8 text-zinc-600" />
              <p className="mt-4 text-sm font-medium text-zinc-200">A conversa começa com você</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">Deixe a primeira avaliação desta história neste navegador.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
