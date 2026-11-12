import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#101017]">
      <Header />
      <Home/>
      <Footer />
    </div>
  )
}
