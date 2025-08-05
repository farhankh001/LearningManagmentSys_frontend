import { RegisterType } from '../types/register.types';
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form';
import { Alert, Box, Button, Typography, useTheme } from '@mui/material';
import TextInputField from '../components/Forms/InputFields/TextInputField';
import { useRegisterUserMutation } from '../app/api/userApi';
import { useNavigate } from 'react-router-dom';
import FileInputField from '../components/Forms/InputFields/FileInputField';
import { useEffect, useRef } from 'react';
import MultipleSelectInputField from '../components/Forms/InputFields/MultipleSelectField';
import SelectInputField from '../components/Forms/InputFields/SelectInputField';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import toast from 'react-hot-toast';

import { StepDefinition, useMultiStepForm } from '../components/MultistepFormSetup/useMultiStepFormhook';
import { MultiStepFormWrapper } from '../components/MultistepFormSetup/MultiStepFromWrapper';
import { AddCircleOutline, Delete } from '@mui/icons-material';
import universitiesArray from '../types/allUniversityArray';
import { CreateUserType, educationLevelOptions, bsDegreesInPakistan, msDegreesInPakistan, phdDegreesInPakistan } from '../types/RegisterStudent.types';
import ReCAPTCHA from 'react-google-recaptcha';
import { HorizontalMultiStepFormWrapper } from '../components/MultistepFormSetup/HorizontalFormWrapper';
import TextAreaField from '../components/Forms/InputFields/TextAreaField';




