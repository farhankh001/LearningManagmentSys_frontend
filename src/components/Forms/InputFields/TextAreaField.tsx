import { FormControl, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { FieldValues, useFormContext,Path, Controller } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa";


interface inputProps<T>{
    name:Path<T>;
    label:string;
    hideData?:boolean;
    type:string;
    rows:number;
    isRequired:boolean;
}

function TextAreaField<T extends FieldValues>({name,label,hideData,type,isRequired,rows}:inputProps<T>){
    const [typePassword,setTypePassword]=useState(hideData)
    const {control}=useFormContext<T>()
    return <Controller
        control={control}
        name={name}
        render={({field,fieldState:{error}})=>(
            <FormControl>
                <TextField 
                    {...field}
                    label={label} variant="filled"
                    size="small"
                    multiline
                    rows={rows}
                    slotProps={{
                        input:{
                            endAdornment:hideData?
                            <InputAdornment position="end">
                                <IconButton onClick={()=>setTypePassword(!typePassword)}>
                                     {typePassword?<FaEye/>:<FaEyeSlash/>}
                                </IconButton>
                            </InputAdornment>:null
                        }
                    }}
                    type={typePassword?type:"text"}
                    helperText={error && error.message}
                    error={!!error}
                    required={isRequired}
                    fullWidth={true}
                />
            </FormControl>
        )}
    
    
    />

}


export default TextAreaField
