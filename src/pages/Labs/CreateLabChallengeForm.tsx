import { Alert, Box, useTheme } from '@mui/material'
import { useCreateLabChallengeMutation } from '../../app/api/labApi';
import { CreateLabChallengeFormType } from '../../types/create_lab.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { StepDefinition, useMultiStepForm } from '../../components/MultistepFormSetup/useMultiStepFormhook';
import TextAreaField from '../../components/Forms/InputFields/TextAreaField';
import SelectInputField from '../../components/Forms/InputFields/SelectInputField';
import TextInputField from '../../components/Forms/InputFields/TextInputField';
import { HorizontalMultiStepFormWrapper } from '../../components/MultistepFormSetup/HorizontalFormWrapper';

function CreateLabChallengeForm() {
  const { labId } = useParams();
  const [createChallenge, { isLoading, isSuccess, isError, error }] = useCreateLabChallengeMutation();
  const { handleSubmit } = useFormContext<CreateLabChallengeFormType>()
  const navigate = useNavigate()
  const theme = useTheme()
  const { reset } = useFormContext<CreateLabChallengeFormType>()

  useEffect(() => {
    if (isSuccess) {
      toast.success("Challenge created successfully. Create another.")
      reset();

    }
  }, [isSuccess, reset]);
  const handleChallengeCreation = async (data: CreateLabChallengeFormType) => {
    try {
      const payload = {
        ...data,
        labId: labId, // courseId is a string from useParams
      };
      await createChallenge(payload).unwrap();
    } catch (err: any) {

      console.error(err);
    }
  }
  const steps: StepDefinition<CreateLabChallengeFormType>[] = [
    {
      id: 'basic-info',
      title: 'Lab Challenge Basic Information',
      description: 'Lab Challenge Basic Detais like challenge question, description and answer.',
      instructions: "Enter basic challenge information",
      fields: ['challenge_text', 'description', 'answer_string_type']
    },

    {
      id: 'details',
      title: 'Lab Challenge Details',
      description: 'Information about lab challenge, challenge correct answer, a hint for student and maximum score.',
      instructions: "Enter your challange details",
      fields: ['correct_solution', 'sample_input', 'max_score']
    },

  ];

  const [multiStepState, multiStepActions] = useMultiStepForm<CreateLabChallengeFormType>({
    steps,
    onStepChange: (step, direction) => {
      console.log(`Moved to step ${step + 1} (${direction})`);
    }
  });
  const renderCurrentStepFields = () => {
    const currentStepId = multiStepState.currentStepInfo.id;
    switch (currentStepId) {
      case "basic-info":
        return (
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }} >
            <TextAreaField<CreateLabChallengeFormType> isRequired={true} label="Challenge Text" name='challenge_text' type='text' rows={5} key={"challenge_text"} />
            <TextAreaField<CreateLabChallengeFormType> isRequired={true} label="Challenge Description" name='description' type='text' rows={5} key={"description"} />
            <SelectInputField<CreateLabChallengeFormType> isRequired={false} label='Challenge Answer Type' name='answer_string_type' options={["Code", "Text", "Flag"]} key={"answer_string_type"} />
          </Box>
        );
      case "details":
        return (
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
            <TextAreaField<CreateLabChallengeFormType> isRequired={true} label="Correct Solution" name='correct_solution' type='text' rows={5} key={"correct_solution"} />
            <TextAreaField<CreateLabChallengeFormType> isRequired={true} label="Sample Input" name='sample_input' type='text' rows={5} key={"sample_input"} />
            <TextInputField<CreateLabChallengeFormType> isRequired={true} label="Max Score" name='max_score' type='text' key={"max_score"} />
          </Box>
        )
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: "column",
        gap: 1,
        width: "100%",
        alignItems: "center", justifyContent: "center"
      }}
    >



      <Box sx={{ width: "90%" }} >
        {isSuccess && (
          <Alert severity="success" sx={{ mb: 1 }}>
            Challenge Created Successfully. Create Another...
          </Alert>
        )}

        {isError && error && 'data' in error &&
          <Alert severity="error" sx={{ mb: 1 }}>
            {JSON.stringify((error.data as any).error)}
          </Alert>
        }


        <form onSubmit={handleSubmit(handleChallengeCreation)}>
          <HorizontalMultiStepFormWrapper state={multiStepState} actions={multiStepActions} stepTitles={steps.map(step => {
            return {
              steptitle: step.title,
              instructions: step.instructions
            }
          })}
          >
            {renderCurrentStepFields()}
          </HorizontalMultiStepFormWrapper>
        </form>


      </Box>
    </Box>

  )
}

export default CreateLabChallengeForm
