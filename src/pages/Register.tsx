import { RegisterType } from '../types/register.types';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Box, Alert, Typography, useTheme, LinearProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import TextInputField from '../components/Forms/InputFields/TextInputField';
import { useRegisterUserMutation } from '../app/api/userApi';
import { useNavigate, Link } from 'react-router-dom';
import FileInputField from '../components/Forms/InputFields/FileInputField';
import { useEffect, useState } from 'react';
import TextAreaField from '../components/Forms/InputFields/TextAreaField';
import MultipleSelectInputField from '../components/Forms/InputFields/MultipleSelectField';
import SelectInputField from '../components/Forms/InputFields/SelectInputField';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import toast from 'react-hot-toast';
import { uploadToCloudinary } from '../utils/uploadToCloundinary';



function Register() {
  const [uploadProgress, setUploadProgress] = useState({  image: 0, })
  const navigate = useNavigate();
  const { handleSubmit, watch, reset } = useFormContext<RegisterType>();
  const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const currentRole = watch('role');
  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success("Registered Successfully.")
      setTimeout(() => { 
        navigate('/login');
      }, 1000);
    }
  }, [isSuccess, navigate, reset]);

  const submitForm: SubmitHandler<RegisterType> = async (data: RegisterType) => {
    try {
      let profile_picture_url=""
      if (data.profile_picture instanceof File) {
      const profile_picture=await uploadToCloudinary(data.profile_picture,(percent)=>setUploadProgress({image:percent}))
      profile_picture_url=profile_picture
    }
      const commonData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        bio: data.bio || null,
        profile_picture:profile_picture_url
      };
      let roleSpecificData = {};
      if (data.role === "Student") {
        roleSpecificData = {
          education_level: data.education_level,
          student_interests: data.interests
      };
    } 
    else if (data.role === "Teacher") {
      roleSpecificData = {
        qualifications: data.qualifications,
        teacher_expertiese: data.teacher_expertise
      };
    }else if(data.role==="Admin"){
      roleSpecificData={ }
    }
    
  
    const registerationBody={
      userData:commonData,
      roleSpecificData:roleSpecificData
    }
      await registerUser(registerationBody).unwrap();
      
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };
const theme=useTheme()

if(isError&&error&&"data" in error){
  console.log(error)
  toast.error(`${JSON.stringify((error.data as any).error)}`)
}

 
  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        backgroundColor: 'background.default',
        flexDirection:{
          xs:"column",
          sm:"column",
          md:"row",
          lg:"row",
          xl:"row"
        }
      }}
    >  
    <Box sx={{
       backgroundColor:theme.palette.primary.main ,
        minheight:{
          xs:"40%",
          sm:"40%",
          md:"100%",
          lg:"100%",
          xl:"100%"
        },
        minWidth:"40%",
        display:"flex",
        flexDirection:"column",
        alignItems:{
          xs:"left",
          sm:"center",
          md:"left",
          lg:"center",
          xl:"center"
        },
        justifyContent:{
          xs:"left",
          sm:"center",
          md:"center",
          lg:"center",
          xl:"center"
        },
        pl:{
          xs:5,
          sm:0,
          md:5,
          lg:0,
          xl:0
               }
        }}>
      <Typography variant='h2' fontWeight={1000} sx={{
        color:"white",
        fontStyle:"italic"
       
      }}>
        Start your 
      </Typography>
      <Typography variant='h2' fontWeight={1000} sx={{
        
        color:theme.palette.primary.light,
        fontStyle:"italic"
      }}>
        learning journey
      </Typography>
      <Typography variant='h5' sx={{ 
        color:"white",
        fontStyle:"italic"}}>
        The best learning content avaliable.
      </Typography>
    </Box>
      
    <Box
        sx={{
          maxWidth:  '100%' ,
          backgroundColor: theme.palette.background.default,
          minWidth:"60%",
          boxShadow: 1,
          padding: { xs: 3, sm: 4 },
          display:"flex",
          alignItems:"center",
          justifyContent:"center"
        }}
      >
        <Box sx={{
          borderTop:"1px solid",
          borderBottom:"1px solid",
          borderColor:theme.palette.background.paper,
          borderWidth:{
            xs:"0px",
            sm:"0px",
            md:"2px"
          },
          padding:3
        }}>
        {isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Registration successful! Redirecting to login...
          </Alert>
        )}

      {isError && error && 'data' in error &&
              <Alert severity="error" sx={{ mb: 2 }}>
                    {JSON.stringify((error.data as any).error)}  
               </Alert>
                }
       {uploadProgress.image > 0 && (
        <Box sx={{margin:3,display:"flex",flexDirection:'column',gap:3}}>
          <Typography variant="body2">Uploading Image: {uploadProgress.image}%</Typography>
          <LinearProgress variant="determinate" value={uploadProgress.image} sx={{color:theme.palette.success.main}} />
        </Box>
      )}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color:theme.palette.text.primary,
            mb: 3,
            textAlign: 'center'
          }}
        >
          Create Account
        </Typography>

        <form onSubmit={handleSubmit(submitForm)}>
          <Box sx={{

            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr ', md: '1fr 1fr ',lg:"1fr 1fr" },
            gap: { xs: 2, md: 2},
            justifyContent: 'center',

          }}>
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


            <SelectInputField<RegisterType>
              isRequired={true}
              label="Role"
              name="role"
              options={["Student", "Teacher", "Admin"]}
            />


           
           <TextAreaField<RegisterType> isRequired={false} label='Your Introduction' name='bio' rows={4} type='text' />


          <FileInputField<RegisterType>
              isRequired={true}
              label="profile_picture"
              name="profile_picture"
              fileType={['image/jpeg', 'image/jpg', 'image/png', 'image/webp']}
              maxFiles={1}
              maxSize={100000}
            />
          
  {/* Role-specific Fields */}
  
    {currentRole === "Student" && (
              <>
                <SelectInputField<RegisterType>
                  isRequired={true}
                  label="Education Level"
                  name="education_level"
                  options={[
                    "PRIMARY_SCHOOL",
                    "MIDDLE_SCHOOL",
                    "HIGH_SCHOOL",
                    "BACHELOR",
                    "MASTERS",
                    "DOCTORATE",
                    "PHD",
                    "OTHER"
                  ]}
                />
                <MultipleSelectInputField<RegisterType>
                  isRequired={true}
                  label="Interests"
                  name="interests"
                  options={categories||["Others"]}
                />
              </>
            )}
  
  
    {currentRole === "Teacher" && (
              <>
              <TextInputField<RegisterType> isRequired={true}  label='Qualifications' name='qualifications' hideData={false} type='text'/>
              <MultipleSelectInputField<RegisterType>
                  isRequired={true}
                  label="Areas of Expertise"
                  name="teacher_expertise"
                  options={categories||["Others"]}
                
                />
              </>
            )}

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
              size="large"
              sx={{ mt: 1 }}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </LoadingButton>

            <Typography 
              variant="body2" 
              sx={{ 
                textAlign: 'center',
                color: 'text.secondary'
              }}
            >
              Already have an account?{' '}
              <Link 
                to="/login"
                style={{
                  color: 'inherit',
                  textDecoration: 'underline',
                }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </form>
        </Box>
      </Box>
     
    </Box>
  );
}

export default Register;