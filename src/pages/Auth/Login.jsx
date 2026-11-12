import AuthLayout, { inputClass, linkClass } from './AuthLayout.jsx'

export default function Login() {
  return (
    <AuthLayout title="Entre na sua conta" description="Sua biblioteca está esperando por você." buttonLabel="Entrar" footer={<>Ainda não tem uma conta? <a href="/criar-conta" className={linkClass}>Criar conta</a></>}>
      <div><label htmlFor="login-email" className="text-sm font-medium">E-mail</label><input id="login-email" name="email" type="email" autoComplete="email" required placeholder="voce@exemplo.com" className={inputClass} /></div>
      <div><label htmlFor="login-password" className="text-sm font-medium">Senha</label><input id="login-password" name="password" type="password" autoComplete="current-password" required placeholder="Digite sua senha" className={inputClass} /></div>
      <div className="flex justify-end"><a href="/esqueceu-senha" className={linkClass}>Esqueceu sua senha?</a></div>
    </AuthLayout>
  )
}
