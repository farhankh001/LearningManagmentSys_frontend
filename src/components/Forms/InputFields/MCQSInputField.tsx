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
          <Typography variant='h6' fontWeight={700} sx={{m:1}}>{question.question_text}</Typography>
          <RadioGroup
          sx={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:2}}
            value={field.value ?? ''}
            onChange={(e) => field.onChange(parseInt(e.target.value))}
          >
            
            {question.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={option}
                sx={{border:"1px solid",borderColor:theme.palette.background.paper,margin:1,padding:1,width:"100%"}}
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
