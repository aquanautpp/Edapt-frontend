import React, { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Dashboard from './components/Dashboard.jsx'
import SingaporeMethod from './components/SingaporeMethod.jsx'
import ProblemOfTheDay from './components/ProblemOfTheDay.jsx'
import AITutorChat from './components/AITutorChat.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'singapore':
        return <SingaporeMethod />
      case 'problem-of-day':
        return <ProblemOfTheDay />
      case 'ai-tutor-chat':
        return <AITutorChat />
      default:
        return <Hero />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {renderPage()}
      
      {/* Navigation for demo */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
        <button 
          onClick={() => setCurrentPage('home')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentPage('dashboard')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
        >
          Dashboard
        </button>
        <button 
          onClick={() => setCurrentPage('singapore')}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
        >
          Método de Singapura
        </button>
        <button 
          onClick={() => setCurrentPage('problem-of-day')}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 transition-colors"
        >
          Problema do Dia
        </button>
        <button 
          onClick={() => setCurrentPage("ai-tutor-chat")}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700 transition-colors"
        >
          Tutor de IA
        </button>
      </div>
    </div>
  )
}

export default App
