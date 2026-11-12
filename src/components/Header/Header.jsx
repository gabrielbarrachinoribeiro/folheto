import { useEffect, useRef, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'

const navigation = [
  { label: 'Explorar', href: '/explorar' },
  { label: 'Biblioteca', href: '/biblioteca' },
  { label: 'Categorias', href: '/categorias' },
  { label: 'Favoritos', href: '/favoritos' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 64rem)').matches)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 64rem)')
    function handleResize() {
      setIsDesktop(media.matches)
      if (media.matches) setIsMenuOpen(false)
    }
    media.addEventListener('change', handleResize)
    return () => media.removeEventListener('change', handleResize)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const wasScrollLocked = document.body.classList.contains('overflow-hidden')
    document.body.classList.add('overflow-hidden')
    closeButtonRef.current?.focus()
    return () => {
      if (!wasScrollLocked) document.body.classList.remove('overflow-hidden')
    }
  }, [isMenuOpen])

  function closeMenu() {
    setIsMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/5 bg-[#101017] text-zinc-100"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isMenuOpen) {
          closeMenu()
          menuButtonRef.current?.focus()
        }
      }}
    >
      <div className="container mx-auto flex flex-wrap items-center gap-x-8 gap-y-4 px-6 py-4 lg:flex-nowrap">
        <a
          href="/"
          className="shrink-0 rounded-lg text-2xl font-semibold tracking-tight transition-colors hover:text-[#f1c84b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1c84b]"
        >
          Folheto
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="header-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="ml-auto rounded-xl border border-zinc-700 p-2.5 text-zinc-200 transition-colors hover:border-[#f1c84b] hover:text-[#f1c84b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1c84b] lg:hidden"
        >
          {isMenuOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
        </button>

        <div
          id="header-menu"
          ref={panelRef}
          role={isDesktop ? undefined : 'dialog'}
          aria-modal={!isDesktop && isMenuOpen ? true : undefined}
          aria-label={isDesktop ? undefined : 'Menu principal'}
          inert={!isDesktop && !isMenuOpen ? true : undefined}
          onKeyDown={(event) => {
            if (event.key !== 'Tab' || isDesktop || !isMenuOpen) return
            const elements = panelRef.current.querySelectorAll('a[href], button, input')
            const first = elements[0]
            const last = elements[elements.length - 1]
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault()
              last?.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault()
              first?.focus()
            }
          }}
          className={`${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} fixed inset-0 z-50 flex min-w-0 flex-col gap-6 overflow-y-auto bg-zinc-800 px-6 py-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none lg:static lg:z-auto lg:w-auto lg:flex-1 lg:translate-x-0 lg:flex-row lg:items-center lg:gap-6 lg:overflow-visible lg:bg-transparent lg:p-0`}
        >
        <div className="flex items-center justify-between border-b border-white/10 pb-4 lg:hidden">
          <a href="/" onClick={closeMenu} className="rounded-lg text-2xl font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1c84b]">Folheto</a>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMenu}
            aria-label="Fechar menu"
            className="rounded-xl border border-zinc-600 p-2.5 text-zinc-200 transition-colors hover:border-[#f1c84b] hover:text-[#f1c84b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1c84b]"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
        </div>
        <nav aria-label="Navegação principal" className="lg:shrink-0">
          <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-6">
            {navigation.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-[#f1c84b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1c84b] lg:px-0 lg:py-1 lg:text-zinc-400 lg:hover:bg-transparent"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <form action="/buscar" role="search" onSubmit={closeMenu} className="flex min-w-0 w-full items-center gap-3 rounded-xl border border-zinc-700/70 bg-white/2 px-4 py-2.5 transition-colors focus-within:border-[#f1c84b] lg:ml-auto lg:flex-1">
          <Search aria-hidden="true" className="size-4 shrink-0 text-zinc-500" />
          <label htmlFor="header-search" className="sr-only">Buscar título ou autor</label>
          <input
            id="header-search"
            name="q"
            type="search"
            placeholder="Buscar título ou autor"
            className="min-w-0 w-full bg-transparent text-base text-zinc-100 outline-none placeholder:text-zinc-500"
          />
        </form>

        <div className="flex shrink-0 items-center gap-2">
          <a href="/entrar" onClick={closeMenu} className="flex-1 rounded-xl border border-zinc-700 px-4 py-2.5 text-center text-base font-medium text-zinc-200 transition-colors hover:border-[#f1c84b] hover:text-[#f1c84b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1c84b] lg:flex-none">
            Entrar
          </a>
          <a href="/criar-conta" onClick={closeMenu} className="flex-1 whitespace-nowrap rounded-xl bg-[#f1c84b] px-4 py-2.5 text-center text-base font-semibold text-[#101017] transition-colors hover:bg-[#f1c84b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1c84b] lg:flex-none">
            Criar conta
          </a>
        </div>
        </div>
      </div>
    </header>
  )
}
