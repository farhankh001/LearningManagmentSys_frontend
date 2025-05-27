import { Box, Chip, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material"
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"

interface SelectProps<T>{
    name:Path<T>;
    label:string;
    options:Array<string>;
    isRequired:boolean;

}


function MultipleSelectInputField<T extends FieldValues>({name,label,options,isRequired}:SelectProps<T>) {
    const {control}=useFormContext<T>()
  return (
    <Controller
    control={control}
    name={name}
    render={({field,fieldState:{error}})=>(
        <FormControl 
        error={!!error}
        required={isRequired}>
          <InputLabel 
             id={`${name}-label`}
                sx={{
                    
                }}
             >
            {label}
            </InputLabel>
        <Select
        multiple
        labelId={`${name}-label`}
        {...field}
        label={label}
         value={Array.isArray(field.value) ? field.value : []} 
        size="medium"
        variant="filled"
     
        renderValue={(selected)=>(
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {Array.isArray(selected) ? selected.map((value: string) => (
              <Chip 
                key={value} 
                label={value}
  
              />
            )) : null}
          </Box>
        )}
        >
        {
        options&&options.map((option)=>(
            <MenuItem 
                value={option}
                key={option}>
                    {option}
            </MenuItem>
                ))
            }
        </Select>
        <FormHelperText>
            {error&&error.message}
        </FormHelperText>
        </FormControl>
    )}
    />
  )
}

export default MultipleSelectInputField