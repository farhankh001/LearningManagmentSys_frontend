import { RegisterType } from '../types/register.types';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Box } from '@mui/material';
import TextInputField from '../components/Forms/InputFields/TextInputField';
import { useRegisterUserMutation } from '../app/api/userApi';
import { useNavigate } from 'react-router-dom';
import FileInputField from '../components/Forms/InputFields/FileInputField';
import { useEffect } from 'react';
import MultipleSelectInputField from '../components/Forms/InputFields/MultipleSelectField';
import SelectInputField from '../components/Forms/InputFields/SelectInputField';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import toast from 'react-hot-toast';

import { StepDefinition, useMultiStepForm } from '../components/MultistepFormSetup/useMultiStepFormhook';
import { MultiStepFormWrapper } from '../components/MultistepFormSetup/MultiStepFromWrapper';





function Register() {

  const navigate = useNavigate();
  const { handleSubmit, reset } = useFormContext<RegisterType>();
  const [registerUser, { isSuccess, isError, error }] = useRegisterUserMutation();
  const categories = useSelector((state: RootState) => state.categories.categories);
  useEffect(() => {
    if (isSuccess) {
      reset();
      setTimeout(() => {
        toast.success("Registered Successfully.")
        navigate('/login');
      }, 1000);
    }
  }, [isSuccess, navigate, reset]);
  useEffect(() => {
    if (isError && error && "data" in error) {
      console.log(error)
      toast.error(`${JSON.stringify((error.data as any).error)}`)
    }
  }, [isError, error])
  const submitForm: SubmitHandler<RegisterType> = async (data: RegisterType) => {
    try {
      //   let profile_picture_url=""
      //   if (data.profile_picture instanceof File) {
      //   const profile_picture=await uploadToCloudinary(data.profile_picture,(percent)=>setUploadProgress({image:percent}))
      //   profile_picture_url=profile_picture
      // }
      //   const studentData = {
      //     name: data.name,
      //     email: data.email,
      //     password: data.password,
      //     role: data.role,
      //     profile_picture:profile_picture_url,
      //     education_level:data.education_level,
      //     interests:data.interests
      //   };
      const formData = new FormData;
      formData.append("name", data.name);
      formData.append("email", data.email)
      formData.append("password", data.password)
      formData.append("role", data.role)
      formData.append("education_level", data.education_level)
      data.interests.forEach((item: string) => {
        formData.append("interests[]", item);
      });
      if (data.profile_picture instanceof File) {
        formData.append("profile_picture", data.profile_picture)
      }

      // console.log()
      await registerUser(formData).unwrap();

    } catch (err) {
      console.error('Registration failed:', err);
    }
  };






  const steps: StepDefinition<RegisterType>[] = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      description: 'Enter your personal details',
      instructions: "Enter Your Personal Details",
      fields: ['name', 'email', 'password', 'profile_picture']
    },

    {
      id: 'student-info',
      title: 'Academic Information',
      description: 'Tell us about your education',
      instructions: "Enter your education and interests.",
      fields: ['role', 'education_level', 'interests']
    },

  ];

  const [multiStepState, multiStepActions] = useMultiStepForm<RegisterType>({
    steps,
    onStepChange: (step, direction) => {
      console.log(`Moved to step ${step + 1} (${direction})`);
    }
  });


  const renderCurrentStepFields = () => {

    const currentStepId = multiStepState.currentStepInfo.id;

    switch (currentStepId) {
      case 'basic-info':
        return (
          <Box sx={{ display: 'grid', gridTemplateColumns: "1fr", gap: 3 }}>
            <TextInputField<RegisterType>
              isRequired={true}
              label="Full Name"
              name="name"
              type="text"
              hideData={false}
            />
            <TextInputField<RegisterType>
              isRequired={true}
              label="Email"
              name="email"
              type="email"
              hideData={false}
            />
            <TextInputField<RegisterType>
              isRequired={true}
              label="Password"
              name="password"
              type="password"
              hideData={true}
            />

            <FileInputField<RegisterType>
              isRequired={true}
              label="Profile Picture"
              name="profile_picture"
              fileType={['image/jpeg', 'image/jpg', 'image/png', 'image/webp']}
              maxFiles={1}
              maxSize={100000}
            />
          </Box>
        );

      case 'student-info':
        return (

          <Box sx={{ display: 'flex', flexDirection: "column", gap: 3 }}>
            <SelectInputField<RegisterType>
              isRequired={true}
              label="Role"
              name="role"
              options={["Student"]}
            />
            <SelectInputField<RegisterType>
              isRequired={true}
              label="Education Level"
              name="education_level"
              options={[
                "Primary",
                "Middle",
                "HighSchool",
                "Bachelor",
                "Masters",
                "Doctorate",
                "PhD",
                "Others"]}
            />
            <MultipleSelectInputField<RegisterType>
              isRequired={true}
              label="Interests"
              name="interests"
              options={categories || ["Others"]}
            />
          </Box>
        );

      default:
        return null;
    }
  };


  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        backgroundColor: 'background.default',
        flexDirection: { xs: "column", md: "row", },
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Box
        sx={{
          width: '80%',
          boxShadow: 1,
          padding: { xs: 3, sm: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"

        }}
      >


        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit(submitForm)}>
            <MultiStepFormWrapper
              state={multiStepState}
              actions={multiStepActions}
              stepTitles={steps.map(step => {
                return {
                  steptitle: step.title,
                  instructions: step.instructions
                }
              })}

            >
              {renderCurrentStepFields()}
            </MultiStepFormWrapper>
          </form>
        </Box>
      </Box>


    </Box>
  );
}

export default Register;

