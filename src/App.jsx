// src/App.jsx
import { useState } from 'react'
import Hero from './components/Hero.jsx'
import Dashboard from './components/Dashboard.jsx'
import SingaporeMethodImproved from './components/SingaporeMethodImproved.jsx'
import ProblemOfTheDay from './components/ProblemOfTheDay.jsx'
import AITutorChat from './components/AITutorChat.jsx'
import AlgebraExercises from './components/AlgebraExercises.jsx'
import VisualTextInterpretation from './components/VisualTextInterpretation.jsx'
import FractionsSingapore from './components/FractionsSingapore.jsx'
import { Home, Trophy, Brain, Target, MessageCircle, X, Menu } from 'lucide-react'
import './styles/curio-theme.css'

function App () {
  // Seção ativa da aplicação (dashboard por padrão)
  const [activeSection, setActiveSection] = useState('dashboard')
  
  // Estado para controlar a visibilidade da sidebar no mobile
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Configuração das seções disponíveis
  const sections = [
  {
    id: 'home',
    name: 'Início',
    icon: Home,
    component: Hero
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: Trophy,
    component: () => <Dashboard onNavigate={setActiveSection} />
  },
  {
    id: 'singapore',
    name: 'Método Singapura',
    icon: Brain,
    component: SingaporeMethodImproved
  },
  {
    id: 'problem',
    name: 'Problema do Dia',
    icon: Target,
    component: ProblemOfTheDay
  },
  {
    id: 'tutor',
    name: 'Tutor de IA',
    icon: MessageCircle,
    component: AITutorChat
  },
  {
    id: 'algebra',
    name: 'Exercícios de Álgebra',
    icon: Target,
    component: () => <AlgebraExercises onNavigate={setActiveSection} />
  },
  {
    id: 'text-interpretation',
    name: 'Interpretação de Texto',
    icon: MessageCircle,
    component: () => <VisualTextInterpretation onNavigate={setActiveSection} />
  },
  {
    id: 'fractions',
    name: 'Frações - Singapura',
    icon: Brain,
    component: () => <FractionsSingapore onNavigate={setActiveSection} />
  }
]

  // Encontra o componente atual a partir da seção selecionada
  const CurrentComponent =
    sections.find(s => s.id === activeSection)?.component || Dashboard

  // Renderização principal
  return (
    <div className='flex h-screen'>
      {/* Sidebar visível em telas médias/grandes (≥640px) */}
      <div className='hidden sm:flex sm:flex-col sm:w-64 sidebar'>
        <div className='flex items-center justify-center h-16 bg-curio-orange'>
          <h1 className='text-xl font-bold text-curio-cream'>Curió</h1>
        </div>
        <nav className='flex-1 px-2 py-4 space-y-2'>
          {sections.map(section => {
            const Icon = section.icon
            const active = activeSection === section.id
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center p-3 w-full text-left rounded-lg transition-all duration-200 ${
                  active 
                    ? 'bg-curio-orange text-curio-cream shadow-md' 
                    : 'text-curio-cream hover:bg-curio-orange/20'
                }`}
              >
                <Icon className='h-5 w-5 mr-3' />
                {section.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Sidebar mobile (visível apenas em telas pequenas quando sidebarOpen é true) */}
      {sidebarOpen && (
        <div className='sm:hidden fixed inset-0 z-50 flex'>
          <div
            className='absolute inset-0 bg-black/50'
            onClick={() => setSidebarOpen(false)}
          />
          <aside className='relative flex flex-col w-64 sidebar'>
            <div className='flex items-center justify-between h-16 px-4 bg-curio-orange'>
              <h1 className='text-xl font-bold text-curio-cream'>Curió</h1>
              <button onClick={() => setSidebarOpen(false)}>
                <X className='h-5 w-5 text-curio-cream' />
              </button>
            </div>
            <nav className='flex-1 px-2 py-4 space-y-2'>
              {sections.map(section => {
                const Icon = section.icon
                const active = activeSection === section.id
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id)
                      setSidebarOpen(false)
                    }}
                    className={`flex items-center p-3 w-full text-left rounded-lg transition-all duration-200 ${
                      active 
                        ? 'bg-curio-orange text-curio-cream shadow-md' 
                        : 'text-curio-cream hover:bg-curio-orange/20'
                    }`}
                  >
                    <Icon className='h-5 w-5 mr-3' />
                    {section.name}
                  </button>
                )
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Conteúdo principal */}
      <main className='flex-1 flex flex-col overflow-y-auto'>
        {/* Cabeçalho com botão para abrir/fechar sidebar no mobile */}
        <header className='flex items-center justify-between px-4 py-3 border-b border-curio-orange bg-curio-cream'>
          <button
            className='sm:hidden p-2 text-curio-orange hover:bg-curio-orange hover:text-curio-cream rounded-lg transition-colors'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </button>
          <h1 className='text-lg font-semibold text-curio-black'>
            {sections.find(s => s.id === activeSection)?.name || 'Curió'}
          </h1>
          {/* Espaço reservado para possíveis ações do usuário (login, avatar etc.) */}
          <div className='flex items-center space-x-2'>
            <span className='hidden sm:inline text-curio-gray'>Victor Pires</span>
          </div>
        </header>

        {/* Componente da seção ativa */}
        <div className='flex-1 p-4 overflow-y-auto'>
          <CurrentComponent />
        </div>
      </main>
    </div>
  )
}

export default App

