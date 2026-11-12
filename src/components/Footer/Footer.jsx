const navigation = [
  {
    title: 'Descobrir',
    links: [
      { label: 'Explorar catálogo', href: '/explorar' },
      { label: 'Categorias', href: '/categorias' },
      { label: 'Destaques do editor', href: '/explorar?filtro=destaques' },
    ],
  },
  {
    title: 'Minha conta',
    links: [
      { label: 'Biblioteca', href: '/biblioteca' },
      { label: 'Favoritos', href: '/favoritos' },
      { label: 'Perfil', href: '/perfil' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      <div className="container mx-auto px-6 py-16 lg:py-20">
        <div className="grid gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-16">
          <div className="sm:col-span-2 lg:col-span-2">
            <a
              href="/"
              className="inline-block rounded-lg text-2xl font-semibold tracking-tight text-zinc-100 transition-colors hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Folheto
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Um lugar para descobrir, organizar e ler quadrinhos, mangás, webtoons e graphic novels — do primeiro painel ao último.
            </p>
            <p className="mt-6 text-xs leading-relaxed text-zinc-500">
              Leitura confortável · Progresso salvo automaticamente
            </p>
          </div>

          {navigation.map(({ title, links }) => (
            <nav key={title} aria-label={title} className="lg:last:col-span-2 lg:last:pl-16">
              <h2 className="text-xs font-semibold text-amber-300">{title}</h2>
              <ul className="mt-5 space-y-4">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="rounded text-sm leading-relaxed transition-colors hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-zinc-800 pt-6 text-xs leading-relaxed text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Folheto. Histórias em painéis.</p>
          <p>Catálogo demonstrativo</p>
        </div>
      </div>
    </footer>
  )
}
