import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { ArrowRight, CheckCircle, Play, RotateCcw, Lightbulb, Target, Award } from 'lucide-react'
import { Blocks, Image, Calculator, Apple, Plus, Minus } from 'lucide-react'

const SingaporeMethodImproved = ({ onNavigate }) => {
  const [currentStage, setCurrentStage] = useState('concrete')
  const [currentProblem, setCurrentProblem] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [completedStages, setCompletedStages] = useState([])
  const [selectedApples, setSelectedApples] = useState([])
  const [draggedItems, setDraggedItems] = useState([])

  // Problemas progressivos para cada estágio
  const problems = {
    concrete: [
      {
        id: 1,
        title: "Maçãs no Pomar",
        description: "Maria colheu algumas maçãs vermelhas e verdes. Vamos contar juntos!",
        redApples: 5,
        greenApples: 3,
        question: "Quantas maçãs Maria colheu no total?",
        answer: 8,
        hint: "Conte primeiro as maçãs vermelhas, depois as verdes. Some os dois grupos!",
        explanation: "5 maçãs vermelhas + 3 maçãs verdes = 8 maçãs no total"
      },
      {
        id: 2,
        title: "Blocos de Construção",
        description: "João tem blocos azuis e amarelos para construir uma torre.",
        blueBlocks: 7,
        yellowBlocks: 4,
        question: "Quantos blocos João tem para construir?",
        answer: 11,
        hint: "Agrupe os blocos por cor e depois conte todos juntos!",
        explanation: "7 blocos azuis + 4 blocos amarelos = 11 blocos no total"
      }
    ],
    pictorial: [
      {
        id: 1,
        title: "Problema das Balas",
        description: "Ana tem 15 balas. Ela deu 6 balas para seu irmão.",
        total: 15,
        given: 6,
        question: "Quantas balas Ana tem agora?",
        answer: 9,
        hint: "Desenhe uma barra representando todas as balas de Ana. Depois, marque a parte que ela deu.",
        explanation: "15 balas - 6 balas dadas = 9 balas restantes"
      },
      {
        id: 2,
        title: "Comparando Alturas",
        description: "Pedro tem 12 anos e é 8 anos mais velho que sua irmã.",
        pedro: 12,
        difference: 8,
        question: "Quantos anos tem a irmã de Pedro?",
        answer: 4,
        hint: "Use barras para mostrar a idade de Pedro e de sua irmã. A diferença entre elas é 8 anos.",
        explanation: "12 anos - 8 anos de diferença = 4 anos (idade da irmã)"
      }
    ],
    abstract: [
      {
        id: 1,
        title: "Equação Simples",
        description: "Resolva a equação usando os passos matemáticos.",
        equation: "x + 7 = 15",
        question: "Qual é o valor de x?",
        answer: 8,
        hint: "Para isolar x, subtraia 7 de ambos os lados da equação.",
        explanation: "x + 7 = 15 → x = 15 - 7 → x = 8"
      },
      {
        id: 2,
        title: "Problema com Multiplicação",
        description: "Resolva esta equação de multiplicação.",
        equation: "3x = 21",
        question: "Qual é o valor de x?",
        answer: 7,
        hint: "Para isolar x, divida ambos os lados por 3.",
        explanation: "3x = 21 → x = 21 ÷ 3 → x = 7"
      }
    ]
  }

  const stages = {
    concrete: {
      title: 'Concreto',
      description: 'Manipule objetos reais para entender os conceitos matemáticos.',
      icon: Blocks,
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-50'
    },
    pictorial: {
      title: 'Pictórico',
      description: 'Use desenhos e diagramas para visualizar os problemas.',
      icon: Image,
      color: 'bg-blue-100 text-blue-800',
      bgColor: 'bg-blue-50'
    },
    abstract: {
      title: 'Abstrato',
      description: 'Trabalhe com números e símbolos matemáticos.',
      icon: Calculator,
      color: 'bg-purple-100 text-purple-800',
      bgColor: 'bg-purple-50'
    }
  }

  const getCurrentProblem = () => problems[currentStage][currentProblem]

  const handleAnswer = () => {
    const problem = getCurrentProblem()
    const answer = parseInt(userAnswer)
    
    if (answer === problem.answer) {
      setIsCorrect(true)
      if (!completedStages.includes(currentStage)) {
        setCompletedStages([...completedStages, currentStage])
      }
    } else {
      setIsCorrect(false)
      setAttempts(attempts + 1)
    }
  }

  const nextProblem = () => {
    if (currentProblem < problems[currentStage].length - 1) {
      setCurrentProblem(currentProblem + 1)
    } else {
      // Avançar para próximo estágio
      const stageOrder = ['concrete', 'pictorial', 'abstract']
      const currentIndex = stageOrder.indexOf(currentStage)
      if (currentIndex < stageOrder.length - 1) {
        setCurrentStage(stageOrder[currentIndex + 1])
        setCurrentProblem(0)
      }
    }
    resetProblem()
  }

  const resetProblem = () => {
    setUserAnswer('')
    setIsCorrect(null)
    setShowHint(false)
    setAttempts(0)
    setSelectedApples([])
    setDraggedItems([])
  }

  const handleAppleClick = (index, type) => {
    if (currentStage === 'concrete') {
      const newSelected = [...selectedApples]
      const appleId = `${type}-${index}`
      
      if (newSelected.includes(appleId)) {
        newSelected.splice(newSelected.indexOf(appleId), 1)
      } else {
        newSelected.push(appleId)
      }
      
      setSelectedApples(newSelected)
      setUserAnswer(newSelected.length.toString())
    }
  }

  // Componente para estágio concreto
  const ConcreteStage = () => {
    const problem = getCurrentProblem()
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
          <p className="text-gray-600">{problem.description}</p>
        </div>

        {problem.id === 1 && (
          <div className="flex justify-center space-x-8">
            {/* Maçãs vermelhas */}
            <div className="text-center">
              <h4 className="font-medium mb-3 text-red-600">Maçãs Vermelhas</h4>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(problem.redApples)].map((_, i) => (
                  <div
                    key={`red-${i}`}
                    onClick={() => handleAppleClick(i, 'red')}
                    className={`w-12 h-12 cursor-pointer transition-all duration-200 ${
                      selectedApples.includes(`red-${i}`) 
                        ? 'transform scale-110 ring-2 ring-red-400' 
                        : 'hover:scale-105'
                    }`}
                  >
                    <Apple className="w-full h-full text-red-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Maçãs verdes */}
            <div className="text-center">
              <h4 className="font-medium mb-3 text-green-600">Maçãs Verdes</h4>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(problem.greenApples)].map((_, i) => (
                  <div
                    key={`green-${i}`}
                    onClick={() => handleAppleClick(i, 'green')}
                    className={`w-12 h-12 cursor-pointer transition-all duration-200 ${
                      selectedApples.includes(`green-${i}`) 
                        ? 'transform scale-110 ring-2 ring-green-400' 
                        : 'hover:scale-105'
                    }`}
                  >
                    <Apple className="w-full h-full text-green-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {problem.id === 2 && (
          <div className="flex justify-center space-x-8">
            {/* Blocos azuis */}
            <div className="text-center">
              <h4 className="font-medium mb-3 text-blue-600">Blocos Azuis</h4>
              <div className="grid grid-cols-4 gap-1">
                {[...Array(problem.blueBlocks)].map((_, i) => (
                  <div
                    key={`blue-${i}`}
                    onClick={() => handleAppleClick(i, 'blue')}
                    className={`w-8 h-8 bg-blue-400 border-2 border-blue-600 cursor-pointer transition-all duration-200 ${
                      selectedApples.includes(`blue-${i}`) 
                        ? 'transform scale-110 ring-2 ring-blue-400' 
                        : 'hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Blocos amarelos */}
            <div className="text-center">
              <h4 className="font-medium mb-3 text-yellow-600">Blocos Amarelos</h4>
              <div className="grid grid-cols-4 gap-1">
                {[...Array(problem.yellowBlocks)].map((_, i) => (
                  <div
                    key={`yellow-${i}`}
                    onClick={() => handleAppleClick(i, 'yellow')}
                    className={`w-8 h-8 bg-yellow-400 border-2 border-yellow-600 cursor-pointer transition-all duration-200 ${
                      selectedApples.includes(`yellow-${i}`) 
                        ? 'transform scale-110 ring-2 ring-yellow-400' 
                        : 'hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-lg font-medium mb-2">{problem.question}</p>
          <p className="text-sm text-gray-500">Clique nos objetos para contá-los!</p>
        </div>
      </div>
    )
  }

  // Componente para estágio pictórico
  const PictorialStage = () => {
    const problem = getCurrentProblem()
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
          <p className="text-gray-600">{problem.description}</p>
        </div>

        {problem.id === 1 && (
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="font-medium mb-3">Modelo de Barras</h4>
            </div>
            
            {/* Barra total */}
            <div className="flex items-center justify-center">
              <span className="w-20 text-sm mr-3">Total:</span>
              <div className="relative">
                <div className="h-12 bg-blue-300 w-60 border-2 border-blue-500 flex items-center justify-center">
                  <span className="text-lg font-bold">{problem.total} balas</span>
                </div>
              </div>
            </div>

            {/* Barra das balas dadas */}
            <div className="flex items-center justify-center">
              <span className="w-20 text-sm mr-3">Dadas:</span>
              <div className="relative">
                <div className="h-12 bg-red-300 w-24 border-2 border-red-500 flex items-center justify-center">
                  <span className="text-sm font-bold">{problem.given}</span>
                </div>
                <div className="h-12 bg-gray-200 w-36 border-2 border-gray-400 flex items-center justify-center ml-24 -mt-12">
                  <span className="text-sm">?</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                A barra vermelha representa as balas que Ana deu. A parte cinza representa as balas que sobraram.
              </p>
            </div>
          </div>
        )}

        {problem.id === 2 && (
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="font-medium mb-3">Comparação de Idades</h4>
            </div>
            
            {/* Barra do Pedro */}
            <div className="flex items-center justify-center">
              <span className="w-20 text-sm mr-3">Pedro:</span>
              <div className="h-12 bg-blue-300 w-48 border-2 border-blue-500 flex items-center justify-center">
                <span className="text-lg font-bold">{problem.pedro} anos</span>
              </div>
            </div>

            {/* Barra da irmã */}
            <div className="flex items-center justify-center">
              <span className="w-20 text-sm mr-3">Irmã:</span>
              <div className="h-12 bg-pink-300 w-16 border-2 border-pink-500 flex items-center justify-center">
                <span className="text-sm">?</span>
              </div>
              <div className="ml-2 text-sm bg-yellow-200 px-2 py-1 rounded">
                +{problem.difference} anos = Pedro
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                A barra rosa representa a idade da irmã. Somando {problem.difference} anos, chegamos à idade de Pedro.
              </p>
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-lg font-medium">{problem.question}</p>
        </div>
      </div>
    )
  }

  // Componente para estágio abstrato
  const AbstractStage = () => {
    const problem = getCurrentProblem()
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
          <p className="text-gray-600">{problem.description}</p>
        </div>

        <div className="text-center">
          <div className="bg-gray-100 p-6 rounded-lg inline-block">
            <p className="text-2xl font-mono font-bold">{problem.equation}</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg font-medium">{problem.question}</p>
        </div>

        {showHint && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-start">
              <Lightbulb className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Dica:</h4>
                <p className="text-yellow-700 text-sm mt-1">{problem.hint}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const getProgressPercentage = () => {
    const totalStages = Object.keys(stages).length
    const totalProblems = Object.values(problems).flat().length
    const currentProgress = completedStages.length * (100 / totalStages)
    return Math.min(currentProgress, 100)
  }

  return (
    <div className={`min-h-screen py-8 ${stages[currentStage].bgColor}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Método de Singapura Interativo</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprenda matemática através da progressão Concreto → Pictórico → Abstrato
          </p>
          
          {/* Barra de progresso */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progresso Geral</span>
              <span>{Math.round(getProgressPercentage())}%</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>
        </div>

        {/* Navegação entre estágios */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm border">
            {Object.entries(stages).map(([key, stage], index) => (
              <div key={key} className="flex items-center">
                <Button
                  variant={currentStage === key ? 'default' : 'ghost'}
                  onClick={() => {
                    setCurrentStage(key)
                    setCurrentProblem(0)
                    resetProblem()
                  }}
                  className="flex items-center space-x-2"
                  disabled={index > 0 && !completedStages.includes(Object.keys(stages)[index - 1])}
                >
                  <stage.icon className="h-4 w-4" />
                  <span>{stage.title}</span>
                  {completedStages.includes(key) && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </Button>
                {index < Object.keys(stages).length - 1 && (
                  <ArrowRight className="h-4 w-4 text-gray-400 mx-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conteúdo principal */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {React.createElement(stages[currentStage].icon, { className: 'h-6 w-6' })}
                <CardTitle className="text-2xl">
                  Estágio {stages[currentStage].title}
                </CardTitle>
                <Badge className={stages[currentStage].color}>
                  Problema {currentProblem + 1} de {problems[currentStage].length}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={resetProblem}
              >
                <RotateCcw className="h-4 w-4 mr-2" /> Reiniciar
              </Button>
            </div>
            <CardDescription className="text-lg">
              {stages[currentStage].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStage === 'concrete' && <ConcreteStage />}
            {currentStage === 'pictorial' && <PictorialStage />}
            {currentStage === 'abstract' && <AbstractStage />}

            {/* Área de resposta */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <label className="text-lg font-medium">Sua resposta:</label>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md text-center text-lg font-bold"
                  placeholder="?"
                />
                <Button onClick={handleAnswer} disabled={!userAnswer}>
                  <Target className="h-4 w-4 mr-2" />
                  Verificar
                </Button>
              </div>

              {/* Feedback */}
              {isCorrect !== null && (
                <div className={`text-center p-4 rounded-lg ${
                  isCorrect 
                    ? 'bg-green-100 border border-green-200' 
                    : 'bg-red-100 border border-red-200'
                }`}>
                  {isCorrect ? (
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                        <span className="text-lg font-bold text-green-800">Correto!</span>
                      </div>
                      <p className="text-green-700 mb-4">{getCurrentProblem().explanation}</p>
                      <Button onClick={nextProblem} className="bg-green-600 hover:bg-green-700">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        {currentProblem < problems[currentStage].length - 1 ? 'Próximo Problema' : 'Próximo Estágio'}
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-red-700 mb-2">
                        Não está correto. Tente novamente! (Tentativa {attempts + 1})
                      </p>
                      {attempts >= 1 && (
                        <Button
                          variant="outline"
                          onClick={() => setShowHint(true)}
                          className="text-yellow-600 border-yellow-300"
                        >
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Ver Dica
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Dica */}
              {showHint && currentStage !== 'abstract' && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Dica:</h4>
                      <p className="text-yellow-700 text-sm mt-1">{getCurrentProblem().hint}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Conquistas */}
        {completedStages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Suas Conquistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                {completedStages.map(stage => (
                  <Badge key={stage} className={stages[stage].color}>
                    {stages[stage].title} Dominado!
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default SingaporeMethodImproved