function Register() {


  const navigate = useNavigate();

  const { handleSubmit, watch, control, formState: { errors } } = useFormContext<CreateUserType>();
  const [registerUser, { isSuccess, isError, error }] = useRegisterUserMutation();
  const theme = useTheme()
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expertise'
  });


  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({
    control,
    name: 'certifications',
  });


  const educationLevel = watch("education.level");
  const selectedUniversity = watch("education.university");
  const selectedDegree = watch("education.degree");
  useEffect(() => {
    if (isError && error && "data" in error) {

      toast.error(`${JSON.stringify((error.data as any).error)}`)
    }
  }, [isError, error, registerUser])
  useEffect(() => {
    if (isSuccess) {
      toast.success(`User Was Registered Successfully.`)
    }
  }, [isSuccess, registerUser])

  const submitForm: SubmitHandler<CreateUserType> = async (data: CreateUserType) => {
    try {
      const token = await recaptchaRef.current?.executeAsync();
      recaptchaRef.current?.reset(); // reset after execution

      if (!token) {
        toast.error("Captcha verification failed. Please try again.");
        return;
      }

      const payload = {
        ...data,
        captchaToken: token, // include token in form data
      };

      await registerUser(payload).unwrap();

      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };





  const steps: StepDefinition<CreateUserType>[] = [
    {

      id: 'Introduction-info',
      title: 'Introduction',
      description: 'Enter your personal details',
      instructions: "Personal Details and Credentals.",
      fields: ['firstName', 'lastName', 'username', "gender", 'email',]
    },

    {
      id: 'Contact-info',
      title: 'Contact information',
      description: 'Enter Email and Password',
      instructions: "Contact Details and password",
      fields: ['password', 'phone', "cnic"]
    },
    {
      id: 'Education-info',
      title: 'Education Information',
      description: 'Enter Educational Background',
      instructions: "Academic background and qualifications",
      fields: ['education'] as (keyof CreateUserType)[]
    },
    {
      id: 'Certifications-info',
      title: 'Certifications',
      description: 'Add your professional certifications',
      instructions: "Professional certifications and credentials",
      fields: ['certifications'] as (keyof CreateUserType)[]
    },
    {
      id: 'Expertise',
      title: 'Expertise Information',
      instructions: "Technical skills and specializations",
      description: 'Expertise You have, you can select multiple expertise and their associated score.',
      fields: ['expertise']
    }

  ];

  const [multiStepState, multiStepActions] = useMultiStepForm<CreateUserType>({
    steps,
    onStepChange: (step, direction) => {
      console.log(`Moved to step ${step + 1} (${direction})`);
    }
  });


  const getErrorMessage = (error: any): string => {
    if (error?.message) return error.message;
    if (Array.isArray(error)) {
      return error.map(getErrorMessage).join(', ');
    }
    if (typeof error === 'object') {
      return Object.values(error)
        .map(getErrorMessage)
        .join(', ');
    }
    return 'Invalid field';
  };

  const renderEducationFields = () => {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
        <SelectInputField<CreateUserType>
          isRequired={true}
          label="Education Level"
          name="education.level"
          options={educationLevelOptions}
        />

        {/* SCHOOL/COLLEGE */}
        {educationLevel === "School/Collage" && (
          <>
            <TextInputField<CreateUserType>
              isRequired={true}
              label="School Name"
              name="education.schoolName"
              type="text"
              hideData={false}
            />
          </>
        )}

        {/* COMMON COMPONENTS FOR BACHELOR, MASTER, PHD */}
        {(educationLevel === "Bachelor" ||
          educationLevel === "Master" ||
          educationLevel === "Phd") && (
            <>
              <SelectInputField<CreateUserType>
                isRequired={true}
                label="University"
                name="education.university"
                options={universitiesArray}
              />
              {selectedUniversity === "Others" && (
                <TextInputField<CreateUserType>
                  isRequired={true}
                  label="Custom University Name"
                  name="education.customUniversity"
                  type="text"
                  hideData={false}
                />
              )}

              <SelectInputField<CreateUserType>
                isRequired={true}
                label="Degree"
                name="education.degree"
                options={
                  educationLevel === "Bachelor"
                    ? bsDegreesInPakistan
                    : educationLevel === "Master"
                      ? msDegreesInPakistan
                      : phdDegreesInPakistan
                }
              />
              {selectedDegree === "Others" && (
                <TextInputField<CreateUserType>
                  isRequired={true}
                  label="Custom Degree Name"
                  name="education.customDegree"
                  type="text"
                  hideData={false}
                />
              )}

              {/* New: Session Start and End */}
              <TextInputField<CreateUserType>
                isRequired={true}
                label="Session Start Year (like 2021)"
                name="education.sessionStart"
                type="text"
                hideData={false}
              />
              <TextInputField<CreateUserType>
                isRequired={true}
                label="Session End Year (like 2025)"
                name="education.sessionEnd"
                type="text"
                hideData={false}
              />
            </>
          )}


      </Box>
    );
  };

  // NEW: Certification fields renderer
  const renderCertificationFields = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>


        {certFields.map((field, index) => (
          <Box
            key={field.id}
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: "flex-start",
              flexDirection: "column"

            }}
          >
            <TextAreaField<CreateUserType>
              isRequired={true}
              label={`Certification ${index + 1}`}
              name={`certifications.${index}.name`}
              type="text"
              rows={4}
              hideData={false}
            />
            <Button
              variant="outlined"

              onClick={() => removeCert(index)}
              startIcon={<Delete />} sx={{
                color: theme.palette.text.primary,
                borderRadius: 3,
                background: theme.palette.error.light,
                fontSize: "0.80rem",
                fontWeight: 500,


              }}
            >
              Delete Certificate
            </Button>
          </Box>
        ))}

        <Box>
          <Button

            onClick={() => appendCert({ name: '' })}
            startIcon={<AddCircleOutline />}
            variant="contained"
            sx={{

              borderRadius: 3,
              background: theme.palette.warning.light,
              fontSize: "0.80rem",
              fontWeight: 500,


            }}
          >
            Add a Certification
          </Button>
        </Box>

        {certFields.length === 0 && (
          <Box sx={{
            p: 3,
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            textAlign: 'center',
            backgroundColor: 'background.paper',
            mt: 2
          }}>
            <Typography variant="body2" color="text.secondary">
              No certifications added yet. Click "Add Certification" to get started.
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  const renderCurrentStepFields = () => {

    const currentStepId = multiStepState.currentStepInfo.id;

    switch (currentStepId) {
      case 'Introduction-info':
        return (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
            <TextInputField<CreateUserType>
              key="firstname"
              isRequired={true}
              label="First Name"
              name="firstName"
              type="text"
              hideData={false}
            />
            <TextInputField<CreateUserType>
              key="lastanme"
              isRequired={true}
              label="Last Name"
              name="lastName"
              type="text"
              hideData={false}
            />
            <TextInputField<CreateUserType>
              key="username"
              isRequired={true}
              label="Username"
              name="username"
              type="text"
              hideData={false}
            />
            <SelectInputField<CreateUserType> isRequired={true} label='Gender' name='gender' options={["Male", "Female", "Prefer not to say"]} />
            <TextInputField<CreateUserType>
              key="email"
              isRequired={true}
              label="Email"
              name="email"
              type="email"
              hideData={false}
            />
          </Box>
        );

      case 'Contact-info':
        return (

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>

            <TextInputField<CreateUserType>
              key="password"
              isRequired={true}
              label="Password"
              name="password"
              type="password"
              hideData={true}
            />
            <TextInputField<CreateUserType>
              key="cnic"
              isRequired={true}
              label="CNIC"
              name="cnic"
              type="text"
              hideData={false}
            />
            <TextInputField<CreateUserType> isRequired={true} label='Phone Number' name='phone' type='text' />
          </Box>
        );

      case 'Education-info':
        return renderEducationFields();

      // NEW: Certification step case
      case 'Certifications-info':
        return renderCertificationFields();

      case 'Expertise':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {fields.map((field, index) => (
              <Box
                key={field.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                  gap: 2,
                  width: "100%",

                }}
              >
                {/* Category Dropdown */}
                <SelectInputField<CreateUserType>
                  key={`expertise-category-${index}`}
                  label="Category"
                  name={`expertise.${index}.category`}
                  isRequired={true}
                  options={[
                    "Programming",
                    "Cyber Security",
                    "Data Science",
                    "Cloud",
                    "AI/ML",
                    "DevOps",
                    "Game Dev",
                    "UI/UX",
                    "Blockchain",
                    "Others"
                  ]}
                />

                {/* Tech Stack Text Input */}
                <TextInputField<CreateUserType>
                  key={`expertise-tech-${index}`}
                  label="Tech Stack / Tool"
                  name={`expertise.${index}.techStack`}
                  isRequired={true}
                  type="text"
                  hideData={false}
                />

                {/* Level Dropdown */}
                <SelectInputField<CreateUserType>
                  key={`expertise-level-${index}`}
                  label="Proficiency Level"
                  name={`expertise.${index}.level`}
                  isRequired={true}
                  options={["Beginner", "Intermediate", "Expert"]}
                />

                {/* Remove Button */}
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => remove(index)}
                    startIcon={<Delete />} sx={{
                      color: theme.palette.text.primary,
                      borderRadius: 3,
                      background: theme.palette.error.light,
                      fontSize: "0.80rem",
                      fontWeight: 500,


                    }}
                  >
                    Remove Expertise
                  </Button>
                </Box>
              </Box>
            ))}

            {/* Add Button */}
            <Button
              startIcon={<AddCircleOutline />}
              variant="contained"
              sx={{

                borderRadius: 3,
                background: theme.palette.warning.light,
                fontSize: "0.90rem",
                fontWeight: 500,


              }}

              onClick={() => append({ category: "Cyber Security", techStack: "", level: "Beginner" })}
            >
              Add Expertise
            </Button>

            {/* reCAPTCHA */}
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={"6LdBsHgrAAAAANILGdUDOHcIr0vLROfI-bxflC_H"}
              size="invisible"
            />

            {/* Error List */}
            {Object.keys(errors).length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Alert severity="error">
                  <Typography variant="h6">Please fix the following errors:</Typography>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field}>
                        <Typography variant="body2">
                          <strong>{field}:</strong> {getErrorMessage(error)}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Alert>
              </Box>
            )}
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
          width: '1300px',
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
            <HorizontalMultiStepFormWrapper
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
            </HorizontalMultiStepFormWrapper>
          </form>
        </Box>
      </Box>


    </Box>
  );
}

export default Register;

