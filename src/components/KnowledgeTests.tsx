import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const tests = [
  {
    id: 'poster',
    title: 'Робота з Poster',
    questions: [
      {
        question: 'Що потрібно зробити на початку зміни?',
        options: [
          'Відкрити зміну в Poster',
          'Закрити зміну',
          'Сформувати Z-звіт',
          'Нічого не робити',
        ],
        correct: 0,
      },
      {
        question: 'Що таке Z-звіт?',
        options: [
          'Звіт про продажі за день',
          'Звіт про залишки товару',
          'Звіт про клієнтів',
          'Звіт про працівників',
        ],
        correct: 0,
      },
      {
        question: 'Коли потрібно закривати зміну?',
        options: [
          'На початку робочого дня',
          'В обід',
          'В кінці робочого дня',
          'Кожну годину',
        ],
        correct: 2,
      },
    ],
  },
  {
    id: 'service',
    title: 'Обслуговування клієнтів',
    questions: [
      {
        question: 'Як правильно привітати клієнта?',
        options: [
          'Ігнорувати клієнта',
          'Посміхнутися та привітати',
          'Критикувати його вибір',
          'Сказати що ми закриті',
        ],
        correct: 1,
      },
      {
        question: 'Що робити при конфлікті з клієнтом?',
        options: [
          'Підвищити голос',
          'Зберігати спокій та ввічливість',
          'Ігнорувати клієнта',
          'Вигнати клієнта',
        ],
        correct: 1,
      },
      {
        question: 'Чи потрібно пропонувати додаткові товари?',
        options: [
          'Ні, не потрібно',
          'Тільки дорогі товари',
          'Так, завжди',
          'Тільки в п\'ятницю',
        ],
        correct: 2,
      },
    ],
  },
];

export const KnowledgeTests = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const calculateScore = () => {
    const test = tests.find(t => t.id === selectedTest);
    if (!test) return 0;

    let correct = 0;
    test.questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        correct++;
      }
    });

    return Math.round((correct / test.questions.length) * 100);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setSelectedTest(null);
  };

  if (!selectedTest) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Перевірка Знань</h2>
        <div className="space-y-3">
          {tests.map((test) => (
            <Card
              key={test.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedTest(test.id)}
            >
              <h3 className="font-semibold">{test.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {test.questions.length} питань
              </p>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const currentTest = tests.find(t => t.id === selectedTest);
  if (!currentTest) return null;

  if (showResults) {
    const score = calculateScore();
    return (
      <div>
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Результат тесту</h2>
          <div className="text-6xl font-bold mb-4">{score}%</div>
          <p className="text-muted-foreground mb-6">
            Правильних відповідей: {Object.values(answers).filter((a, idx) => a === currentTest.questions[idx].correct).length} з {currentTest.questions.length}
          </p>
          <div className="space-y-2">
            <Button onClick={resetTest} className="w-full">
              Пройти інший тест
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setAnswers({});
              }}
              className="w-full"
            >
              Пройти ще раз
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const question = currentTest.questions[currentQuestion];

  return (
    <div>
      <Button
        variant="outline"
        onClick={resetTest}
        className="mb-4"
      >
        ← Назад до списку
      </Button>

      <Card className="p-6">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Питання {currentQuestion + 1} з {currentTest.questions.length}
          </p>
          <h3 className="text-xl font-bold mt-2">{question.question}</h3>
        </div>

        <RadioGroup
          value={answers[currentQuestion]?.toString()}
          onValueChange={(value) => handleAnswer(currentQuestion, parseInt(value))}
        >
          {question.options.map((option, idx) => (
            <div key={idx} className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
              <Label htmlFor={`option-${idx}`} className="cursor-pointer flex-1">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="mt-6 flex gap-2">
          {currentQuestion > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(prev => prev - 1)}
            >
              Назад
            </Button>
          )}
          {currentQuestion < currentTest.questions.length - 1 ? (
            <Button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              disabled={answers[currentQuestion] === undefined}
              className="ml-auto"
            >
              Далі
            </Button>
          ) : (
            <Button
              onClick={() => setShowResults(true)}
              disabled={answers[currentQuestion] === undefined}
              className="ml-auto"
            >
              Завершити тест
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
