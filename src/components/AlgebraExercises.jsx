import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { ArrowLeft, CheckCircle, X, Lightbulb, Trophy, Target } from 'lucide-react'

const AlgebraExercises = ({ onNavigate }) => {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const exercises = [
    {
      id: 1,
      question: "Resolva: x + 5 = 12",
      answer: 7,
      hint: "Para isolar x, subtraia 5 de ambos os lados da equação.",
      explanation: "x + 5 = 12 → x = 12 - 5 → x = 7",
      difficulty: "Fácil"
    },
    {
      id: 2,
      question: "Resolva: 2x = 16",
      answer: 8,
      hint: "Para isolar x, divida ambos os lados por 2.",
      explanation: "2x = 16 → x = 16 ÷ 2 → x = 8",
      difficulty: "Fácil"
    },
    {
      id: 3,
      question: "Resolva: x - 3 = 9",
      answer: 12,
      hint: "Para isolar x, some 3 a ambos os lados da equação.",
      explanation: "x - 3 = 9 → x = 9 + 3 → x = 12",
      difficulty: "Fácil"
    },
    {
      id: 4,
      question: "Resolva: 3x + 4 = 19",
      answer: 5,
      hint: "Primeiro subtraia 4 de ambos os lados, depois divida por 3.",
      explanation: "3x + 4 = 19 → 3x = 19 - 4 → 3x = 15 → x = 15 ÷ 3 → x = 5",
      difficulty: "Médio"
    },
    {
      id: 5,
      question: "Resolva: 2x - 6 = 10",
      answer: 8,
      hint: "Primeiro some 6 a ambos os lados, depois divida por 2.",
      explanation: "2x - 6 = 10 → 2x = 10 + 6 → 2x = 16 → x = 16 ÷ 2 → x = 8",
      difficulty: "Médio"
    },
    {
      id: 6,
      question: "Resolva: 4x + 3 = 2x + 11",
      answer: 4,
      hint: "Mova todos os termos com x para um lado e os números para o outro.",
      explanation: "4x + 3 = 2x + 11 → 4x - 2x = 11 - 3 → 2x = 8 → x = 4",
      difficulty: "Difícil"
    }
  ]

  const getCurrentExercise = () => exercises[currentExercise]

  const handleSubmit = () => {
    const exercise = getCurrentExercise()
    const answer = parseInt(userAnswer)
    
    if (answer === exercise.answer) {
      setIsCorrect(true)
      setScore(score + 1)
    } else {
      setIsCorrect(false)
      setAttempts(attempts + 1)
    }
    setShowResult(true)
  }

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      resetExercise()
    }
  }

  const resetExercise = () => {
    setUserAnswer('')
    setShowResult(false)
    setIsCorrect(false)
    setShowHint(false)
  }

  const getProgressPercentage = () => {
    return ((currentExercise + (isCorrect ? 1 : 0)) / exercises.length) * 100
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-800'
      case 'Médio': return 'bg-yellow-100 text-yellow-800'
      case 'Difícil': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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
              <h1 className="text-3xl font-bold text-gray-900">Exercícios de Álgebra Básica</h1>
              <p className="text-gray-600">Pratique equações de primeiro grau</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{score}/{exercises.length}</div>
            <div className="text-sm text-gray-600">Acertos</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progresso</span>
            <span>{Math.round(getProgressPercentage())}%</span>
          </div>
          <Progress value={getProgressPercentage()} className="h-3" />
        </div>

        {/* Exercise Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CardTitle className="text-2xl">
                  Exercício {currentExercise + 1} de {exercises.length}
                </CardTitle>
                <Badge className={getDifficultyColor(getCurrentExercise().difficulty)}>
                  {getCurrentExercise().difficulty}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={resetExercise}
              >
                Reiniciar
              </Button>
            </div>
            <CardDescription>
              Resolva a equação e encontre o valor de x
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Question */}
              <div className="text-center">
                <div className="bg-blue-50 p-6 rounded-lg inline-block">
                  <p className="text-3xl font-mono font-bold text-blue-900">
                    {getCurrentExercise().question}
                  </p>
                </div>
              </div>

              {/* Answer Input */}
              <div className="flex items-center justify-center space-x-4">
                <label className="text-lg font-medium">x =</label>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-32 px-4 py-3 border border-gray-300 rounded-md text-center text-xl font-bold"
                  placeholder="?"
                  disabled={showResult && isCorrect}
                />
                <Button 
                  onClick={handleSubmit} 
                  disabled={!userAnswer || (showResult && isCorrect)}
                  className="px-6 py-3"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Verificar
                </Button>
              </div>

              {/* Hint Button */}
              {!showResult && attempts >= 1 && (
                <div className="text-center">
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

              {/* Hint */}
              {showHint && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Dica:</h4>
                      <p className="text-yellow-700 text-sm mt-1">{getCurrentExercise().hint}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Result */}
              {showResult && (
                <div className={`text-center p-6 rounded-lg ${
                  isCorrect 
                    ? 'bg-green-100 border border-green-200' 
                    : 'bg-red-100 border border-red-200'
                }`}>
                  {isCorrect ? (
                    <div>
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                        <span className="text-2xl font-bold text-green-800">Correto!</span>
                      </div>
                      <div className="bg-white p-4 rounded-lg mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">Explicação:</h4>
                        <p className="text-gray-700 font-mono">{getCurrentExercise().explanation}</p>
                      </div>
                      {currentExercise < exercises.length - 1 ? (
                        <Button onClick={nextExercise} className="bg-green-600 hover:bg-green-700">
                          Próximo Exercício
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center">
                            <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
                            <span className="text-xl font-bold">Parabéns! Você completou todos os exercícios!</span>
                          </div>
                          <div className="text-lg">
                            Pontuação final: <span className="font-bold text-blue-600">{score}/{exercises.length}</span>
                          </div>
                          <Button onClick={() => onNavigate('dashboard')} className="bg-blue-600 hover:bg-blue-700">
                            Voltar ao Dashboard
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center mb-4">
                        <X className="h-8 w-8 text-red-600 mr-3" />
                        <span className="text-2xl font-bold text-red-800">Incorreto</span>
                      </div>
                      <p className="text-red-700 mb-4">
                        A resposta correta é: <span className="font-bold">{getCurrentExercise().answer}</span>
                      </p>
                      <div className="bg-white p-4 rounded-lg mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">Explicação:</h4>
                        <p className="text-gray-700 font-mono">{getCurrentExercise().explanation}</p>
                      </div>
                      {currentExercise < exercises.length - 1 ? (
                        <Button onClick={nextExercise} className="bg-blue-600 hover:bg-blue-700">
                          Próximo Exercício
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <div className="text-lg">
                            Pontuação final: <span className="font-bold text-blue-600">{score}/{exercises.length}</span>
                          </div>
                          <Button onClick={() => onNavigate('dashboard')} className="bg-blue-600 hover:bg-blue-700">
                            Voltar ao Dashboard
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
              Dicas Gerais para Álgebra
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Regras Básicas:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• O que você faz de um lado, faça do outro</li>
                  <li>• Isole a variável x</li>
                  <li>• Operações inversas se cancelam</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Ordem das Operações:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Primeiro: Parênteses</li>
                  <li>• Segundo: Multiplicação e Divisão</li>
                  <li>• Terceiro: Adição e Subtração</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AlgebraExercises

