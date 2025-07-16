import {
  Box,
  Chip,
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

function MultipleSelectInputField<T extends FieldValues>({
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
        <FormControl
          fullWidth
          error={!!error}
          required={isRequired}
         
        >
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
            multiple
            displayEmpty
            value={Array.isArray(field.value) ? field.value : []}
            size="small"
            variant="outlined"
            renderValue={(selected) =>
              selected.length === 0 ? (
                <span>Select {label}</span>
              ) : (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value: string) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )
            }
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                fontSize: "0.9rem",
              },
              "& .MuiSelect-select": {
                padding: "16px 14px",
              },
              "& fieldset": {
                borderColor: theme.palette.divider,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.light,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <MenuItem disabled value="">
              <em>Select {label}</em>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
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

export default MultipleSelectInputField;
