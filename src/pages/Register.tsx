import { RegisterType } from '../types/register.types';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Box, Alert, Typography, useTheme, LinearProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import TextInputField from '../components/Forms/InputFields/TextInputField';
import { useRegisterUserMutation } from '../app/api/userApi';
import { useNavigate, Link } from 'react-router-dom';
import FileInputField from '../components/Forms/InputFields/FileInputField';
import { useEffect, useState } from 'react';
import MultipleSelectInputField from '../components/Forms/InputFields/MultipleSelectField';
import SelectInputField from '../components/Forms/InputFields/SelectInputField';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import toast from 'react-hot-toast';
// import { uploadToCloudinary } from '../utils/uploadToCloundinary';
import { StepDefinition, useMultiStepForm } from '../components/MultistepFormSetup/useMultiStepFormhook';
import { MultiStepFormWrapper } from '../components/MultistepFormSetup/MultiStepFromWrapper';
import { SvgIconComponent, ArtTrack, Quiz, Insights, SupportAgent } from '@mui/icons-material';

interface Feature {
  icon: SvgIconComponent;
  text: string;
}

const registerBenefits: Feature[] = [
  { icon: ArtTrack, text: 'Full access to all courses' },
  { icon: Quiz, text: 'Take interactive quizzes and assessments' },
  { icon: Insights, text: 'Track your progress and achievements' },
  { icon: SupportAgent, text: 'Get mentor support and consultation' }
];


function Register() {
  // const [uploadProgress, setUploadProgress] = useState({  image: 0, })
  const navigate = useNavigate();
  const { handleSubmit, watch, reset } = useFormContext<RegisterType>();
  const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const currentRole = watch('role');
  useEffect(() => {
    if (isSuccess) {
      reset();
      setTimeout(() => { 
        toast.success("Registered Successfully.")
        navigate('/login');
      }, 1000);
    }
  }, [isSuccess, navigate, reset]);

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
    const formData=new FormData;
    formData.append("name",data.name);
    formData.append("email",data.email)
    formData.append("password",data.password)
    formData.append("role",data.role)
    formData.append("education_level",data.education_level)
    data.interests.forEach((item: string) => {
     formData.append("interests[]", item);
        });
    if (data.profile_picture instanceof File) {
        formData.append("profile_picture",data.profile_picture)
    }

    // console.log()
      await registerUser(formData).unwrap();
      
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };
const theme=useTheme()

if(isError&&error&&"data" in error){
  console.log(error)
  toast.error(`${JSON.stringify((error.data as any).error)}`)
}



  const steps: StepDefinition<RegisterType>[] = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      description: 'Enter your personal details',
      fields: ['name', 'email', 'password','profile_picture']
    },
    
    {
      id: 'student-info',
      title: 'Academic Information',
      description: 'Tell us about your education',
      fields: ['role','education_level', 'interests']
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
          <Box sx={{ display: 'flex', flexDirection:"column", gap: 3 }}>
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

          <Box sx={{ display: 'flex',flexDirection:"column", gap: 4 }}>
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
                "PRIMARY_SCHOOL", "MIDDLE_SCHOOL", "HIGH_SCHOOL",
                "BACHELOR", "MASTERS", "DOCTORATE", "PHD", "OTHER"
              ]}
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
        flexDirection:{ xs:"column",md:"row", }}}
    >  
    <Box
  sx={{
    backgroundColor: theme.palette.background.paper,
    minHeight: { xs: '40%', md: '100%' },
    minWidth: '30%',
    display: {
      xs: 'none', // Hide on small devices
      md: 'flex',
    },
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 3,
    px: 4,
    py: 6,
  }}
>
  <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
    Why Create an Account?
  </Typography>

  {registerBenefits.map((benefit, index) => {
    const Icon = benefit.icon;
    return (
      <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Icon color="primary" />
        <Typography variant="body1" fontWeight={500}>
          {benefit.text}
        </Typography>
      </Box>
    );
  })}
