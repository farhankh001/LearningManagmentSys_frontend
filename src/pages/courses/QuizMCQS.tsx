import { Box } from '@mui/material'
import MCQSInputField from '../../components/Forms/InputFields/MCQSInputField';

const questions= [
    {
      id: '1',
      question: 'What is the largest ocean on Earth?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correctAnswer: 3,
      explanation: 'The Pacific Ocean is the largest and deepest ocean, covering about one-third of Earth\'s surface.',
    },
    {
      id: '2',
      question: 'Which programming language was created by Brendan Eich?',
      options: ['Python', 'JavaScript', 'Java', 'C++'],
      correctAnswer: 1,
      explanation: 'JavaScript was created by Brendan Eich in 1995 while he was working at Netscape.',
    },
    {
      id: '3',
      question: 'What is the chemical symbol for gold?',
      options: ['Go', 'Gd', 'Au', 'Ag'],
      correctAnswer: 2,
      explanation: 'Au comes from the Latin word "aurum" meaning gold.',
    },
    {
      id: '4',
      question: 'Which year did the Berlin Wall fall?',
      options: ['1987', '1989', '1991', '1993'],
      correctAnswer: 1,
      explanation: 'The Berlin Wall fell on November 9, 1989, marking a pivotal moment in German reunification.',
    },
    {
      id: '5',
      question: 'What is the smallest unit of matter?',
      options: ['Molecule', 'Atom', 'Proton', 'Electron'],
      correctAnswer: 1,
      explanation: 'An atom is the smallest unit of ordinary matter that forms a chemical element.',
    },
  ];

function QuizMCQS() {
  return (
    <Box>
        {questions.map(question=><MCQSInputField label='question' name='quiz-question' question={question} />)}
    </Box>
  )
}

export default QuizMCQS
