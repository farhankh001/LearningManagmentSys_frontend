import { Alert, Box,  Button,  LinearProgress,  List,  ListItem,  Stack, Typography, useTheme } from '@mui/material'
import TextInputField from '../../components/Forms/InputFields/TextInputField'
import { CreateCourseFormType, createCourseSchema,} from '../../types/create_course.types'
import TextAreaField from '../../components/Forms/InputFields/TextAreaField'
import SelectInputField from '../../components/Forms/InputFields/SelectInputField'
import { LoadingButton } from '@mui/lab'
import { CreateCourseSbumitType, useCreateNewCourseMutation } from '../../app/api/createCourseApi'
import FileInputField from '../../components/Forms/InputFields/FileInputField'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import MultipleSelectInputField from '../../components/Forms/InputFields/MultipleSelectField'
import RichTextInputField from '../../components/Forms/InputFields/RichTextInputField'
import { CheckCircle, Create, Gavel } from '@mui/icons-material'
import DOMPurify from 'dompurify';
import { uploadToCloudinary } from '../../utils/uploadToCloundinary'
const instructions=[
  "Course Title: Enter a clear and concise title that reflects the main topic of your course.",
  "Sub-Title: A tagline for your course, should be brief and attractive.",
  "Description: Provide a brief overview of what your course covers.",
  "What You Will Learn: Describe the key skills, knowledge, or outcomes.",
 "Course Image: Upload a high-quality image that represents your course topic."

]


