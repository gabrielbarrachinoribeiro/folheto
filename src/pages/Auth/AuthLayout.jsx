import { useEffect, useState } from 'react'
import { ArrowLeft, BookOpen } from 'lucide-react'

export const inputClass = 'mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-amber-300 focus:ring-1 focus:ring-amber-300'
export const linkClass = 'rounded text-sm font-medium text-amber-300 transition-colors hover:text-amber-200'

export default function AuthLayout({ title, description, buttonLabel, children, footer }) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    document.title = `${title} · Folheto`
    return () => { document.title = 'Folheto' }
  }, [title])

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12 text-zinc-100 sm:py-16 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-amber-300 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-amber-300">
      <div className="w-full max-w-md">
        <a href="/" className="inline-flex items-center gap-2 rounded text-sm text-zinc-400 transition-colors hover:text-amber-300"><ArrowLeft className="size-4" aria-hidden="true" />Voltar para a Home</a>
        <section aria-labelledby="auth-title" className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
          <a href="/" className="inline-block rounded-lg text-2xl font-semibold tracking-tight text-white hover:text-amber-300">Folheto</a>
          <div className="mt-8 flex size-11 items-center justify-center rounded-xl bg-amber-300/10 text-amber-300"><BookOpen className="size-5" aria-hidden="true" /></div>
          <h1 id="auth-title" className="mt-5 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{description}</p>
          <form className="mt-7 space-y-5" onSubmit={(event) => { event.preventDefault(); event.currentTarget.reset(); setMessage('Esta é uma demonstração visual. Nenhum dado foi enviado.'); }}>
            {children}
            <button type="submit" className="min-h-11 w-full cursor-pointer rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-200">{buttonLabel}</button>
            <p role="status" className="text-sm leading-relaxed text-zinc-400">{message}</p>
          </form>
          <div className="mt-6 border-t border-zinc-800 pt-6 text-center text-sm leading-relaxed text-zinc-400">{footer}</div>
        </section>
      </div>
    </main>
  )
}