</Box>
      
    <Box
        sx={{
          width:  '100%' ,
          // backgroundColor: "blue",
          minWidth:"60%",
          boxShadow: 1,
          padding: { xs: 3, sm: 4 },
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
          Create Account
        </Typography>
        <Box sx={{width:"70%"}}>
        <form onSubmit={handleSubmit(submitForm)}>
        <MultiStepFormWrapper
          state={multiStepState}
          actions={multiStepActions}
          stepTitles={steps.map(step => step.title)}
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


















  // {isSuccess && (
  //         <Alert severity="success" sx={{ mb: 2 }}>
  //           Registration successful! Redirecting to login...
  //         </Alert>
  //       )}

  //     {isError && error && 'data' in error &&
  //             <Alert severity="error" sx={{ mb: 2 }}>
  //                   {JSON.stringify((error.data as any).error)}  
  //              </Alert>
  //               }
  //      {uploadProgress.image > 0 && (
  //       <Box sx={{margin:3,display:"flex",flexDirection:'column',gap:3}}>
  //         <Typography variant="body2">Uploading Image: {uploadProgress.image}%</Typography>
  //         <LinearProgress variant="determinate" value={uploadProgress.image} sx={{color:theme.palette.success.main}} />
  //       </Box>
  //     )}




//  <Box sx={{

//             display: 'grid',
//             gridTemplateColumns: { xs: '1fr', sm: '1fr ', md: '1fr 1fr ',lg:"1fr 1fr" },
//             gap: { xs: 2, md: 2},
//             justifyContent: 'center',

//           }}>
//             <TextInputField<RegisterType>
//               isRequired={true}
//               label="Full Name"
//               name="name"
//               type="text"
//               hideData={false}
//             />
//             <TextInputField<RegisterType>
//               isRequired={true}
//               label="Email"
//               name="email"
//               type="email"
//               hideData={false}
//             />
//             <TextInputField<RegisterType>
//               isRequired={true}
//               label="Password"
//               name="password"
//               type="password"
//               hideData={true}
//             />


//             <SelectInputField<RegisterType>
//               isRequired={true}
//               label="Role"
//               name="role"
//               options={["Student", "Teacher", "Admin"]}
//             />


           
//            <TextAreaField<RegisterType> isRequired={false} label='Your Introduction' name='bio' rows={4} type='text' />


//           <FileInputField<RegisterType>
//               isRequired={true}
//               label="profile_picture"
//               name="profile_picture"
//               fileType={['image/jpeg', 'image/jpg', 'image/png', 'image/webp']}
//               maxFiles={1}
//               maxSize={100000}
//             />
          
//   {/* Role-specific Fields */}
  
//     {currentRole === "Student" && (
//               <>
//                 <SelectInputField<RegisterType>
//                   isRequired={true}
//                   label="Education Level"
//                   name="education_level"
//                   options={[
//                     "PRIMARY_SCHOOL",
//                     "MIDDLE_SCHOOL",
//                     "HIGH_SCHOOL",
//                     "BACHELOR",
//                     "MASTERS",
//                     "DOCTORATE",
//                     "PHD",
//                     "OTHER"
//                   ]}
//                 />
//                 <MultipleSelectInputField<RegisterType>
//                   isRequired={true}
//                   label="Interests"
//                   name="interests"
//                   options={categories||["Others"]}
//                 />
//               </>
//             )}
  
  
//     {currentRole === "Teacher" && (
//               <>
//               <TextInputField<RegisterType> isRequired={true}  label='Qualifications' name='qualifications' hideData={false} type='text'/>
//               <MultipleSelectInputField<RegisterType>
//                   isRequired={true}
//                   label="Areas of Expertise"
//                   name="teacher_expertise"
//                   options={categories||["Others"]}
                
//                 />
//               </>
//             )}

//             <LoadingButton
//               type="submit"
//               variant="contained"
//               loading={isLoading}
//               disabled={isLoading}
//               size="large"
//               sx={{ mt: 1 }}
//             >
//               {isLoading ? 'Registering...' : 'Register'}
//             </LoadingButton>

//             <Typography 
//               variant="body2" 
//               sx={{ 
//                 textAlign: 'center',
//                 color: 'text.secondary'
//               }}
//             >
//               Already have an account?{' '}
//               <Link 
//                 to="/login"
//                 style={{
//                   color: 'inherit',
//                   textDecoration: 'underline',
//                 }}
//               >
//                 Login here
//               </Link>
//             </Typography>
//           </Box>