function NewCourseCreate() {
    const [createCourse, { isLoading, isSuccess, isError, error }] = useCreateNewCourseMutation();
    const {handleSubmit}=useFormContext<CreateCourseFormType>()
    const navigate=useNavigate()
    const theme=useTheme()
    const {reset}=useFormContext<CreateCourseFormType>()
    const [uploadProgress, setUploadProgress] = useState({  image: 0, })
    const categories = useSelector((state: RootState) => 
      state.categories.categories || ["OTHERS"])
    useEffect(() => {
        if (isSuccess) {
          reset();
          setTimeout(() => {
            navigate('/teacher-dash');
          }, 1000);
        }
      }, [isSuccess, navigate, reset]);
    const createCourseSumit:SubmitHandler<CreateCourseFormType>=async(data:CreateCourseFormType)=>{
        try {
            const validatedData=createCourseSchema(categories).parse(data)
            console.log("non clean"+data.whatYouWillLearn)
            const cleanWhatYouWillLearn = DOMPurify.sanitize(validatedData.whatYouWillLearn);
            console.log("clean what you will learn"+ cleanWhatYouWillLearn)
            let courseThumbnail=''
            
            // Convert numbers to strings for FormData
         
            // Handle file
            if (validatedData.course_thumbnail instanceof File) {
               const course_thumbnail=await uploadToCloudinary(validatedData.course_thumbnail,(percent)=>setUploadProgress({image:percent}))
               courseThumbnail=course_thumbnail
            }
            const createCourseSubmitData:CreateCourseSbumitType={
              title:validatedData.title,
              subtitle:validatedData.subtitle,
              activationStatus:validatedData.activationStatus,
              course_category:validatedData.course_category,
              course_thumbnail:courseThumbnail,
              description:validatedData.description,
              duration:validatedData.duration,
              language:validatedData.language,
              level:validatedData.level,
              preRequisites:validatedData.preRequisites,
              price:validatedData.price,
              sales_category:validatedData.sales_category,
              whatYouWillLearn:cleanWhatYouWillLearn

            }
            // Call the mutation
            await createCourse(createCourseSubmitData).unwrap();
        } catch (error) {
            console.error('Submission error:', error);
        }
    }
  return (
     <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        backgroundColor: 'Background.default',
        flexDirection:"column",
        gap:1
       
      }}
    >  
    <Box sx={{
       backgroundColor:theme.palette.background.paper ,
       ml:2,
       mr:2,
       mt:2,
        // minheight:{
        //   xs:"50%", sm:"50%", md:"50%", lg:"30%", xl:"30%"
        // },
        // minWidth:"90%%",
        display:"flex",
        flexDirection:"column",
        boxShadow:`-4px 4px 2px ${theme.palette.secondary.light}`,
          borderRadius:4,
         p:2
        }}>
          
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
          },alignItems:"center",margin:1,backgroundColor:theme.palette.background.default,borderRadius:4,padding:2,textAlign:"center"}}>
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

    </Box>
      
    <Box
        sx={{
          maxWidth:  '100%' ,
          backgroundColor: theme.palette.background.paper,
          minWidth:"60%",
          padding: { xs: 3, sm: 4 },
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          margin:2,
          boxShadow:`-4px 4px 2px ${theme.palette.secondary.light}`,
          borderRadius:4
        }}
      >
        <Box 
         sx={{
          borderTop:"1px solid",
          borderBottom:"1px solid",
          borderColor:theme.palette.background.paper,
          borderWidth:{
            xs:"0px",  sm:"0px", md:"2px"
          },
          padding:0
        }}>
            {isSuccess && (
                      <Alert severity="success" sx={{ mb: 1 }}>
                        Course Created Successfully...
                      </Alert>
                    )}
            
            {isError && error && 'data' in error &&
                        <Alert severity="error" sx={{ mb: 1 }}>
                              {JSON.stringify((error.data as any).error)}  
                        </Alert>
                            }
      <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.light,
                mb: 2,
                textAlign: 'center',
                fontStyle:"italic"
              }}
            >
              <Create sx={{fontSize:25,mr:1}}/>
              Create Course
            </Typography>
        <form  onSubmit={handleSubmit(createCourseSumit)} >
         <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
           <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr ', md: '1fr 1fr 1fr ',lg:"1fr 1fr 1fr" },
            gap: { xs: 2, md: 3},
            justifyContent: 'center',
            pl:{xs:1, sm:1,  md:2, lg:4, xl:4
             },pr:{  xs:1, sm:1, md:2,  lg:4, xl:4
      }

          }} >
            <TextInputField<CreateCourseFormType> isRequired={true} label='Title' name='title' type='text'  />
            <TextInputField<CreateCourseFormType> isRequired={true} label='Subtitle' name='subtitle' type='text'  />
            <TextInputField<CreateCourseFormType> isRequired={true} label='Language' name='language' type='text'  />
           
            <SelectInputField<CreateCourseFormType> isRequired={true} label='Activation Status' name='activationStatus' options={[ "ACTIVE",
            "INACTIVE" ]}/>
            <SelectInputField<CreateCourseFormType> isRequired={true} label='Course Level' name='level' options={[
           "PRIMARY_SCHOOL", "MIDDLE_SCHOOL", "HIGH_SCHOOL", "BACHELOR", "MASTERS", "DOCTORATE", "PHD","OTHER"]}/>
            <TextInputField<CreateCourseFormType> isRequired={true} label='Credit Hours' name="duration" type='number'/>
            <SelectInputField<CreateCourseFormType> isRequired={true} label="Sales Category" name='sales_category' options={[ "FREE", "BASIC", "STANDARD", "PREMIUM", "ENTERPRISE"]} />
            <MultipleSelectInputField<CreateCourseFormType> isRequired={true} label='Course Category' name='course_category' options={categories||["OTHERS"]} />
            <TextInputField<CreateCourseFormType> isRequired={true} label='Price' name="price" type='number'/>
             <TextAreaField<CreateCourseFormType> name='description' label='Description' type='text' rows={5} isRequired={true} />
            <TextAreaField<CreateCourseFormType> name='preRequisites' label='Pre-Requisites' type='text' rows={5} isRequired={true} />
            <FileInputField<CreateCourseFormType> fileType={["image/jpeg", "image/jpg", "image/png", "image/webp"]} isRequired={true} label='Course thumbnail' maxFiles={1} name='course_thumbnail' maxSize={2*1024*1024}/>
            </Box>

      <Box sx={{pl:{
        xs:1, sm:1, md:2, lg:4, xl:4
      },pr:{ xs:1, sm:1, md:2, lg:4, xl:4
      },mt:2,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%"}}>
        <RichTextInputField<CreateCourseFormType> isRequired={true} label={"Write in detail what students will learn from this course"} name={"whatYouWillLearn"} />
        <LoadingButton
        type="submit"
        variant="contained"
        loading={isLoading}
        disabled={isLoading}
        size="large"
        sx={{ mt: 1 }}>
        {isLoading ? 'Creating Course...' : 'Create Course'}
         </LoadingButton>
      </Box>
           {uploadProgress.image > 0 && (
                  <Box sx={{margin:3,display:"flex",flexDirection:'column',gap:3}}>
                    <Typography variant="body2">Uploading Image: {uploadProgress.image}%</Typography>
                    <LinearProgress variant="determinate" value={uploadProgress.image} sx={{color:theme.palette.success.main}} />
                  </Box>
                )}
         </Box>
        </form>

    </Box>
    
      </Box>
    </Box>
  )
}

export default NewCourseCreate








 