import type { ReactNode } from "react";
import type { MultiStepFormActions, MultistepFormState } from "./useMultiStepFormhook";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,alpha
} from "@mui/material";


// const colorMap: Record<number, string> = {
//   1: '#ffcc40',
//   2: '#5bfccc',
//   3: '#f36dfc',
//   4: '#ded63a',
//   5: '#34ad77',
// };

interface MultiStepFormWrapperProps {
  state: MultistepFormState;
  actions: MultiStepFormActions;
  children: ReactNode;
  showStepper?: boolean;
  showProgress?: boolean;
  allowStepNavigation?: boolean;
  nextButtonText?: string;
  prevButtonText?: string;
  stepTitles?: { steptitle:string,
              instructions:string}[];
}

export function MultiStepFormWrapper({
  state,
  actions,
  children,
  showStepper = true,
  allowStepNavigation = true,
  nextButtonText = "Next",
  prevButtonText = "Previous",
  stepTitles = [{
        steptitle:"",
        instructions:""
  }],
}: MultiStepFormWrapperProps) {
  const theme = useTheme();

  const handleNext = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    await actions.nextStep();
  };

  const handleStepClick = async (stepIndex: number) => {
    if (allowStepNavigation) {
      await actions.goToStep(stepIndex);
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", py:1,}}>
     
      <Box
        sx={{
          width: "90%",
          maxWidth: "1300px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          background: theme.palette.primary.dark,
          borderRadius: "16px",
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Stepper Side */}
        {showStepper && (
          <Box
            sx={{
              width: { xs: "100%", md: "33%" },
              backgroundColor:theme.palette.background.paper,
              px: { xs: 3, md: 4 },
              py: { xs: 3, md: 5 },
              borderRight: { md: `1px solid ${theme.palette.divider}` },
            }}
          >
            <Stepper activeStep={state.currentStep} orientation="vertical" sx={{ gap: 2 }}>
              {stepTitles.map((step, index) => (
                <Step key={step.steptitle} onClick={() => handleStepClick(index)}>
                  <StepLabel
  sx={{
    cursor: allowStepNavigation ? "pointer" : "default",
    backgroundColor:alpha(theme.palette.primary.dark,0.4),
    borderRadius: 2,
    border: "1px solid",
    borderColor: theme.palette.divider,
    p: 2,

    "& .MuiStepIcon-root": {
      color:
        state.currentStep === index
          ? theme.palette.success.main
          : theme.palette.grey[700],
    },
    "& .MuiStepLabel-label": {
      color:
        state.currentStep === index
          ? "#fff"
          : theme.palette.grey[400],
      fontWeight: state.currentStep === index ? 600 : 500,
    },
  }}
>

                    <Typography variant="body1">{step.steptitle}</Typography>
                    <Typography variant="caption" color="text.secondary" >
                      {step.instructions}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}

        {/* Form Content Side */}
        <Box sx={{ flexGrow: 1, p: { xs: 3, md: 4 }, backgroundColor: theme.palette.primary.dark }}>
          {/* <Box sx={{mb:1,mt:0,border:"1px solid",borderColor:theme.palette.divider,pb:1,display:"flex",gap:1.5,alignItems:"center",p:2,background:alpha(theme.palette.primary.dark,0.6),borderRadius:2}}>
        
            <Typography variant="body1" fontWeight={300}> {state.currentStepInfo.description}</Typography>
          </Box> */}
          {children}

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              onClick={actions.prevStep}
              disabled={state.isFirstStep}
              variant="outlined"
              sx={{
                minWidth: 120,
                borderRadius: "999px",
                borderColor: theme.palette.grey[700],
                color: theme.palette.grey[300],
              }}
            >
              {prevButtonText}
            </Button>

            {state.isLastStep ? (
              <Button
                type="submit"
                variant="contained"
                sx={{
                  minWidth: 120,
                  borderRadius: "999px",
                  background: "linear-gradient(to right, #3b82f6, #22c55e)",
                }}
              >
                Submit
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="contained"
                type="button"
                sx={{
                  minWidth: 120,
                  borderRadius: "999px",
                  background: "linear-gradient(to right,rgb(83, 255, 186),rgb(14, 209, 86))",
                }}
              >
                {nextButtonText}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
