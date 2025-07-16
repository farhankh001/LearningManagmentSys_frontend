import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";

interface SelectProps<T> {
  name: Path<T>;
  label: string;
  options: Array<string>;
  isRequired: boolean;
}

function SelectInputField<T extends FieldValues>({
  name,
  label,
  options,
  isRequired,
}: SelectProps<T>) {
  const { control } = useFormContext<T>();
  const theme = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error} required={isRequired}>
          {/* Custom Label */}
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

          <Select
            {...field}
            value={field.value || ""}
            variant="outlined"
            size="small"
            displayEmpty
            sx={{
              backgroundColor: theme.palette.background.paper, // Explicit background
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                fontSize: "0.9rem",
              },
              '& .MuiSelect-select': {
                padding: "16px 14px",
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
          >
            <MenuItem value="" disabled>
              Select {label}
            </MenuItem>
            {options.map((option) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default SelectInputField;
