import { AnimatePresence } from 'framer-motion'
import {  Route, Routes, useLocation } from 'react-router-dom'
import About from './pages/About'
import CharterPackages from './pages/CharterPackages'
import Contact from './pages/Contact'
import Destinations from './pages/Destinations'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import Services from './pages/Services'
import NotFound from './pages/NotFound'
import { Footer, Header } from './components'
import CustomCursor from './components/CustomCursor'
import { useLenis } from './hooks/useLenis'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/charter-packages" element={<CharterPackages />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}



export default function App() {
  useLenis()

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-background px-2 flex flex-col">
        <Header />
        <main className="mx-auto w-full pt-[72px] flex-1">
          <AnimatedRoutes />
        </main>
      </div>
      <Footer />
    </>
  )
}
