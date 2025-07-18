import { alpha, Box, Button, CircularProgress, List, ListItem, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { CreateQuizMCQFormType } from '../../../types/quiz-mcqs-types'
import TextInputField from '../../../components/Forms/InputFields/TextInputField'
import { AddCircleOutline, AddCircleOutlineOutlined, AddOutlined, AddTask, AddTaskOutlined, Check, CheckCircle, Create, Delete, Details, Gavel, Send } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { SubmitQuizMCQType, useCreateMCQsQuizMutation } from '../../../app/api/lessonApi'

const instructions = [
  "Each Quiz will have a Question and 4 Choices",
  "Fill question and choices along with correct anwer index and correct answer explanation.",
  "Keep in mind in correct answer enter index of correct answer not answer itself.",
  "Explanation is about answer that will be displayed to student after he submits the quiz.",
  "All fields are required. Fill them carefully."

]

function MCQQuizCreateForm() {
  const theme = useTheme()
  const navigate = useNavigate()
  const { control, handleSubmit, reset, getValues } = useFormContext<CreateQuizMCQFormType>()
  type SingleQuestionType = CreateQuizMCQFormType["questions"][number];
  const [submittedQuestions, setSubmittedQuestions] = useState<SingleQuestionType[]>([]);
  const [createMCQQuiz, { isError, isLoading, isSuccess, error }] = useCreateMCQsQuizMutation()
  const { lessonId } = useParams()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  })
  useEffect(() => {
    if (isSuccess) {
      reset();
      setSubmittedQuestions([]);
      toast.success("Quiz created Successfully.")
      setTimeout(() => {
        navigate(`/lesson-settings/${lessonId}`);
      }, 1000);
    }
  }, [isSuccess, reset]);
  if (isError && error && "data" in error) {
    console.log(error)
    toast.error(`${JSON.stringify((error.data as any).error)}`)
  }
  const createQuizSubmitHandler = (data: CreateQuizMCQFormType) => {
    try {
      const quizMCQSubmtData: SubmitQuizMCQType = {
        lessonId: lessonId,
        questions: data.questions,
      }
      createMCQQuiz(quizMCQSubmtData)
    } catch (error) {
      console.log(error)
    }
  }


  const submitSingleQuestion = (questionId: string) => {
    const allQuestions = getValues("questions");
    const question = allQuestions.find(q => q.questionId === questionId);

    if (
      question?.question_text.trim() !== '' &&
      question?.options.every(opt => opt.trim() !== '') &&
      question?.correctAnswer.trim() !== '' &&
      question?.questionId.trim() !== ''
    ) {
      setSubmittedQuestions(prev => {
        const existingIndex = prev.findIndex(q => q.questionId === questionId);
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = question;
          return updated;
        } else {
          return [...prev, question];
        }
      });


      const alreadyExists = submittedQuestions.find(q => q.questionId === questionId);
      toast.success(alreadyExists ? 'Question Updated!' : 'Question submitted!');
    } else {
      toast.error('Please fill all required fields!');
    }
  };

  if (isLoading) {
    return <Box sx={{ width: "100%", height: "70vh", alignItems: "center", justifyContent: "center" }}><CircularProgress /></Box>;
  }
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, alignItems: "center", justifyContent: "center", mb: 5 }}>

      <Box sx={{ width: "80%", display: "flex", flexDirection: "row", gap: 4 }}>



        <List sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "20%"
        }}>
          {instructions && instructions.map((instruction) => <ListItem
            sx={{
              display: "flex", flexDirection: {
                xs: "row",
                sm: "row",
                md: "column",
                lg: "column",
                xl: 'column'
              },
              boxShadow: `-2px 2px 2px ${theme.palette.secondary.light}`,
              gap: {
                xs: 1,
                sm: 1,
                md: 2
              }, alignItems: "center", backgroundColor: alpha(theme.palette.primary.dark, 0.55), borderRadius: 4, padding: 2, textAlign: "center", border: "1px solid", borderColor: theme.palette.divider

            }}>
            <CheckCircle sx={{
              fontSize: 12,
              color: theme.palette.warning.light,
              boxShadow: `0 0 6px 2px ${theme.palette.warning.light}`,
              borderRadius: '50%',
              background: theme.palette.warning.light
            }} />
            <Typography variant='caption' fontWeight={600} sx={{ textShadow: `0 0 12px ${theme.palette.warning.light}` }}>
              {instruction}
            </Typography>
          </ListItem>)}
        </List>



        <Box sx={{ width: "80%" }}>

          <form onSubmit={handleSubmit(createQuizSubmitHandler)}>
            <Box sx={{ backgroundColor: alpha(theme.palette.primary.dark, 0.55), display: "flex", flexDirection: "column", p: 5, justifyContent: "center", alignItems: "center", border: "1px solid", borderRadius: 4, borderColor: theme.palette.divider, }}>
              <Typography variant='h4' fontWeight={600} sx={{ color: theme.palette.text.primary, textShadow: `0 0 12px ${theme.palette.warning.light}` }}>
                <AddCircleOutlineOutlined sx={{ fontSize: 25, mr: 2, color: theme.palette.warning.light }} />
                Create MCQ Quiz
              </Typography>
              {
                fields.map((field, index) => (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }} key={field.id}>
                    <TextInputField<CreateQuizMCQFormType> isRequired={true} label='Quiz Question' name={`questions.${index}.question_text`} type='text' />

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 3 }}>
                      {[0, 1, 2, 3].map(optIndex => (
                        <Box key={optIndex}>
                          <TextInputField<CreateQuizMCQFormType> isRequired={true} label={`Option ${optIndex + 1}`} type='text' name={`questions.${index}.options.${optIndex}`} />
                        </Box>
                      ))}
                    </Box>

                    <TextInputField<CreateQuizMCQFormType> isRequired={true} label='Correct Answer Index' name={`questions.${index}.correctAnswer`} type='number' />


                    <TextInputField<CreateQuizMCQFormType> isRequired={true} label='Correct Answer Explanation' name={`questions.${index}.explanation`} type='text' />

                    <Box sx={{ mb: 2 }}>
                      <Button

                        endIcon={<AddTaskOutlined />}
                        variant="contained"
                        sx={{

                          borderRadius: 3,
                          background: "primary.main",
                          fontSize: "0.80rem",
                          fontWeight: 500,


                        }}
                        onClick={() => submitSingleQuestion(field.questionId)} >
                        Submit Question
                      </Button>
                    </Box>
                  </Box>))
              }

              <Box sx={{ display: "flex", gap: 3 }}>
                <Button
                  onClick={() =>
                    append({
                      questionId: Date.now().toString(),
                      question_text: '',
                      options: ['', '', '', ''],
                      correctAnswer: "1",
                      explanation: ''
                    })
                  }
                  endIcon={<AddCircleOutline />}
                  variant="contained"
                  sx={{

                    borderRadius: 3,
                    background: theme.palette.warning.light,
                    fontSize: "0.80rem",
                    fontWeight: 500,


                  }}

                >
                  Add Question
                </Button>
                <Button type='submit' variant='contained' endIcon={<Send />}

                  sx={{

                    borderRadius: 3,
                    background: theme.palette.success.light,
                    fontSize: "0.80rem",
                    fontWeight: 500,


                  }}>
                  submit quiz
                </Button>
              </Box>
            </Box>
          </form>

          <Box sx={{ backgroundColor: alpha(theme.palette.primary.dark, 0.55), display: "flex", flexDirection: "column", p: 3.5, width: "100%", mt: 4, border: "1px solid", borderColor: theme.palette.divider, borderRadius: 4 }}>

            <Typography variant='h5' fontWeight={600} sx={{ color: theme.palette.text.primary, display: "flex", alignItems: "center", textShadow: `0 0 12px ${theme.palette.warning.light}` }}>
              <AddTask sx={{ fontSize: 25, mr: 1 }} />
              <span> All Submitted Questions</span>
            </Typography>

            {submittedQuestions.length > 0 ? (
              submittedQuestions.map((q, i) => (
                <Box key={i} sx={{ display: "flex", flexDirection: "column", m: 2, gap: 1 }}>
                  <Typography fontWeight="bold">
                    Q{i + 1}: {q.question_text}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 5 }}>
                    {q.options.map((opt, j) => (
                      <Typography key={j} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {j + 1}. {opt} {parseInt(q.correctAnswer) - 1 === j ? <CheckCircle sx={{ color: theme.palette.success.light, fontSize: 15 }} /> : ''}
                      </Typography>))}
                  </Box>

                  {q.explanation && (
                    <Typography variant="body2" color="text.secondary">
                      Explanation: {q.explanation}
                    </Typography>
                  )}
                  <Box sx={{ mt: 1 }}>
                    <Button
                      onClick={() => {
                        if (submittedQuestions.length === 1 && fields.length === 1) {
                          toast.error('At least one question is required.');
                          return;
                        }

                        const idToDelete = q.questionId;

                        // Find the index by comparing to the form values instead
                        const allQuestions = getValues("questions");
                        const indexToRemove = allQuestions.findIndex(q => q.questionId === idToDelete);

                        if (indexToRemove === -1) {
                          toast.error("Question not found.");
                          return;
                        }

                        remove(indexToRemove); // Safely remove from field array
                        setSubmittedQuestions(prev => prev.filter(q => q.questionId !== idToDelete)); // Remove from local state
                      }}
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<Delete />} sx={{
                        color: theme.palette.text.primary,
                        borderRadius: 3,
                        background: theme.palette.error.light,
                        fontSize: "0.80rem",
                        fontWeight: 500,


                      }}>Delete</Button>

                  </Box>
                </Box>))) : (
              <Typography>No questions added yet.</Typography>
            )}
          </Box>

        </Box>
      </Box >


    </Box >
  )
}

export default MCQQuizCreateForm
