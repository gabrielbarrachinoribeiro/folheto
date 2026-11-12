import AuthLayout, { inputClass, linkClass } from './AuthLayout.jsx'

export default function Cadastro() {
  return (
    <AuthLayout title="Crie sua conta" description="Organize sua biblioteca e descubra sua próxima leitura." buttonLabel="Criar conta" footer={<>Já tem uma conta? <a href="/entrar" className={linkClass}>Entrar</a></>}>
      <div><label htmlFor="signup-name" className="text-sm font-medium">Nome</label><input id="signup-name" name="name" autoComplete="name" required placeholder="Como você se chama?" className={inputClass} /></div>
      <div><label htmlFor="signup-email" className="text-sm font-medium">E-mail</label><input id="signup-email" name="email" type="email" autoComplete="email" required placeholder="voce@exemplo.com" className={inputClass} /></div>
      <div><label htmlFor="signup-password" className="text-sm font-medium">Senha</label><input id="signup-password" name="password" type="password" autoComplete="new-password" minLength={8} required placeholder="Crie uma senha" aria-describedby="password-hint" className={inputClass} /><p id="password-hint" className="mt-2 text-xs text-zinc-500">Use pelo menos 8 caracteres.</p></div>
    </AuthLayout>
  )
}
