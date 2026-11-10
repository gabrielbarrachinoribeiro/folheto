import Header from './components/Header/Header.jsx'
import Hero from './pages/Home/Hero/Hero.jsx'
import ContinueReading from './pages/Home/ContinueReading/ContinueReading.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#101017]">
      <Header />
      <main>
        <Hero />
        <ContinueReading />
      </main>
    </div>
  )
}
