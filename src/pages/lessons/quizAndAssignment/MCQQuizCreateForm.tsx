import { Box, Button, List, ListItem, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { CreateQuizMCQFormType } from '../../../types/quiz-mcqs-types'
import TextInputField from '../../../components/Forms/InputFields/TextInputField'
import { CheckCircle, Create, Delete, Details, Gavel } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { SubmitQuizMCQType, useCreateMCQsQuizMutation } from '../../../app/api/lessonApi'
import LoadingScreen from '../../../components/other/Loading'
const instructions=[
  "Each Quiz will have a Question and 4 Choices",
  "Fill question and choices along with correct anwer index and correct answer explanation.",
  "Keep in mind in correct answer enter index of correct answer not answer itself.",
  "Explanation is about answer that will be displayed to student after he submits the quiz.",
  "All fields are required. Fill them carefully."

]

function MCQQuizCreateForm() {
   const theme=useTheme()
   const navigate=useNavigate()
   const { control, handleSubmit,reset,getValues,watch } = useFormContext<CreateQuizMCQFormType>()
   type SingleQuestionType = CreateQuizMCQFormType["questions"][number];
   const [submittedQuestions, setSubmittedQuestions] = useState<SingleQuestionType[]>([]);
   const[createMCQQuiz,{isError,isLoading,isSuccess,error}]=useCreateMCQsQuizMutation()

   const {fields,append,remove}=useFieldArray({
            control,
            name:"questions"
        })
      useEffect(() => {
        if (isSuccess) {
        reset();
        setSubmittedQuestions([]);
        toast.success("Quiz created Successfully.")
         setTimeout(() => { 
          navigate('/teacher-dash');
        }, 1000);
    }
    }, [isSuccess, reset]);
    if(isError&&error&&"data" in error){
       console.log(error)
      toast.error(`${JSON.stringify((error.data as any).error)}`)
    }
      const {lessonId}=useParams()
      const createQuizSubmitHandler=(data:CreateQuizMCQFormType)=>{
          try {
              const quizMCQSubmtData:SubmitQuizMCQType={
              lessonId:lessonId,
              questions:data.questions,
            }
            createMCQQuiz(quizMCQSubmtData)
          } catch (error) {
              console.log(error)
            }
        }
         

        const submitSingleQuestion = (questionId: string) => {
           const allQuestions = getValues("questions");
           console.log(allQuestions)
           console.log(questionId)
            const question = allQuestions.find(q => q.questionId=== questionId);
            console.log("question",question)
            if (
              question?.question_text.trim() !== '' &&
              question?.options.every(opt => opt.trim() !== '') &&
              question?.correctAnswer.trim() !== ''&&question?.questionId.trim()!=='') {
              setSubmittedQuestions(prev => {
              const existingIndex = prev.findIndex(q => q.questionId === questionId);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = question;
         setTimeout(() => {
            toast.success('Question Updated!');
        }, 1000);
        return updated;
      } else {
        setTimeout(() => {
            toast.success('Question submitted!');
        }, 1000); // 1000 ms = 1 second

        
        return [...prev, question];
      }
     });
      } else {
        setTimeout(() => {
            toast.error('Please fill all required fields!');
        }, 1000);
             
         }
        };
    if(isLoading){
        return <LoadingScreen/>
      }
    return (
  <Box sx={{width:"100%",display:"flex",flexDirection:"column",gap:2,alignItems:"center",justifyContent:"center",mb:5}}>
 <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Typography variant='h4' fontWeight={600} sx={{color: theme.palette.primary.light,fontStyle:"italic"}}>
          <Gavel sx={{fontSize:25,mr:1}}/>
          Instructions
        </Typography>
      <List sx={{
        display:"flex",
        flexDirection:{
          xs:"column",
          sm:"column",
          md:"row",
          lg:"row",
          xl:'row'
        },
        ml:1,
        mr:1
        // alignItems:"center",
        // justifyContent:"center",
      }}>
            {instructions&&instructions.map((instruction)=><ListItem 
            sx={{display:"flex",flexDirection:{
               xs:"row",
               sm:"row",
               md:"column",
               lg:"column",
               xl:'column'
          },
           boxShadow:`-2px 2px 2px ${theme.palette.secondary.light}`,
          gap:{
            xs:1,
            sm:1,
            md:2
          },alignItems:"center",margin:1,backgroundColor:theme.palette.background.paper,borderRadius:4,padding:2,textAlign:"center"}}>
                <CheckCircle sx={{
                       fontSize:15, }}/>
              <Typography variant='caption' fontWeight={600}>
                 {instruction}
              </Typography>
             </ListItem>)}
        </List>
        <Button variant='contained'>
          See full instructions
        </Button>
      </Box>



       <Typography variant='h4' fontWeight={600} sx={{color: theme.palette.primary.light,fontStyle:"italic"}}>
          <Create sx={{fontSize:25,mr:1}}/>
          Create Quiz
        </Typography>
        <form onSubmit={handleSubmit(createQuizSubmitHandler)}>
        <Box sx={{backgroundColor:theme.palette.background.paper ,display:"flex",flexDirection:"column",p:3, justifyContent:"center",alignItems:"center"}}>
        
        {
            fields.map((field,index)=>(
            <Box sx={{display:"flex",flexDirection:"column",gap:3,width:"100%"}} key={field.id}>
                <TextInputField<CreateQuizMCQFormType> isRequired={true} label='Quiz Question' name={`questions.${index}.question_text`} type='text' />
                
                <Box sx={{display:"flex",flexDirection:{xs:"column",sm:"column",md:"row"},gap:3}}>
                    {[0,1,2,3].map(optIndex=>(
                        <Box key={optIndex}>
                    <TextInputField<CreateQuizMCQFormType> isRequired={true} label={`Option ${optIndex+1}`} type='text' name={`questions.${index}.options.${optIndex}`} />
                        </Box>
                    ))}
                </Box>
              
                    <TextInputField<CreateQuizMCQFormType>  isRequired={true} label='Correct Answer Index' name={`questions.${index}.correctAnswer`} type='number' />
               
                
                <TextInputField<CreateQuizMCQFormType>  isRequired={true} label='Correct Answer Explanation' name={`questions.${index}.explanation`} type='text' />
                 
                <Box sx={{mb:2}}>
                    <Button
                variant="contained"
               
                onClick={() => submitSingleQuestion(field.questionId)} >
                 Submit Question
                </Button>
                </Box>
            </Box>)) 
        }

        <Box sx={{display:"flex",gap:3}}>
            <Button
            onClick={() =>
                append({
                questionId:Date.now().toString(),
                question_text: '',
                options: ['', '', '', ''],
                correctAnswer: "1",
                explanation: ''
                })
            }
            variant="contained"
            
            >
            Add Question
            </Button>
             <Button type='submit'  variant='contained'>
                  submit quiz
            </Button>
        </Box>
    </Box>
        </form>

        <Typography variant='h4' fontWeight={600} sx={{color: theme.palette.primary.light,fontStyle:"italic"}}>
          <Details sx={{fontSize:25,mr:1}}/>
          All Created Questions
        </Typography>
        <Box sx={{backgroundColor:theme.palette.background.paper ,display:"flex",flexDirection:"column",p:2,width:"90%"}}>
        {submittedQuestions.length > 0 ? (
            submittedQuestions.map((q, i) => (
        <Box key={i} sx={{display:"flex",flexDirection:"column",m:2}}>
            <Typography fontWeight="bold">
                    Q{i + 1}: {q.question_text}
            </Typography>
            <Box sx={{display:"flex",gap:5}}>
             {q.options.map((opt, j) => (
                <Typography key={j}>
                    {j+1}. {opt} {parseInt(q.correctAnswer) - 1 === j ? '✅' : ''}
                </Typography> ))}
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
                startIcon={<Delete />}/>

            </Box>
        </Box>))) : (
            <Typography>No questions added yet.</Typography>
            )}
    </Box>
    </Box>
    )
    }

    export default MCQQuizCreateForm
