import { lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer, Header } from './components'
import CustomCursor from './components/CustomCursor'
import { useLenis } from './hooks/useLenis'

const Home            = lazy(() => import('./pages/Home'))
const About           = lazy(() => import('./pages/About'))
const Services        = lazy(() => import('./pages/Services'))
const CharterPackages = lazy(() => import('./pages/CharterPackages'))
const Destinations    = lazy(() => import('./pages/Destinations'))
const Gallery         = lazy(() => import('./pages/Gallery'))
const Contact         = lazy(() => import('./pages/Contact'))
const NotFound        = lazy(() => import('./pages/NotFound'))

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"                  element={<Home />} />
          <Route path="/about"             element={<About />} />
          <Route path="/services"          element={<Services />} />
          <Route path="/charter-packages"  element={<CharterPackages />} />
          <Route path="/destinations"      element={<Destinations />} />
          <Route path="/gallery"           element={<Gallery />} />
          <Route path="/contact"           element={<Contact />} />
          <Route path="*"                  element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
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
