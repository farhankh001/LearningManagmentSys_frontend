import { ReactNode } from "react";
import { MultiStepFormActions, MultistepFormState } from "./useMultiStepFormhook";
import { Box, Button, LinearProgress, Step, StepLabel, Stepper, Typography, useTheme } from "@mui/material";


interface MultiStepFormWrapperProps{
    state:MultistepFormState;
    actions:MultiStepFormActions;
    children:ReactNode;
    showStepper?:boolean;
    showProgress?:boolean;
    allowStepNavigation?:boolean;
    nextButtonText?:string;
    prevButtonText?:string;
    stepTitles?:string[]
}

export function MultiStepFormWrapper({
  state,
  actions,
  children,
  showStepper = true,
  showProgress = true,
  allowStepNavigation = true,
  nextButtonText = 'Next',
  prevButtonText = 'Previous',
  stepTitles = []
}: MultiStepFormWrapperProps) {
  const theme = useTheme();
  
  const handleNext = async () => {
  
    await actions.nextStep();
    
  };
  
  const handleStepClick = async (stepIndex: number) => {
    if (allowStepNavigation) {
      await actions.goToStep(stepIndex);
    }
  };
  
  return(
    <Box sx={{width:"100%"}}>
         {showProgress && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Step {state.currentStep + 1} of {state.totalSteps}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(state.progress)}% Complete
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={state.progress} 
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>
      )}
      {/* Stepper */}
      {showStepper && (
        <Stepper 
          activeStep={state.currentStep} 
          sx={{ mb: 4 }}
          orientation="horizontal"
        >
          {Array.from({ length: state.totalSteps }, (_, index) => (
            <Step 
              key={index}
              sx={{ 
                cursor: allowStepNavigation ? 'pointer' : 'default',
                '& .MuiStepLabel-root': {
                  cursor: allowStepNavigation ? 'pointer' : 'default'
                }
              }}
              onClick={() => handleStepClick(index)}
            >
              <StepLabel>
                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {stepTitles[index] || `Step ${index + 1}`}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}


       <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          {state.currentStepInfo.title}
        </Typography>
        {state.currentStepInfo.description && (
          <Typography variant="body2" color="text.secondary">
            {state.currentStepInfo.description}
          </Typography>
        )}
      </Box>
       <Box sx={{ mb: 4 }}>
        {children}
      </Box>
      
      {/* Navigation Buttons */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        pt: 2,
        borderTop: 1,
        borderColor: 'divider'
      }}>
        <Button
          onClick={actions.prevStep}
          disabled={state.isFirstStep}
          variant="outlined"
          sx={{ minWidth: 100 }}
        >
          {prevButtonText}
        </Button>
       
        
      {state.isLastStep ? (
  <Button
    type="submit"
    variant="contained"
    sx={{ minWidth: 100 }}
  >
    Submit
  </Button>
) : (
  <Button
    onClick={handleNext}
    variant="contained"
    sx={{ minWidth: 100 }}
  >
    {nextButtonText}
  </Button>
)}

        
      </Box>
    </Box>
  )
}