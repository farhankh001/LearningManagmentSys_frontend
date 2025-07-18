import type { ReactNode } from "react";
import type { MultiStepFormActions, MultistepFormState } from "./useMultiStepFormhook";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
  alpha,
  useMediaQuery,
  LinearProgress,
  Fade,
  Slide,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Chip,
  Container
} from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  ArrowBack,
  ArrowForward,
  Send,
  Info
} from "@mui/icons-material";

interface MultiStepFormWrapperProps {
  state: MultistepFormState;
  actions: MultiStepFormActions;
  children: ReactNode;
  showStepper?: boolean;
  showProgress?: boolean;
  allowStepNavigation?: boolean;
  nextButtonText?: string;
  prevButtonText?: string;
  stepTitles?: {
    steptitle: string;
    instructions: string;
  }[];
}

export function HorizontalMultiStepFormWrapper({
  state,
  actions,
  children,
  showStepper = true,
  showProgress = true,
  allowStepNavigation = true,
  nextButtonText = "Next",
  prevButtonText = "Previous",
  stepTitles = [{
    steptitle: "",
    instructions: ""
  }],
}: MultiStepFormWrapperProps) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));


  const handleNext = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    await actions.nextStep();
  };

  const handleStepClick = async (stepIndex: number) => {
    if (allowStepNavigation) {
      await actions.goToStep(stepIndex);
    }
  };


  const StepIcon = ({ active, completed }: { active: boolean; completed: boolean }) => {
    if (completed) {
      return (
        <CheckCircle
          sx={{
            color: theme.palette.success.main,
            fontSize: isXs ? 20 : 24,
            filter: 'drop-shadow(0 0 8px rgba(76, 175, 80, 0.4))'
          }}
        />
      );
    }
    return (
      <RadioButtonUnchecked
        sx={{
          fontSize: 10,
          color: theme.palette.warning.light,
          boxShadow: `0 0 6px 2px ${theme.palette.warning.light}`,
          borderRadius: '50%',
          background: theme.palette.warning.light
        }}
      />
    );
  };

  return (
    <Box maxWidth="xl" sx={{ py: { xs: 2, md: 1 } }}>
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 2, md: 3 },
            height: { lg: "auto" },
          }}
        >
          {/* Stepper Side */}
          {showStepper && (
            <Slide in direction="right" timeout={600}>
              <Card
                elevation={0}
                sx={{
                  width: { xs: "100%", lg: "320px" },
                  minWidth: { lg: "320px" },
                  background: `linear-gradient(135deg, 
                    ${alpha(theme.palette.primary.dark, 0.9)} 0%, 
                    ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
                  border: "2px solid",
                  borderColor: theme.palette.divider,
                  borderRadius: 4,
                  backdropFilter: "blur(10px)",
                  height: "fit-content",
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ mb: 3, color: theme.palette.text.primary, textShadow: `0 0 12px ${theme.palette.warning.light}` }}
                  >
                    Progress Overview
                  </Typography>

                  <Stepper
                    activeStep={state.currentStep}
                    orientation="vertical"
                    sx={{
                      "& .MuiStepConnector-line": {
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        borderWidth: 2,
                        marginLeft: 1,
                      }
                    }}
                  >
                    {stepTitles.map((step, index) => {
                      const isActive = state.currentStep === index;
                      const isCompleted = state.currentStep > index;

                      return (
                        <Step key={step.steptitle}>
                          <StepLabel
                            icon={<StepIcon active={isActive} completed={isCompleted} />}
                            sx={{
                              cursor: allowStepNavigation ? "pointer" : "default",
                              borderRadius: 2,
                              p: 1.5,
                              mx: -1.5,
                              transition: "all 0.3s ease",
                              ...(isActive && {
                                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`,
                              }),
                              "&:hover": allowStepNavigation ? {
                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                transform: "translateX(4px)",
                              } : {},
                              "& .MuiStepLabel-labelContainer": {
                                ml: 1,
                              }
                            }}
                            onClick={() => handleStepClick(index)}
                          >
                            <Box>
                              <Typography
                                variant="body2"
                                fontWeight={isActive ? 600 : 500}
                                sx={{
                                  color: isActive
                                    ? theme.palette.warning.light
                                    : theme.palette.text.secondary,
                                  mb: 0.5,
                                  fontSize: isXs ? "0.875rem" : "0.9rem"
                                }}
                              >
                                {step.steptitle}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: theme.palette.text.secondary,
                                  fontSize: isXs ? "0.7rem" : "0.75rem",
                                  display: "block",
                                  lineHeight: 1.3
                                }}
                              >
                                {step.instructions}
                              </Typography>
                            </Box>
                          </StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </CardContent>
              </Card>
            </Slide>
          )}

          {/* Form Content Side */}
          <Slide in direction="left" timeout={600}>
            <Card
              elevation={0}
              sx={{
                flexGrow: 1,
                background: `linear-gradient(135deg, 
                  ${alpha(theme.palette.primary.dark, 0.8)} 0%, 
                  ${alpha(theme.palette.background.paper, 0.5)} 100%)`,
                borderRadius: 4,
                border: "2px solid",
                borderColor: theme.palette.divider,
                backdropFilter: "blur(10px)",
                minHeight: { lg: "600px" },
              }}
            >
              <CardContent sx={{ p: { xs: 4, md: 5 }, height: "100%" }}>
                {/* Step Header */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                      variant={isXs ? "h5" : "h4"}
                      fontWeight={700}
                      sx={{
                        textShadow: `0 0 16px ${theme.palette.warning.light}`,
                      }}
                    >
                      {stepTitles[state.currentStep]?.steptitle || "Step"}
                    </Typography>
                    <Tooltip title="Step Information">
                      <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
                        <Info fontSize="small" sx={{
                          fontSize: 17,
                          color: theme.palette.warning.light,
                          boxShadow: `0 0 10px 2px ${theme.palette.warning.light}`,
                          borderRadius: '50%',
                          background: theme.palette.text.primary
                        }} />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: isXs ? "0.7rem" : "0.8rem",
                      lineHeight: 1.6,
                      maxWidth: "600px"
                    }}
                  >
                    {state.currentStepInfo.description}
                  </Typography>
                </Box>

                {/* Form Content */}
                <Box sx={{ mb: 4, minHeight: "200px" }}>
                  <Fade in timeout={400}>
                    <div>{children}</div>
                  </Fade>
                </Box>

                {/* Navigation Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    mt: "auto",
                    pt: 2,
                    mb: 2,

                  }}
                >
                  <Button
                    onClick={actions.prevStep}
                    disabled={state.isFirstStep}
                    variant="contained"
                    startIcon={<ArrowBack />}
                    sx={{
                      minWidth: { xs: "100%", sm: 140 },
                      border: "1px solid",
                      borderColor: theme.palette.divider,
                      borderRadius: 4,
                      background: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                      "&:hover": {

                        transform: "translateY(-1px)",
                      },
                      "&:disabled": {
                        borderColor: alpha(theme.palette.text.disabled, 0.3),
                        color: theme.palette.text.disabled,
                      }
                    }}
                  >
                    {prevButtonText}
                  </Button>

                  {state.isLastStep ? (
                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<Send />}
                      sx={{

                        borderRadius: 3,
                        background: `linear-gradient(135deg, 
                          ${theme.palette.success.main} 0%, 
                          ${theme.palette.success.dark} 100%)`,
                        fontSize: "0.95rem",
                        fontWeight: 600,

                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: `linear-gradient(135deg, 
                            ${theme.palette.success.dark} 0%, 
                            ${theme.palette.success.main} 100%)`,

                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      variant="contained"
                      endIcon={<ArrowForward />}
                      sx={{
                        minWidth: { xs: "100%", sm: 140 },
                        border: "1px solid",
                        borderColor: theme.palette.divider,
                        borderRadius: 4,
                        background: theme.palette.primary.main,
                        fontSize: "0.95rem",
                        fontWeight: 600,

                        transition: "all 0.3s ease",
                        "&:hover": {

                          boxShadow: `0 0 4px 1px ${theme.palette.primary.main}`,
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      {nextButtonText}
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Slide>
        </Box>
      </Box>

    </Box>
  );
}