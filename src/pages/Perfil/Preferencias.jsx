import { useState } from 'react'
import { ArrowLeftRight, Columns2, Moon, PanelTop, ScrollText, Sun } from 'lucide-react'

const storageKey = 'folheto:preferencias-leitura'
const defaults = { mode: 'single', direction: 'ltr', background: 'dark' }
const groups = [
  { key: 'mode', title: 'Modo padrão', options: [
    { value: 'single', label: 'Página única', icon: PanelTop },
    { value: 'double', label: 'Página dupla', icon: Columns2 },
    { value: 'scroll', label: 'Rolagem', icon: ScrollText },
  ] },
  { key: 'direction', title: 'Direção', options: [
    { value: 'ltr', label: 'Esquerda → direita', icon: ArrowLeftRight },
    { value: 'rtl', label: 'Direita → esquerda (mangá)', icon: ArrowLeftRight },
  ] },
  { key: 'background', title: 'Fundo do leitor', options: [
    { value: 'dark', label: 'Escuro', icon: Moon },
    { value: 'light', label: 'Claro', icon: Sun },
  ] },
]

function readPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}')
    return Object.fromEntries(groups.map((group) => [group.key,
      group.options.some((option) => option.value === saved?.[group.key]) ? saved[group.key] : defaults[group.key],
    ]))
  } catch { return defaults }
}

export default function Preferencias() {
  const [preferences, setPreferences] = useState(readPreferences)
  const [message, setMessage] = useState('')

  function update(key, value) {
    const next = { ...preferences, [key]: value }
    setPreferences(next)
    try {
      localStorage.setItem(storageKey, JSON.stringify(next))
      setMessage('Preferências salvas neste navegador.')
    } catch { setMessage('Não foi possível salvar as preferências neste navegador.') }
  }

  return (
    <section aria-labelledby="preferences-title" className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
      <h2 id="preferences-title" className="text-2xl font-semibold tracking-tight">Preferências de leitura</h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">Escolha como você prefere acompanhar suas histórias.</p>
      <div className="mt-7 space-y-7">
        {groups.map((group) => (
          <fieldset key={group.key}>
            <legend className="text-sm font-medium">{group.title}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.options.map(({ value, label, icon: Icon }) => (
                <label key={value} className="relative cursor-pointer">
                  <input type="radio" name={group.key} value={value} checked={preferences[group.key] === value} onChange={() => update(group.key, value)} className="peer sr-only" />
                  <span className="flex min-h-11 items-center gap-2 rounded-xl border border-zinc-700 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-zinc-500 peer-checked:border-amber-300 peer-checked:bg-amber-300/10 peer-checked:text-amber-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-amber-300"><Icon className="size-4 shrink-0" aria-hidden="true" />{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <p role="status" className="mt-6 text-xs leading-relaxed text-zinc-400">{message || 'Suas escolhas ficam salvas neste navegador.'}</p>
    </section>
  )
}
