import { FormControl, FormHelperText, Rating, Typography } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"

interface RatingProps<T>{
    name:Path<T>;
    isRequired:boolean;
    label:string;

}

function RatingInputField<T extends FieldValues>({name,isRequired,label}:RatingProps<T>){
    const {control}=useFormContext<T>()
  return (
    <Controller
        name={name}
        control={control}
        render={({field,fieldState:{error}})=>(
            <FormControl 
            error={!!error} 
            required={isRequired}
            >
            <Typography variant="h6" component="label">
            {label}
          </Typography>
            <Rating
            {...field}
            name={name}
            defaultValue={5}
            precision={0.5}
            onChange={(_,value)=>field.onChange(value as number)}
            />
            <FormHelperText>
                {error&&error.message}
            </FormHelperText>
            </FormControl>
        )}
    />
  )
}

export default RatingInputField