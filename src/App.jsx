import { useState, useEffect, createContext } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Pathways from './components/Pathways'
import { LabsSection, LabOverlay } from './components/Labs'
import Projects from './components/Projects'
import ModuleGrid from './components/ModuleGrid'
import ModuleDetail from './components/ModuleDetail'
import Bibliography from './components/Bibliography'
import Colophon from './components/Colophon'
import Footer from './components/Footer'

export const TeacherContext = createContext(false)

export default function App() {
  const [openModule, setOpenModule] = useState(null)
  const [openLab, setOpenLab] = useState(null)
  const [teacherMode, setTeacherMode] = useState(false)

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

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') { setOpenModule(null); setOpenLab(null) } }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (openModule || openLab) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [openModule, openLab])

  useEffect(() => {
    document.body.classList.toggle('teacher', teacherMode)
  }, [teacherMode])

  const openLabFromAnywhere = (id) => { setOpenModule(null); setOpenLab(id) }

  return (
    <TeacherContext.Provider value={teacherMode}>
      <div className="progress-bar" id="progressBar" />
      <Nav teacherMode={teacherMode} onToggleTeacher={() => setTeacherMode(t => !t)} />
      <Hero onOpenModule={setOpenModule} onOpenLab={openLabFromAnywhere} />
      <Pathways />
      <LabsSection onOpenLab={openLabFromAnywhere} />
      <ModuleGrid onOpenModule={setOpenModule} />
      <Projects />
      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
        <ModuleDetail key={n} num={n} isOpen={openModule === n} onClose={() => setOpenModule(null)} />
      ))}
      <LabOverlay openLab={openLab} onClose={() => setOpenLab(null)} />
      <Bibliography />
      <Colophon />
      <Footer />
    </TeacherContext.Provider>
  )
}
