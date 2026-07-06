import { useState, useEffect, createContext } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import ModuleGrid from './components/ModuleGrid'
import ModuleDetail from './components/ModuleDetail'
import Bibliography from './components/Bibliography'
import Footer from './components/Footer'

export const TeacherContext = createContext(false)

export default function App() {
  const [openModule, setOpenModule] = useState(null)
  const [teacherMode, setTeacherMode] = useState(false)

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement
      const percent = el.scrollTop / (el.scrollHeight - el.clientHeight) * 100
      const bar = document.getElementById('progressBar')
      if (bar) bar.style.width = percent + '%'
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Escape closes the open module
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setOpenModule(null) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // Lock body scroll when a module is open
  useEffect(() => {
    document.body.style.overflow = openModule ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [openModule])

  // Teacher mode toggles a body class so facilitator panels show everywhere
  useEffect(() => {
    document.body.classList.toggle('teacher', teacherMode)
  }, [teacherMode])

  return (
    <TeacherContext.Provider value={teacherMode}>
      <div className="progress-bar" id="progressBar" />
      <Nav teacherMode={teacherMode} onToggleTeacher={() => setTeacherMode(t => !t)} />
      <Hero onOpenModule={setOpenModule} />
      <Projects />
      <ModuleGrid onOpenModule={setOpenModule} />
      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
        <ModuleDetail key={n} num={n} isOpen={openModule === n} onClose={() => setOpenModule(null)} />
      ))}
      <Bibliography />
      <Footer />
    </TeacherContext.Provider>
  )
}
