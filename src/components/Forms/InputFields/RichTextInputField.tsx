import  { useRef } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import {  FormControl, FormHelperText, Typography, useTheme } from '@mui/material';
import JoditEditor from 'jodit-react';

interface RichTextProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  isRequired: boolean;
}


function RichTextInputField<T extends FieldValues>({ label, name, isRequired }: RichTextProps<T>) {
  const { control } = useFormContext<T>();
  const editorRef = useRef(null);
 const theme=useTheme()
 
  return (
    <Controller
      name={name}
      control={control}
      rules={isRequired ? { required: 'This field is required' } : undefined}
      render={({ field,fieldState:{error} }) => {
        return (
          <FormControl sx={{width:"100%"}}>
            <Typography variant="subtitle1">
              {label} {isRequired && '*'}
            </Typography>

            <JoditEditor
              ref={editorRef}
              value={field.value || ''}
              config={{
                readonly: false,
                height: 200,
                removeButtons: ['source'],
                showXPathInStatusbar: false,
                showCharsCounter: false,
                showWordsCounter: false,
                style: {
                  background: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  padding: '7px',
                  borderRadius: '8px',
                },
               placeholder:`${label}`
              }}
              // This does NOT cause blur
              onBlur={(newContent: string) => {
                  field.onChange(newContent);
              }}
            />
          <FormHelperText sx={{color:"error.main"}}>{error&&error.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}

export default RichTextInputField;
