import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  type FieldValues,
  useFormContext,
  type Path,
  Controller,
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps<T> {
  name: Path<T>;
  label: string;
  hideData?: boolean;
  type: "text" | "number" | "password" | "email";
  rows: number;
  isRequired: boolean;
}

function TextAreaField<T extends FieldValues>({
  name,
  label,
  hideData,
  type,
  rows,
  isRequired,
}: InputProps<T>) {
  const [typePassword, setTypePassword] = useState(hideData);
  const theme = useTheme();
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          {/* Custom label above the field */}
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: theme.palette.text.secondary,
              mb: 0.5,
              ml: 0.5,
            }}
          >
            {label}
          </Typography>

          <TextField
            {...field}
            placeholder={`Enter your ${label}`}
            variant="outlined"
            size="small"
            multiline
            rows={rows}
            required={isRequired}
            error={!!error}
            helperText={error?.message}
            fullWidth
            type={typePassword ? type : "text"}
            InputProps={{
              endAdornment: hideData ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => setTypePassword(!typePassword)}>
                    {typePassword ? <FaEye /> : <FaEyeSlash />}
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            }}
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: theme.palette.background.paper,
                fontSize: "0.9rem",
              },
              '& textarea': {
                padding: "11px 10px",
              },
              '& .MuiFormHelperText-root': {
                marginLeft: 0,
              },
              '& fieldset': {
                borderColor: theme.palette.divider,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.light,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            }}
          />
        </FormControl>
      )}
    />
  );
}

export default TextAreaField;
