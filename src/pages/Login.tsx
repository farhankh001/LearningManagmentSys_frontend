import { Box, Alert, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import TextInputField from "../components/Forms/InputFields/TextInputField";
import { LoginType } from "../types/login.types";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useLoginUserMutation } from "../app/api/userApi";

import { useNavigate, Link } from "react-router-dom";


function Login() {
  const { handleSubmit } = useFormContext<LoginType>();
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
    try {
      const response = await loginUser(data).unwrap();
      if (response.user.role === "Student") {
        navigate("/student-dash")
      } else if (response.user.role === "Teacher") {
        navigate("/teacher-dash")
      } else if (response.user.role === "Admin") {
        navigate("/admin-dash")
      }

    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        padding: { xs: 2, sm: 4, md: 6 }, width: "40%"
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
          padding: { xs: 3, sm: 4 },
        }}
      >
        {isError && error && 'data' in error &&
          <Alert severity="error" sx={{ mb: 2 }}>
            {(error.data as any).error}
          </Alert>
        }

        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 3,
            textAlign: 'center'
          }}
        >
          Welcome Back
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}>
            <TextInputField<LoginType>
              isRequired={true}
              label="Email"
              name="email"
              type="email"
              hideData={false}
            />
            <TextInputField<LoginType>
              isRequired={true}
              label="Password"
              name="password"
              type="password"
              hideData={true}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
              size="medium"
              sx={{ mt: 1 }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </LoadingButton>

            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                color: 'text.secondary'
              }}
            >
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{
                  color: 'inherit',
                  textDecoration: 'underline',
                }}
              >
                Register here
              </Link>
            </Typography>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;