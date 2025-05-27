import {useDropzone} from "react-dropzone"
import { useCallback } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import { Box, FormControl, FormHelperText, IconButton, Stack, Typography } from "@mui/material";
import { FaCloudUploadAlt, FaFile, FaTrash } from "react-icons/fa";


interface FileInputProps<T>{
    name:Path<T>;
    label:string;
    isRequired:boolean;
    maxFiles:number;
    fileType:string[];
    maxSize:number
}


function FileInputField<T extends FieldValues>({
    fileType,
    isRequired,
    label,
    maxFiles,
    name,
    maxSize,
  }: FileInputProps<T>) {
    const { control } = useFormContext<T>();
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const onDrop = useCallback(
            (acceptedFiles: File[]) => {
              if (maxFiles === 1) {
                onChange(acceptedFiles[0]);
              } else {
                const currentFiles = Array.isArray(value) ? value : [];
                const newFiles = [...currentFiles, ...acceptedFiles];
                onChange(newFiles.slice(0, maxFiles));
              }
            },
            [onChange, maxFiles, value]
          );
  
          const { getRootProps, getInputProps, isDragActive } = useDropzone({
            maxFiles,
            onDrop,
            accept: fileType.reduce(
              (acc, curr) => ({
                ...acc,
                [curr]: [],
              }),
              {}
            ),
          });
  
          const removeFile = useCallback(
            (indexToRemove: number) => {
              if (maxFiles === 1) {
                onChange(null);
              } else {
                const files = Array.isArray(value) ? value : [];
                onChange(files.filter((_, index) => index !== indexToRemove));
              }
            },
            [onChange, value, maxSize]
          );
  
          return (
            <FormControl required={isRequired} error={!!error}>
              <Box
                {...getRootProps()}
                sx={{
                  p: {
                    xs: 3,
                    sm: 5,
                    md: 2,
                    lg:2.7,
                    xl:4
                  },
                  border: "1px solid",
                  borderColor: "divider", // Use theme divider color
                  cursor: "pointer",
                  bgcolor: isDragActive ? "action.hover" : "background.default", // Use theme colors
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius:1
                }}
              >
                <input {...getInputProps()} />
                <FaCloudUploadAlt size={24} color="text.secondary" /> {/* Use theme text color */}
                <Typography
                  sx={{
                    color: "text.secondary", // Use theme text color
                    textAlign: "center",
                  }}
                >
                  {isDragActive
                    ? `Drop ${label} here.`
                    : `Drag and Drop ${label} here. or click to select file`}
                </Typography>
              </Box>
              <Box>
                {value && (
                  <Stack>
                    {maxFiles === 1 ? (
                      <FileItem file={value} onRemove={() => removeFile(0)} />
                    ) : (
              (value as (File | string)[]).map((file, index) => (
               <FileItem
                key={index}
                file={file}
                 onRemove={() => removeFile(index)}
        />
      ))
                    )}
                  </Stack>
                )}
              </Box>
              <Box>
                {error && (
                  <FormHelperText>{error.message}</FormHelperText>
                )}
              </Box>
            </FormControl>
          );
        }}
      />
    );
  }
  
  export default FileInputField;
  
  const FileItem = ({
    file,
    onRemove,
  }: {
    file: File|string;
    onRemove: () => void;
  }) => {
     const fileName = file instanceof File ? file.name : (typeof file === "string" ? file.split("/").pop() : "Unknown file");
    return (
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          p: 1.5,
          borderRadius: 1,
          bgcolor: "background.paper", // Use theme background color
          border: "1px solid",
          borderColor: "divider", // Use theme divider color
        }}
      >
        <FaFile size={20} color="text.secondary" /> {/* Use theme text color */}
        <Typography
          sx={{
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {fileName}
        </Typography>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <FaTrash size={16} color="error.main" /> {/* Use theme error color */}
        </IconButton>
      </Stack>
    );
  };






// import { useCallback } from "react";
// import { Controller, FieldValues, Path, useFormContext} from "react-hook-form"
// import {useDropzone} from "react-dropzone"
// import { Box, Typography } from "@mui/material";
// interface FileInputProps<T>{
//     name:Path<T>;
//     label:string;
//     isRequired:boolean;
//     maxFiles:number;
//     acceptedFileTypes:Array<string>
// }


// function FileInputField<T extends FieldValues>({name,label,isRequired,maxFiles,acceptedFileTypes}:FileInputProps<T>){
//     const {control}=useFormContext<T>()
//   return (
//     <Controller
//     name={name}
//     control={control}
//     render={({field:{onChange,value},fieldState:{error}})=>{
//         const onDrop=useCallback((acceptedFiles:File[])=>{
//             if (maxFiles === 1) {
//                 onChange(acceptedFiles[0]);
//             } else {
//                 // Handle multiple files
//                 const currentFiles = Array.isArray(value) ? value : [];
//                 const newFiles = [...currentFiles, ...acceptedFiles];
//                 // Ensure we don't exceed maxFiles
//                 onChange(newFiles.slice(0, maxFiles));
//             }
//         },[onChange,value,maxFiles])

//         const {getRootProps,getInputProps,isDragActive}=useDropzone({
//             onDrop,maxFiles,accept:acceptedFileTypes.reduce((acc,curr)=>({
//                 ...acc,
//                 [curr]:[]
//             }),{})
//         })
//         return <Box>
//             <Box  {...getRootProps()} sx={{
//                 border:error?"1px dashed #d32f2f":"1px dashed #cccccc",
//                 padding:"20px",
//                 backgroundColor:isDragActive? '#fafafa' : 'transparent', '&:hover': {
//                     backgroundColor: '#fafafa'
//                   }
//             }}>
//                <input
//                {...getInputProps()}
//                />
//               {isDragActive ? (
//                 <Typography>Drop the files here...</Typography>
//               ) : (
//                 <Typography>
//                   Drag & drop {label} here, or click to select
//                   {isRequired && ' *'}
//                 </Typography>
//               )}
//             </Box>
//             {value && (
//                 <Box mt={2}>
//                   {maxFiles === 1 ? (
//                     <Typography>{value.name}</Typography>
//                   ) : (
//                     value.map((file: File, index: number) => (
//                       <Typography key={index}>{file.name}</Typography>
//                     ))
//                   )}
//                 </Box>
//               )}
            
//             {error && (
//               <Typography color="error" variant="caption" sx={{ mt: 1 }}>
//                 {error.message}
//               </Typography>
//             )}
//         </Box>

//     }}
//     />
//   )
// }

// export default FileInputField