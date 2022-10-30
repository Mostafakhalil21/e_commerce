import React from 'react'
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';
const CustomTextField = ({ name, label }) => {
    const {control} = useFormContext();
    const isError = false;
  return (
    <Grid item xs={12} sm={6}>
    <Controller
        control={control}
        defaultValue=""
        name={name}
        render = {({  field: { ref, ...field }, fieldState  })=> (
                <TextField
                    fullWidth
                    name={name}
                    {...field}
                    inputRef={ref}
                    label={label}
                    rules={{ required: true }}
                />
      
        )}
    />
</Grid>
  );
}

export default CustomTextField
