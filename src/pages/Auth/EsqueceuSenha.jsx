import AuthLayout, { inputClass, linkClass } from './AuthLayout.jsx'

export default function EsqueceuSenha() {
  return (
    <AuthLayout title="Esqueceu sua senha?" description="Informe o e-mail da sua conta para solicitar um link de recuperação." buttonLabel="Enviar link de recuperação" footer={<a href="/entrar" className={linkClass}>Voltar para entrar</a>}>
      <div><label htmlFor="recovery-email" className="text-sm font-medium">E-mail</label><input id="recovery-email" name="email" type="email" autoComplete="email" required placeholder="voce@exemplo.com" className={inputClass} /></div>
    </AuthLayout>
  )
}
