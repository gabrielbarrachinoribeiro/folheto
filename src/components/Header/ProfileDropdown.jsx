import { useEffect, useRef, useState } from 'react'
import { BookOpen, ChevronDown, LogOut, UserRound } from 'lucide-react'

const links = [
  { label: 'Meu perfil', href: '/perfil', icon: UserRound },
  { label: 'Minha biblioteca', href: '/biblioteca', icon: BookOpen },
]

export default function ProfileDropdown({ onNavigate }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function closeOutside(event) {
      if (!containerRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])

  function navigate() {
    setOpen(false)
    onNavigate?.()
  }

  return (
    <div ref={containerRef} className="relative shrink-0"
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.stopPropagation()
          setOpen(false)
          buttonRef.current?.focus()
        }
      }}>
      <button ref={buttonRef} type="button" aria-expanded={open} aria-controls="profile-dropdown" onClick={() => setOpen((value) => !value)} className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 lg:w-auto">
        <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-300 text-sm font-semibold text-zinc-950">LE</span>
        <span>Leitora Folheto</span>
        <ChevronDown aria-hidden="true" className={`ml-auto size-4 text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <nav id="profile-dropdown" aria-label="Menu do perfil" className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-2 shadow-xl lg:absolute lg:right-0 lg:top-full lg:z-50 lg:w-56">
          {links.map(({ label, href, icon: Icon }) => <a key={href} href={href} onClick={navigate} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-amber-300"><Icon className="size-4" aria-hidden="true" />{label}</a>)}
          <div className="my-1 border-t border-zinc-800" />
          <a href="/entrar" onClick={navigate} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-amber-300"><LogOut className="size-4" aria-hidden="true" />Sair</a>
        </nav>
      )}
    </div>
  )
}
