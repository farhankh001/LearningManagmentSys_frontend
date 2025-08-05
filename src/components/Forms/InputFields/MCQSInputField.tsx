import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  useTheme,
  Typography
} from '@mui/material';

import {
  Controller,
  FieldValues,
  Path,
  useFormContext
} from 'react-hook-form';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
}

interface MCQSInputFieldProps<T> {
  isRequired?: boolean;
  label: string;
  name: Path<T>;
  question: QuizQuestion;
}

function MCQSInputField<T extends FieldValues>({

  name,
  question,
  isRequired
}: MCQSInputFieldProps<T>) {
  const { control } = useFormContext<T>();
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired ? 'This field is required' : false }}
      render={({ field, fieldState }) => (
        <FormControl component="fieldset" error={!!fieldState.error}>
          <Typography variant='body1' sx={{ m: 1, fontSize: "1.1rem" }}>{question.question}</Typography>
          <RadioGroup
            sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            value={field.value ?? -1} // Ensure -1 as default
            onChange={(e) => field.onChange(parseInt(e.target.value))}
          >
            {question.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio checked={field.value === index} />} // Add explicit checked prop
                label={option}
                sx={{
                  border: "2px solid",
                  borderColor: theme.palette.divider,
                  margin: 1,
                  padding: 1,
                  width: "100%",
                  borderRadius: 4,
                  background: theme.palette.background.paper
                }}
              />
            ))}
          </RadioGroup>
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

export default MCQSInputField;
