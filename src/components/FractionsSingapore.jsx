import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { ArrowLeft, CheckCircle, ArrowRight, RotateCcw, Lightbulb, Award } from 'lucide-react'
import { Blocks, Image, Calculator } from 'lucide-react'

const FractionsSingapore = ({ onNavigate }) => {
  const [currentStage, setCurrentStage] = useState('concrete')
  const [currentProblem, setCurrentProblem] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [completedStages, setCompletedStages] = useState([])
  const [selectedParts, setSelectedParts] = useState([])

  const problems = {
    concrete: [
      {
        id: 1,
        title: "Dividindo uma Pizza",
        description: "Uma pizza foi dividida em 8 fatias iguais. João comeu 3 fatias.",
        totalParts: 8,
        selectedParts: 3,
        question: "Que fração da pizza João comeu?",
        answer: "3/8",
        hint: "Conte quantas fatias João comeu (numerador) e o total de fatias (denominador).",
        explanation: "João comeu 3 fatias de um total de 8 fatias, então ele comeu 3/8 da pizza."
      },
      {
        id: 2,
        title: "Chocolate Dividido",
        description: "Uma barra de chocolate tem 12 quadradinhos. Maria comeu 5 quadradinhos.",
        totalParts: 12,
        selectedParts: 5,
        question: "Que fração do chocolate Maria comeu?",
        answer: "5/12",
        hint: "O numerador é a quantidade que Maria comeu, o denominador é o total de quadradinhos.",
        explanation: "Maria comeu 5 quadradinhos de um total de 12, então ela comeu 5/12 do chocolate."
      }
    ],
    pictorial: [
      {
        id: 1,
        title: "Comparando Frações",
        description: "Compare as frações 1/2 e 3/4 usando modelos visuais.",
        fractions: [
          { numerator: 1, denominator: 2, color: "#FF6B6B" },
          { numerator: 3, denominator: 4, color: "#4ECDC4" }
        ],
        question: "Qual fração é maior: 1/2 ou 3/4?",
        answer: "3/4",
        hint: "Compare os tamanhos das partes coloridas nos modelos visuais.",
        explanation: "3/4 = 6/8 e 1/2 = 4/8. Como 6/8 > 4/8, então 3/4 > 1/2."
      },
      {
        id: 2,
        title: "Somando Frações",
        description: "Use modelos de barras para somar 1/4 + 2/4.",
        fractions: [
          { numerator: 1, denominator: 4, color: "#FF6B6B" },
          { numerator: 2, denominator: 4, color: "#4ECDC4" }
        ],
        question: "Quanto é 1/4 + 2/4?",
        answer: "3/4",
        hint: "Some os numeradores e mantenha o denominador igual.",
        explanation: "1/4 + 2/4 = (1+2)/4 = 3/4. Quando os denominadores são iguais, somamos apenas os numeradores."
      }
    ],
    abstract: [
      {
        id: 1,
        title: "Operações com Frações",
        description: "Resolva operações com frações usando regras matemáticas.",
        equation: "2/3 + 1/6",
        question: "Qual é o resultado de 2/3 + 1/6?",
        answer: "5/6",
        hint: "Encontre um denominador comum. O MMC de 3 e 6 é 6.",
        explanation: "2/3 = 4/6, então 4/6 + 1/6 = 5/6"
      },
      {
        id: 2,
        title: "Multiplicação de Frações",
        description: "Multiplique frações usando a regra: numerador × numerador e denominador × denominador.",
        equation: "2/3 × 3/4",
        question: "Qual é o resultado de 2/3 × 3/4?",
        answer: "6/12 ou 1/2",
        hint: "Multiplique 2×3 = 6 (numerador) e 3×4 = 12 (denominador). Simplifique se possível.",
        explanation: "2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2"
      }
    ]
  }

  const stages = {
    concrete: {
      title: 'Concreto',
      description: 'Manipule objetos reais para entender frações.',
      icon: Blocks,
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-50'
    },
    pictorial: {
      title: 'Pictórico',
      description: 'Use modelos visuais para trabalhar com frações.',
      icon: Image,
      color: 'bg-blue-100 text-blue-800',
      bgColor: 'bg-blue-50'
    },
    abstract: {
      title: 'Abstrato',
      description: 'Resolva operações com frações simbolicamente.',
      icon: Calculator,
      color: 'bg-purple-100 text-purple-800',
      bgColor: 'bg-purple-50'
    }
  }

  const getCurrentProblem = () => problems[currentStage][currentProblem]

  const handleAnswer = () => {
    const problem = getCurrentProblem()
    
    if (userAnswer.toLowerCase().trim() === problem.answer.toLowerCase().trim()) {
      setIsCorrect(true)
      if (!completedStages.includes(currentStage)) {
        setCompletedStages([...completedStages, currentStage])
      }
    } else {
      setIsCorrect(false)
    }
  }

  const nextProblem = () => {
    if (currentProblem < problems[currentStage].length - 1) {
      setCurrentProblem(currentProblem + 1)
    } else {
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
    setSelectedParts([])
  }

  const handlePartClick = (index) => {
    if (currentStage === 'concrete') {
      const newSelected = [...selectedParts]
      if (newSelected.includes(index)) {
        newSelected.splice(newSelected.indexOf(index), 1)
      } else {
        newSelected.push(index)
      }
      setSelectedParts(newSelected)
      
      const problem = getCurrentProblem()
      setUserAnswer(`${newSelected.length}/${problem.totalParts}`)
    }
  }

  const renderFractionCircle = (numerator, denominator, color, size = 120) => {
    const parts = []
    const anglePerPart = 360 / denominator
    
    for (let i = 0; i < denominator; i++) {
      const startAngle = i * anglePerPart - 90
      const endAngle = (i + 1) * anglePerPart - 90
      
      const x1 = size/2 + (size/2 - 5) * Math.cos(startAngle * Math.PI / 180)
      const y1 = size/2 + (size/2 - 5) * Math.sin(startAngle * Math.PI / 180)
      const x2 = size/2 + (size/2 - 5) * Math.cos(endAngle * Math.PI / 180)
      const y2 = size/2 + (size/2 - 5) * Math.sin(endAngle * Math.PI / 180)
      
      const largeArcFlag = anglePerPart > 180 ? 1 : 0
      
      const pathData = [
        `M ${size/2} ${size/2}`,
        `L ${x1} ${y1}`,
        `A ${size/2 - 5} ${size/2 - 5} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ')
      
      parts.push(
        <path
          key={i}
          d={pathData}
          fill={i < numerator ? color : '#f3f4f6'}
          stroke="#374151"
          strokeWidth="2"
        />
      )
    }
    
    return (
      <svg width={size} height={size} className="mx-auto">
        {parts}
      </svg>
    )
  }

  const renderFractionBar = (numerator, denominator, color, width = 200) => {
    const partWidth = width / denominator
    const parts = []
    
    for (let i = 0; i < denominator; i++) {
      parts.push(
        <rect
          key={i}
          x={i * partWidth}
          y={0}
          width={partWidth}
          height={40}
          fill={i < numerator ? color : '#f3f4f6'}
          stroke="#374151"
          strokeWidth="1"
        />
      )
    }
    
    return (
      <svg width={width} height={40} className="mx-auto">
        {parts}
      </svg>
    )
  }

  const ConcreteStage = () => {
    const problem = getCurrentProblem()
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
          <p className="text-gray-600">{problem.description}</p>
        </div>

        <div className="flex justify-center">
          <div className="text-center">
            <h4 className="font-medium mb-4">Clique nas partes para selecioná-las</h4>
            <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
              {[...Array(problem.totalParts)].map((_, i) => (
                <div
                  key={i}
                  onClick={() => handlePartClick(i)}
                  className={`w-16 h-16 border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-sm font-bold ${
                    selectedParts.includes(i)
                      ? 'bg-blue-400 border-blue-600 text-white transform scale-105'
                      : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="mt-4 text-lg">
              Selecionadas: <span className="font-bold text-blue-600">{selectedParts.length}/{problem.totalParts}</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg font-medium">{problem.question}</p>
        </div>
      </div>
    )
  }

  const PictorialStage = () => {
    const problem = getCurrentProblem()
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
          <p className="text-gray-600">{problem.description}</p>
        </div>

        <div className="flex justify-center space-x-8">
          {problem.fractions.map((fraction, index) => (
            <div key={index} className="text-center">
              <h4 className="font-medium mb-3">
                {fraction.numerator}/{fraction.denominator}
              </h4>
              {renderFractionCircle(fraction.numerator, fraction.denominator, fraction.color)}
              <div className="mt-2">
                {renderFractionBar(fraction.numerator, fraction.denominator, fraction.color, 120)}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg font-medium">{problem.question}</p>
        </div>
      </div>
    )
  }

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
            <p className="text-3xl font-mono font-bold">{problem.equation}</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg font-medium">{problem.question}</p>
        </div>
      </div>
    )
  }

  const getProgressPercentage = () => {
    const totalStages = Object.keys(stages).length
    return (completedStages.length / totalStages) * 100
  }

  return (
    <div className={`min-h-screen py-8 ${stages[currentStage].bgColor}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => onNavigate('dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar ao Dashboard</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Frações - Método de Singapura</h1>
              <p className="text-gray-600">Aprenda frações através da progressão CPA</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progresso Geral</span>
            <span>{Math.round(getProgressPercentage())}%</span>
          </div>
          <Progress value={getProgressPercentage()} className="h-2" />
        </div>

        {/* Stage Navigation */}
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

        {/* Main Content */}
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

            {/* Answer Section */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <label className="text-lg font-medium">Sua resposta:</label>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md text-center text-lg font-bold"
                  placeholder="Ex: 3/8"
                />
                <Button onClick={handleAnswer} disabled={!userAnswer}>
                  Verificar
                </Button>
              </div>

              {/* Result */}
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
                        Não está correto. A resposta é: <span className="font-bold">{getCurrentProblem().answer}</span>
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setShowHint(true)}
                        className="text-yellow-600 border-yellow-300"
                      >
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Ver Dica
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Hint */}
              {showHint && (
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

        {/* Achievements */}
        {completedStages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Conquistas em Frações
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

export default FractionsSingapore

