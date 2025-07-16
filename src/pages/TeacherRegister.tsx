import { TeacherRegisterType } from '../types/register.types';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Box,Typography, useTheme} from '@mui/material';
import TextInputField from '../components/Forms/InputFields/TextInputField';
import { useRegisterTeacherMutation } from '../app/api/userApi';
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







function TeacherRegister() {
  const navigate = useNavigate();
  const { handleSubmit,  reset } = useFormContext<TeacherRegisterType>();
  const [registerTeacher, { isSuccess, isError, error }] = useRegisterTeacherMutation();
  const categories = useSelector((state: RootState) => state.categories.categories);
  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success("Registered Successfully.")
      setTimeout(() => { 
        navigate('/login');
      }, 1000);
    }
  }, [isSuccess, navigate, reset]);
 useEffect(()=>{
if(isError&&error&&"data" in error){
  console.log(error)
  toast.error(`${JSON.stringify((error.data as any).error)}`)
}
 },[isError,error])
  const submitForm: SubmitHandler<TeacherRegisterType> = async (data: TeacherRegisterType) => {
    try {
    //   let profile_picture_url=""
    //   if (data.profile_picture instanceof File) {
    //   const profile_picture=await uploadToCloudinary(data.profile_picture,(percent)=>setUploadProgress({image:percent}))
    //   profile_picture_url=profile_picture
    // }
    //   const teacherData = {
    //     name: data.name,
    //     email: data.email,
    //     password: data.password,
    //     role: data.role,
    //     profile_picture:profile_picture_url,
    //     teacher_qualifications:data.qualifications,
    //     teacher_expertise:data.teacher_expertise
      
    //   };
    const formData=new FormData()
    formData.append("name",data.name)
    formData.append("email",data.email)
    formData.append("password",data.password)
    formData.append("role",data.role)
    formData.append("qualifications",data.qualifications)
    data.teacher_expertise.forEach((item: string) => {
     formData.append("teacher_expertise[]", item);
        });
    if (data.profile_picture instanceof File) {
        formData.append("profile_picture",data.profile_picture)
    }
    console.log(formData)
      await registerTeacher(formData).unwrap();
      
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };
const theme=useTheme()








  const steps: StepDefinition<TeacherRegisterType>[] = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      description: 'Enter your personal details',
      instructions:"Enter Your Personal Details",
      fields: ['name', 'email', 'password','profile_picture']
    },
    
    {
      id: 'teacher-info',
      title: 'Academic Information',
      description: 'Tell us about your education',
      instructions:"Enter your education and interests.",
      fields: ['role','qualifications', 'teacher_expertise']
    },

  ];

  const [multiStepState, multiStepActions] = useMultiStepForm<TeacherRegisterType>({
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
          <Box sx={{ display: 'flex', flexDirection:"column", gap: 3 }}>
            <TextInputField<TeacherRegisterType>
              key="Fullname-field"
              isRequired={true}
              label="Full Name"
              name="name"
              type="text"
              hideData={false}
            />
            <TextInputField<TeacherRegisterType>
              key="Email-field"
              isRequired={true}
              label="Email"
              name="email"
              type="email"
              hideData={false}
            />
            <TextInputField<TeacherRegisterType>
              key="Password-field"
              isRequired={true}
              label="Password"
              name="password"
              type="password"
              hideData={true}
            />
           
             <FileInputField<TeacherRegisterType>
              key="Profile-picture-field"
              isRequired={true}
              label="Profile Picture"
              name="profile_picture"
              fileType={['image/jpeg', 'image/jpg', 'image/png', 'image/webp']}
              maxFiles={1}
              maxSize={100000}
            />
          </Box>
        );
        
      case 'teacher-info':
        return (

          <Box sx={{ display: 'flex',flexDirection:"column", gap: 3 }}>
             <SelectInputField<TeacherRegisterType>
              key="Role-field"
              isRequired={true}
              label="Role"
              name="role"
              options={["Teacher"]}
            />
           
            <MultipleSelectInputField<TeacherRegisterType>
              key="Expertise-field"
              isRequired={true}
              label="Expertise"
              name="teacher_expertise"
              options={categories || ["Others"]}
            />

             <TextInputField<TeacherRegisterType>
              key="Qualifications-field"
              isRequired={true}
              label="Qualifications/Speciality"
              name="qualifications"
              type='text'
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
        display: 'flex',
        backgroundColor: 'background.default',
        flexDirection:{ xs:"column",md:"row", }}}

    >  
      
    <Box
        sx={{
          width:  '100%' ,
          boxShadow: 1,
        
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          flexDirection:"column"

        }}
      >
      
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color:theme.palette.text.primary,
            mb: 1,
            textAlign: 'center'
          }}
        >
          Register as Teacher
        </Typography>
        <Box sx={{width:"80%"}}>
        <form onSubmit={handleSubmit(submitForm)}>
        <MultiStepFormWrapper
          state={multiStepState}
          actions={multiStepActions}
           stepTitles={steps.map(step =>{
            return {
              steptitle:step.title,
              instructions:step.instructions
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

export default TeacherRegister;
