import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material"
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"


interface SelectProps<T>{
    name:Path<T>;
    label:string;
    options:Array<string>;
    isRequired:boolean;

}


function SelectInputField<T extends FieldValues>({name,label,options,isRequired}:SelectProps<T>) {
    const {control}=useFormContext<T>()
  return (
    <Controller
    control={control}
    name={name}
    render={({field,fieldState:{error}})=>(
        <FormControl 
        error={!!error}
        required={isRequired}>
         <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
        labelId={`${name}-label`}
        {...field}
        variant="filled"
        label={label}
        value={field.value||""}
        size="medium"
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

export default SelectInputField