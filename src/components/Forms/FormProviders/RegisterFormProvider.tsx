import { FormProvider, useForm } from 'react-hook-form'
import { createStudentSchema, registerDefaultValues, RegisterType } from '../../../types/register.types';
import { zodResolver } from '@hookform/resolvers/zod';
import Register from '../../../pages/Register';

import { createUserSchema, CreateUserType } from '../../../types/RegisterStudent.types';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useVerifyCaptchaMutation } from '../../../app/api/userApi';


function RegisterFormProvider() {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [verifyCaptcha, { isLoading: isVerifying }] = useVerifyCaptchaMutation();

  const methods = useForm<CreateUserType>({
    mode: "all",
    defaultValues: registerDefaultValues,
    resolver: zodResolver(createUserSchema),
  });

  const handleCaptcha = async (token: string | null) => {
    if (!token) return;

    try {
      const response = await verifyCaptcha({ token }).unwrap();
      if (response?.message === 'Captcha passed') {
        setCaptchaVerified(true);
        setCaptchaError(null);
      } else {
        setCaptchaError('Captcha verification failed');
      }
    } catch (err) {
      console.error("Captcha failed:", err);
      setCaptchaError('Captcha verification failed. Please try again.');
    }
  };

  // ❗ Fix: You must return JSX here
  return (
    <>
      {/* {!captchaVerified ? (
        <Box
          sx={{
            width: '100%',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 10,
            px: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight={600}>
            🤖 Verify You're Human
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={3}>
            To prevent bots from registering, please complete the CAPTCHA below.
          </Typography>

          <ReCAPTCHA
            sitekey={"6LfA_XMrAAAAAOKRYeiCmDLrYq-55vnqUMiAYHv4"}
            onChange={handleCaptcha}
          />

          {isVerifying && (
            <Box mt={2}>
              <CircularProgress size={24} />
              <Typography variant="body2" mt={1}>Verifying captcha...</Typography>
            </Box>
          )}

          {captchaError && (
            <Alert severity="error" sx={{ mt: 2, maxWidth: 400 }}>
              {captchaError}
            </Alert>
          )}
        </Box>
      ) : ( */}




      <FormProvider {...methods}>
        <Register />
      </FormProvider>
      {/* )} */}
    </>
  );
}

export default RegisterFormProvider
