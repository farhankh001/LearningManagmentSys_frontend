import { Box, Button, Typography, useTheme, Stepper, Step, StepLabel, MobileStepper, useMediaQuery, ListItemIcon, Divider, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useAttemptedMCQByStudentSubmitMutation, useMcqAttemptStatusCheckQuery } from '../../../app/api/lessonApi'
import MCQSInputField from '../../../components/Forms/InputFields/MCQSInputField'
import { useFormContext } from 'react-hook-form'
import { SubmitMCQByStudentType } from '../../../types/quiz-mcqs-types'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { KeyboardArrowLeft, KeyboardArrowRight, AccountCircle, ApprovalRounded, Pending, Thunderstorm, ArrowForward, Forward, Insights } from '@mui/icons-material'
import McqQuizResult from './McqQuizResult'
import { useState } from 'react'
import RadialChartWithStyledBg from '../../dashboards/Charts/RaicalChartWithStyledBg'

interface MCQQuizAttemptFormProps {
  title: string;
  questions: {
    id: string;
    question_text: string;
    options: string[];
  }[] | undefined;
}

const instructions=[
    {
        name:"Attempt All Given Question",
        icon:<Pending />
    }, 
     {
        name:"You Can Submit Quiz Once",
        icon:<ApprovalRounded />
    }, 
     {
        name:"Select one option",
        icon:<AccountCircle/>
    }, 

]

function MCQQuizAttemptFrom({ questions, title }: MCQQuizAttemptFormProps) {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [activeStep, setActiveStep] = useState(0)

  const [attemptedMCQData] = useAttemptedMCQByStudentSubmitMutation()
  const { data: attemptData, error: mcqAttemptError, isError: mcqAttemptIsError } = useMcqAttemptStatusCheckQuery({ lessonId })
  const { handleSubmit, control, watch } = useFormContext<SubmitMCQByStudentType>()
  
  // Watch answers array to get current values
  const answers = watch('answers');
  const currentAnswer = answers?.[activeStep]?.selectedAnswerIndex ?? -1;

  const isCurrentQuestionAnswered = answers?.[activeStep]?.selectedAnswerIndex >= 0
  const isLastQuestion = activeStep === (questions?.length ?? 0) - 1
  
  const handleNext = () => {
    if (isCurrentQuestionAnswered) {
      setActiveStep((prev) => Math.min(prev + 1, (questions?.length ?? 0) - 1))
    }
  }
    
  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0))
  }
  const progress=(activeStep/(questions?.length??1))*100
  const submitHandler = async (data: SubmitMCQByStudentType) => {
    try {
      const response = await attemptedMCQData(data)
      if (!response?.data?.submissionId) {
        toast.error("No submission Id was returned. You may have already attempted this Quiz.")
      } else {
        navigate(`/view-mcq-results-std/${response?.data?.submissionId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (mcqAttemptIsError) {
    return <Box>{JSON.stringify(mcqAttemptError)}</Box>
  }

  if (attemptData?.hasAttempted) {
    return <McqQuizResult 
      results={attemptData.results} 
      title={attemptData.lessonTitle} 
      desc="You have Already Attempted this Quiz" 
      hasAttempted={attemptData.hasAttempted} 
    />
  }
    

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center",gap:2,justifyContent:"center" }}>
      
     <Box sx={{width:"60%", border: "1px solid",
              borderColor: theme.palette.divider,
              p:5,
              margin: 2,
              borderRadius: 4,
              background: theme.palette.primary.dark,}}>
                
        <Typography sx={{display:'flex',alignItems:"center",justifyContent:'center',gap:2,mb:1, background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}} variant="h5" fontWeight={600}><span>Quiz {title}</span> <Insights  sx={{color:theme.palette.warning.light}} /></Typography>
       {questions && (
        <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 ,display:"flex",flexDirection:"row"}}>
          {questions.map((_, index) => (
            <Step key={index}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
      )}

      <Box sx={{ width: "100%" }}>
       
        <form onSubmit={handleSubmit(submitHandler)}>
          {questions && (
            <Box sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "",
              justifyContent: "center"
            }}>
              
              {<Typography variant='body1' sx={{opacity:0.7,ml:1}}> Question {activeStep + 1} of {questions.length}</Typography>}
              <MCQSInputField<SubmitMCQByStudentType>
                label='Multiple Choice Questions'
                name={`answers.${activeStep}.selectedAnswerIndex`}
                question={{
                  id: questions[activeStep].id,
                  question_text: questions[activeStep].question_text,
                  options: questions[activeStep].options
                }}
                isRequired={true}
                key={activeStep} // Add key to force re-render on step change
              />
            </Box>
          )}

          <MobileStepper
            variant="progress"
            steps={questions?.length ?? 0}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: '100%', flexGrow: 1,background:theme.palette.primary.dark ,mt:3}}
            nextButton={
              isLastQuestion ? (
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={currentAnswer === -1} // Use currentAnswer state
                >
                  Submit
                </Button>
              ) : (
                <Button 
                  size="small" 
                  onClick={handleNext}
                  disabled={currentAnswer === -1} // Use currentAnswer state
                >
                  Next
                  <KeyboardArrowRight />
                </Button>
              )
            }
            backButton={
              <Button 
                size="small" 
                onClick={handleBack} 
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </form>
      </Box>

     </Box>
      <Box sx={{width:"20%",display:"flex",flexDirection:"column",gap:2}}>
         <Box sx={{width:"100%",height:"255px"}}>
        <RadialChartWithStyledBg  overAllProgressPercentage={progress} title='Progress' />
        
      </Box>
        <Box sx={{display:"flex",flexDirection:"column",background:theme.palette.primary.dark,border:"1px solid",borderColor:theme.palette.divider,borderRadius:4,p:1}}>
           <Typography>
            <Thunderstorm/>
           </Typography>
                   {
                    instructions.map((item)=><Box  key={item.name} sx={{bgcolor:theme.palette.primary.main,border:"1px solid",borderRadius:2,borderColor:theme.palette.divider,margin:0.5}}>
                            <ListItem disablePadding>
                            <ListItemButton  >
                                <ListItemIcon >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText >
                                    {item.name}
                                </ListItemText>
                          </ListItemButton>
                          </ListItem>
                          <Divider/>
                          </Box>)
                   }
                   </Box>
      </Box>

    </Box>
  )
}

export default MCQQuizAttemptFrom
