import React, { useState } from 'react';

// Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: Array<{
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
  }>;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete?: (result: QuizResult) => void;
  showExplanations?: boolean;
  allowRetake?: boolean;
  className?: string;
}

const Quiz: React.FC<QuizProps> = ({
  questions,
  onComplete,
  showExplanations = true,
  allowRetake = true,
  className = '',
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnsweredCurrent = selectedAnswers[currentQuestion?.id] !== undefined;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    const answers = questions.map(question => {
      const selectedAnswer = selectedAnswers[question.id] ?? -1;
      return {
        questionId: question.id,
        selectedAnswer,
        isCorrect: selectedAnswer === question.correctAnswer,
      };
    });

    const score = answers.filter(answer => answer.isCorrect).length;
    const percentage = Math.round((score / questions.length) * 100);

    const result: QuizResult = {
      score,
      totalQuestions: questions.length,
      percentage,
      answers,
    };

    setQuizResult(result);
    setShowResults(true);
    onComplete?.(result);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizResult(null);
  };

  if (showResults && quizResult) {
    return (
      <div className={`quiz-container ${className}`}>
        <div className="quiz-results">
          <h2>Quiz Complete!</h2>
          <div className="score-display">
            <div className="score-number">
              {quizResult.score}/{quizResult.totalQuestions}
            </div>
            <div className="score-percentage">
              {quizResult.percentage}%
            </div>
          </div>
          
          {showExplanations && (
            <div className="explanations">
              <h3>Review:</h3>
              {questions.map((question, index) => {
                const userAnswer = quizResult.answers[index];
                const isCorrect = userAnswer.isCorrect;
                
                return (
                  <div key={question.id} className={`question-review ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <h4>Q{index + 1}: {question.question}</h4>
                    <div className="answer-review">
                      <div>Your answer: {question.options[userAnswer.selectedAnswer] || 'Not answered'}</div>
                      {!isCorrect && (
                        <div>Correct answer: {question.options[question.correctAnswer]}</div>
                      )}
                      {question.explanation && (
                        <div className="explanation">{question.explanation}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {allowRetake && (
            <button onClick={resetQuiz} className="retake-button">
              Retake Quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div>No questions available</div>;
  }

  return (
    <div className={`quiz-container ${className}`}>
      <div className="quiz-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="progress-text">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>

      <div className="question-container">
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswers[currentQuestion.id] === index ? 'selected' : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="nav-button prev-button"
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!hasAnsweredCurrent}
          className="nav-button next-button"
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

// Example usage component
export const QuizExample: React.FC = () => {
  const sampleQuestions: QuizQuestion[] = [
    {
      id: '1',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2,
      explanation: 'Paris is the capital and largest city of France.',
    },
    {
      id: '2',
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 1,
      explanation: 'Mars is called the Red Planet due to its reddish appearance from iron oxide on its surface.',
    },
    {
      id: '3',
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      explanation: 'Basic arithmetic: 2 + 2 equals 4.',
    },
  ];

  const handleQuizComplete = (result: QuizResult) => {
    console.log('Quiz completed:', result);
    // You can send results to your backend, show notifications, etc.
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Sample Quiz</h1>
      <Quiz
        questions={sampleQuestions}
        onComplete={handleQuizComplete}
        showExplanations={true}
        allowRetake={true}
      />
    </div>
  );
};

export default Quiz