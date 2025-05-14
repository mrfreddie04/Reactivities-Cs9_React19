import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { SelectProps, Select, FormControl, InputLabel, MenuItem, FormHelperText } from "@mui/material";

type Props<T extends FieldValues> = {
  items: SelectItem[]
} & UseControllerProps<T> & SelectProps;

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({...props});

  return (
    <FormControl fullWidth error = {!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={field.value || ''}
        label={props.label}
        onChange={field.onChange}
      >
        {props.items.map( item => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
      {!!fieldState.error && (
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      )}
    </FormControl>  
  )
}
