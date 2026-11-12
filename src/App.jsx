import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import Quadrinho from './pages/Quadrinho/Quadrinho.jsx'
import Populares from './pages/Populares/Populares.jsx'
import Catalogo from './pages/Catalogo/Catalogo.jsx'
import Categorias from './pages/Categorias/Categorias.jsx'
import Biblioteca from './pages/Biblioteca/Biblioteca.jsx'
import Perfil from './pages/Perfil/Perfil.jsx'
import Leitor from './pages/Leitor/Leitor.jsx'
import Login from './pages/Auth/Login.jsx'
import Cadastro from './pages/Auth/Cadastro.jsx'
import EsqueceuSenha from './pages/Auth/EsqueceuSenha.jsx'

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '')
  const authPages = { '/entrar': Login, '/login': Login, '/criar-conta': Cadastro, '/cadastro': Cadastro, '/esqueceu-senha': EsqueceuSenha }
  const AuthPage = authPages[path]
  const comicRoute = window.location.pathname.match(/^\/quadrinhos\/([^/]+)\/?$/)
  const readerRoute = window.location.pathname.match(/^\/ler\/([^/]+)\/(\d+)\/?$/)
  const isPopularPage = /^\/populares\/?$/.test(window.location.pathname)
  const isCatalogPage = /^\/(catalogo|explorar|buscar)\/?$/.test(window.location.pathname)
  const isCategoriesPage = /^\/categorias\/?$/.test(window.location.pathname)
  const isLibraryPage = /^\/biblioteca\/?$/.test(window.location.pathname)
  const isProfilePage = /^\/perfil\/?$/.test(window.location.pathname)
  if (AuthPage) return <div className="min-h-screen bg-[#101017]"><AuthPage /></div>
  if (readerRoute) return <Leitor key={`${readerRoute[1]}:${readerRoute[2]}`} slug={readerRoute[1]} chapterNumber={readerRoute[2]} />
  return (
    <div className="min-h-screen bg-[#101017]">
      <Header />
      {comicRoute ? <Quadrinho slug={comicRoute[1]} /> : isPopularPage ? <Populares /> : isCategoriesPage ? <Categorias /> : isLibraryPage ? <Biblioteca /> : isProfilePage ? <Perfil /> : isCatalogPage ? <Catalogo /> : <Home />}
      <Footer />
    </div>
  )
}
