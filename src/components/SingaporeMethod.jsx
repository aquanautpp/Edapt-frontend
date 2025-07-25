import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import {
  Blocks,
  Image,
  Calculator,
  ArrowRight,
  CheckCircle,
  Play,
  RotateCcw
} from 'lucide-react'

const SingaporeMethod = () => {
  const [currentStage, setCurrentStage] = useState('concrete')
  const [problemSolved, setProblemSolved] = useState(false)

  const stages = {
    concrete: {
      title: "Concreto",
      description: "Manipule objetos físicos para entender o conceito",
      icon: Blocks,
      color: "bg-green-100 text-green-800",
      example: {
        problem: "Maria tem 8 maçãs. Ela deu 3 maçãs para João. Quantas maçãs Maria tem agora?",
        solution: "Use os blocos abaixo para representar as maçãs e resolver o problema."
      }
    },
    pictorial: {
      title: "Pictórico", 
      description: "Represente visualmente usando desenhos e diagramas",
      icon: Image,
      color: "bg-blue-100 text-blue-800",
      example: {
        problem: "Em uma escola há 24 alunos. Se 1/3 dos alunos são meninas, quantas meninas há na escola?",
        solution: "Use o modelo de barras para visualizar e resolver."
      }
    },
    abstract: {
      title: "Abstrato",
      description: "Use símbolos matemáticos e equações",
      icon: Calculator, 
      color: "bg-purple-100 text-purple-800",
      example: {
        problem: "Resolva: 3x + 7 = 22",
        solution: "Use operações algébricas para encontrar o valor de x."
      }
    }
  }

  const ConcreteStage = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-4">
          Problema: {stages.concrete.example.problem}
        </h3>
        <p className="text-green-700 mb-4">{stages.concrete.example.solution}</p>
        
        {/* Interactive blocks simulation */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className={`w-12 h-12 rounded-lg border-2 border-green-300 flex items-center justify-center cursor-pointer transition-all ${
                i < 5 ? 'bg-green-200' : 'bg-red-200 opacity-50'
              }`}
              onClick={() => setProblemSolved(true)}
            >
              🍎
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-green-700">
            Clique nos blocos para "dar" as maçãs para João
          </div>
          {problemSolved && (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Resposta: 5 maçãs
            </Badge>
          )}
        </div>
      </div>
    </div>
  )

  const PictorialStage = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          Problema: {stages.pictorial.example.problem}
        </h3>
        <p className="text-blue-700 mb-4">{stages.pictorial.example.solution}</p>
        
        {/* Bar model visualization */}
        <div className="space-y-4">
          <div className="text-sm text-blue-700 font-medium">Modelo de Barras:</div>
          <div className="bg-white p-4 rounded border">
            <div className="flex items-center mb-2">
              <span className="text-sm mr-2">Total de alunos:</span>
              <div className="w-60 h-8 bg-blue-200 rounded flex items-center justify-center text-sm font-medium">
                24 alunos
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm mr-2">Meninas (1/3):</span>
              <div className="w-20 h-8 bg-pink-200 rounded flex items-center justify-center text-sm font-medium">
                8
              </div>
              <span className="mx-2 text-xs">+</span>
              <div className="w-20 h-8 bg-gray-200 rounded flex items-center justify-center text-sm">
                16
              </div>
            </div>
          </div>
          
          <Badge className="bg-blue-100 text-blue-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Resposta: 8 meninas
          </Badge>
        </div>
      </div>
    </div>
  )

  const AbstractStage = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">
          Problema: {stages.abstract.example.problem}
        </h3>
        <p className="text-purple-700 mb-4">{stages.abstract.example.solution}</p>
        
        {/* Step-by-step solution */}
        <div className="bg-white p-4 rounded border space-y-2">
          <div className="text-sm font-mono">3x + 7 = 22</div>
          <div className="text-sm font-mono">3x + 7 - 7 = 22 - 7</div>
          <div className="text-sm font-mono">3x = 15</div>
          <div className="text-sm font-mono">3x ÷ 3 = 15 ÷ 3</div>
          <div className="text-sm font-mono font-bold">x = 5</div>
        </div>
        
        <Badge className="bg-purple-100 text-purple-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Resposta: x = 5
        </Badge>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Método de Singapura
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprenda matemática através da progressão Concreto-Pictórico-Abstrato (CPA), 
            uma metodologia comprovada que desenvolve compreensão profunda dos conceitos.
          </p>
        </div>

        {/* Stage Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4 bg-white p-2 rounded-lg shadow-sm border">
            {Object.entries(stages).map(([key, stage], index) => (
              <div key={key} className="flex items-center">
                <Button
                  variant={currentStage === key ? "default" : "ghost"}
                  onClick={() => setCurrentStage(key)}
                  className="flex items-center space-x-2"
                >
                  <stage.icon className="h-4 w-4" />
                  <span>{stage.title}</span>
                </Button>
                {index < Object.keys(stages).length - 1 && (
                  <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Stage Content */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {React.createElement(stages[currentStage].icon, { 
                  className: "h-6 w-6" 
                })}
                <CardTitle className="text-2xl">
                  Estágio {stages[currentStage].title}
                </CardTitle>
                <Badge className={stages[currentStage].color}>
                  Ativo
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={() => setProblemSolved(false)}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reiniciar
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
          </CardContent>
        </Card>

        {/* Method Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compreensão Profunda</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                A progressão CPA garante que os alunos desenvolvam uma compreensão 
                sólida dos conceitos antes de avançar para abstrações.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resolução de Problemas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Enfatiza o pensamento crítico e múltiplas estratégias para 
                resolver problemas matemáticos complexos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Confiança Matemática</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Constrói confiança gradualmente, permitindo que todos os alunos 
                vejam a matemática como acessível e compreensível.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Pronto para Praticar?</CardTitle>
            <CardDescription>
              Continue sua jornada com exercícios personalizados baseados no Método de Singapura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                <Play className="h-4 w-4 mr-2" />
                Começar Exercícios
              </Button>
              <Button variant="outline" size="lg">
                Ver Mais Exemplos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SingaporeMethod

