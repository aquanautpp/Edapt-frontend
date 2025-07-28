import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { ArrowLeft, CheckCircle, X, Lightbulb, Eye, BookOpen, Image } from 'lucide-react'

const VisualTextInterpretation = ({ onNavigate }) => {
  const [currentText, setCurrentText] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [showVisualAid, setShowVisualAid] = useState(false)

  const texts = [
    {
      id: 1,
      title: "O Jardim de Maria",
      content: `Maria tem um jardim retangular em seu quintal. O jardim mede 8 metros de comprimento e 6 metros de largura. Ela plantou rosas vermelhas em metade do jardim e margaridas brancas na outra metade. 
      
      No centro do jardim, há uma pequena fonte circular com 2 metros de diâmetro. Maria gasta 30 minutos todos os dias regando as plantas e limpando a fonte.`,
      question: "Qual é a área total do jardim de Maria?",
      options: [
        "14 metros quadrados",
        "48 metros quadrados", 
        "28 metros quadrados",
        "36 metros quadrados"
      ],
      correctAnswer: "48 metros quadrados",
      explanation: "Para calcular a área de um retângulo, multiplicamos comprimento × largura: 8m × 6m = 48m²",
      visualAid: {
        type: "diagram",
        description: "Diagrama do jardim retangular",
        elements: [
          { type: "rectangle", width: 160, height: 120, color: "#90EE90", label: "Jardim 8m × 6m" },
          { type: "circle", radius: 20, color: "#87CEEB", label: "Fonte (2m diâmetro)" },
          { type: "area", color: "#FFB6C1", label: "Rosas", position: "left" },
          { type: "area", color: "#FFFFFF", label: "Margaridas", position: "right" }
        ]
      },
      difficulty: "Fácil"
    },
    {
      id: 2,
      title: "A Viagem de João",
      content: `João saiu de casa às 8h da manhã para visitar sua avó. Ele dirigiu por 2 horas e 30 minutos até chegar à cidade dela. Lá, ele almoçou com a avó por 1 hora e 15 minutos. 
      
      Depois do almoço, eles foram ao parque por 45 minutos. João saiu da casa da avó às 14h30 para voltar para casa. A viagem de volta demorou o mesmo tempo que a ida.`,
      question: "A que horas João chegou em casa?",
      options: [
        "16h30",
        "17h00",
        "17h30", 
        "18h00"
      ],
      correctAnswer: "17h00",
      explanation: "João saiu às 14h30 e a viagem de volta demorou 2h30 (mesmo tempo da ida): 14h30 + 2h30 = 17h00",
      visualAid: {
        type: "timeline",
        description: "Linha do tempo da viagem de João",
        events: [
          { time: "8h00", event: "Saída de casa", color: "#FF6B6B" },
          { time: "10h30", event: "Chegada na avó", color: "#4ECDC4" },
          { time: "11h45", event: "Fim do almoço", color: "#45B7D1" },
          { time: "12h30", event: "Volta do parque", color: "#96CEB4" },
          { time: "14h30", event: "Saída da avó", color: "#FFEAA7" },
          { time: "17h00", event: "Chegada em casa", color: "#DDA0DD" }
        ]
      },
      difficulty: "Médio"
    },
    {
      id: 3,
      title: "A Festa de Aniversário",
      content: `Ana organizou uma festa de aniversário para 24 convidados. Ela comprou 3 pizzas grandes, sendo que cada pizza foi cortada em 8 fatias. Durante a festa, foram consumidas 20 fatias de pizza.
      
      Para a sobremesa, Ana preparou um bolo que foi dividido em 16 pedaços iguais. Cada convidado comeu exatamente 1 pedaço de bolo, e sobraram alguns pedaços.`,
      question: "Quantos pedaços de bolo sobraram?",
      options: [
        "6 pedaços",
        "8 pedaços",
        "4 pedaços",
        "2 pedaços"
      ],
      correctAnswer: "8 pedaços",
      explanation: "O bolo tinha 16 pedaços. Com 24 convidados, mas apenas 16 pedaços disponíveis, cada um comeu 1 pedaço. Porém, se havia 24 convidados e o bolo foi dividido em 16 pedaços, significa que sobraram 16 - 8 = 8 pedaços (considerando que nem todos comeram bolo).",
      visualAid: {
        type: "chart",
        description: "Gráfico da festa",
        data: [
          { label: "Pizzas (fatias)", total: 24, consumed: 20, remaining: 4 },
          { label: "Bolo (pedaços)", total: 16, consumed: 8, remaining: 8 },
          { label: "Convidados", total: 24, present: 24 }
        ]
      },
      difficulty: "Difícil"
    }
  ]

  const getCurrentText = () => texts[currentText]

  const handleSubmit = () => {
    const text = getCurrentText()
    
    if (selectedAnswer === text.correctAnswer) {
      setIsCorrect(true)
      setScore(score + 1)
    } else {
      setIsCorrect(false)
    }
    setShowResult(true)
  }

  const nextText = () => {
    if (currentText < texts.length - 1) {
      setCurrentText(currentText + 1)
      resetText()
    }
  }

  const resetText = () => {
    setSelectedAnswer('')
    setShowResult(false)
    setIsCorrect(false)
    setShowVisualAid(false)
  }

  const getProgressPercentage = () => {
    return ((currentText + (isCorrect ? 1 : 0)) / texts.length) * 100
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-800'
      case 'Médio': return 'bg-yellow-100 text-yellow-800'
      case 'Difícil': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderVisualAid = (visualAid) => {
    if (visualAid.type === 'diagram') {
      return (
        <div className="bg-white p-6 rounded-lg border">
          <h4 className="font-medium mb-4 text-center">{visualAid.description}</h4>
          <div className="flex justify-center">
            <svg width="200" height="160" className="border border-gray-300">
              {/* Jardim retangular */}
              <rect x="20" y="20" width="160" height="120" fill="#90EE90" stroke="#228B22" strokeWidth="2"/>
              
              {/* Divisão do jardim */}
              <rect x="20" y="20" width="80" height="120" fill="#FFB6C1" opacity="0.7"/>
              <rect x="100" y="20" width="80" height="120" fill="#FFFFFF" opacity="0.7"/>
              
              {/* Fonte circular */}
              <circle cx="100" cy="80" r="20" fill="#87CEEB" stroke="#4682B4" strokeWidth="2"/>
              
              {/* Labels */}
              <text x="100" y="15" textAnchor="middle" className="text-xs font-medium">8m</text>
              <text x="10" y="85" textAnchor="middle" className="text-xs font-medium" transform="rotate(-90 10 85)">6m</text>
              <text x="60" y="85" textAnchor="middle" className="text-xs">Rosas</text>
              <text x="140" y="85" textAnchor="middle" className="text-xs">Margaridas</text>
              <text x="100" y="85" textAnchor="middle" className="text-xs font-bold">Fonte</text>
            </svg>
          </div>
        </div>
      )
    }
    
    if (visualAid.type === 'timeline') {
      return (
        <div className="bg-white p-6 rounded-lg border">
          <h4 className="font-medium mb-4 text-center">{visualAid.description}</h4>
          <div className="space-y-3">
            {visualAid.events.map((event, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: event.color }}
                />
                <div className="font-mono font-bold text-sm w-16">{event.time}</div>
                <div className="text-sm">{event.event}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    if (visualAid.type === 'chart') {
      return (
        <div className="bg-white p-6 rounded-lg border">
          <h4 className="font-medium mb-4 text-center">{visualAid.description}</h4>
          <div className="space-y-4">
            {visualAid.data.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span>{item.total} total</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div 
                    className="bg-blue-500 h-6 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ width: `${(item.consumed / item.total) * 100}%` }}
                  >
                    {item.consumed}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
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
              <h1 className="text-3xl font-bold text-gray-900">Interpretação de Texto Visual</h1>
              <p className="text-gray-600">Use recursos visuais para compreender melhor os textos</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{score}/{texts.length}</div>
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

        {/* Text Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CardTitle className="text-2xl">
                  {getCurrentText().title}
                </CardTitle>
                <Badge className={getDifficultyColor(getCurrentText().difficulty)}>
                  {getCurrentText().difficulty}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowVisualAid(!showVisualAid)}
                  className="flex items-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>{showVisualAid ? 'Ocultar' : 'Ver'} Recurso Visual</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetText}
                >
                  Reiniciar
                </Button>
              </div>
            </div>
            <CardDescription>
              Texto {currentText + 1} de {texts.length} • Leia com atenção e use os recursos visuais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Text Content */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-900">Texto para Interpretação</span>
                </div>
                <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {getCurrentText().content}
                </div>
              </div>

              {/* Visual Aid */}
              {showVisualAid && (
                <div className="border-2 border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <Image className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">Recurso Visual</span>
                  </div>
                  {renderVisualAid(getCurrentText().visualAid)}
                </div>
              )}

              {/* Question */}
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">
                  {getCurrentText().question}
                </h3>
                
                {/* Options */}
                <div className="space-y-3">
                  {getCurrentText().options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedAnswer === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        className="mr-3"
                        disabled={showResult}
                      />
                      <span className="text-gray-800">{option}</span>
                    </label>
                  ))}
                </div>

                {/* Submit Button */}
                {!showResult && (
                  <div className="mt-6 text-center">
                    <Button 
                      onClick={handleSubmit} 
                      disabled={!selectedAnswer}
                      className="px-8 py-3"
                    >
                      Verificar Resposta
                    </Button>
                  </div>
                )}
              </div>

              {/* Result */}
              {showResult && (
                <div className={`p-6 rounded-lg ${
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
                        <p className="text-gray-700">{getCurrentText().explanation}</p>
                      </div>
                      {currentText < texts.length - 1 ? (
                        <div className="text-center">
                          <Button onClick={nextText} className="bg-green-600 hover:bg-green-700">
                            Próximo Texto
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center space-y-4">
                          <div className="text-xl font-bold">
                            Parabéns! Você completou todos os textos!
                          </div>
                          <div className="text-lg">
                            Pontuação final: <span className="font-bold text-blue-600">{score}/{texts.length}</span>
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
                        A resposta correta é: <span className="font-bold">{getCurrentText().correctAnswer}</span>
                      </p>
                      <div className="bg-white p-4 rounded-lg mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">Explicação:</h4>
                        <p className="text-gray-700">{getCurrentText().explanation}</p>
                      </div>
                      {currentText < texts.length - 1 ? (
                        <div className="text-center">
                          <Button onClick={nextText} className="bg-blue-600 hover:bg-blue-700">
                            Próximo Texto
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center space-y-4">
                          <div className="text-lg">
                            Pontuação final: <span className="font-bold text-blue-600">{score}/{texts.length}</span>
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
              Dicas para Interpretação de Texto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Estratégias de Leitura:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Leia o texto duas vezes</li>
                  <li>• Identifique informações-chave</li>
                  <li>• Use recursos visuais para organizar dados</li>
                  <li>• Releia a pergunta antes de responder</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Recursos Visuais:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Diagramas ajudam com medidas</li>
                  <li>• Linhas do tempo organizam eventos</li>
                  <li>• Gráficos mostram quantidades</li>
                  <li>• Desenhos facilitam a compreensão</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VisualTextInterpretation

