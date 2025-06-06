import {
  FormControl,
  FormLabel,
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
  question_text: string;
  options: string[];
}

interface MCQSInputFieldProps<T> {
  isRequired?: boolean;
  label: string;
  name: Path<T>;
  question: QuizQuestion;
}

function MCQSInputField<T extends FieldValues>({
  label,
  name,
  question,
  isRequired
}: MCQSInputFieldProps<T>) {
  const { control,watch } = useFormContext<T>();
  const theme=useTheme()
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired ? 'This field is required' : false }}
      render={({ field, fieldState }) => (
        <FormControl component="fieldset" error={!!fieldState.error} >
          <Typography variant='h6' fontWeight={700}>{question.question_text}</Typography>
          <RadioGroup
            value={field.value ?? ''}
            onChange={(e) => field.onChange(parseInt(e.target.value))}
          >
            
            {question.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={option}
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
