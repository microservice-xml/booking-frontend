import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import React from "react";
import GenericProps from "./props";
import styled from "@mui/material/styles/styled";


export const StyledTextField = styled(TextField)({
  '& .MuiFormControl-root': {
    height: '100% !important',
    fontSize: '1.8rem',
    padding: '1rem !important'
  },
  '& .MuiFormLabel-root-MuiInputLabel-root': {
    top: "-1rem"
  },
  '& .MuiInputLabel-root': {
    fontSize: '1.8rem',
    top: '-.7rem'
  },
  '& .MuiInputBase-root': {
    background: '#fff',
    borderRadius: '4px',
    borderBottom: '1px solid #ccc',
    '&.Mui-focused': {
      borderBottom: '1px solid #fff',
    },
  },
  '& .MuiInputBase-input': {
    padding: '15px 15px',
    fontSize: '1.8rem',
  },
  '& .MuiFormHelperText-root': {
    fontSize: '1.2rem'
  }
  },
)


const TextFieldControl : React.FC<GenericProps> = (props) => {

  const getClassName = () => {
        return "control " + props.customClass;
    }

  return (
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultValue}
        rules={props.rules}
        
        render={({ field }) => {
          return (
            <StyledTextField
              {...field}
              InputLabelProps={{ shrink: Boolean(field.value) }}
              fullWidth={props.fullWidth ? props.fullWidth : true}
              type={props.type}
              error={props.error}
              helperText={props.helperText}
              className={getClassName()}
              label={props.label}
              variant="filled"
              disabled={props.disabled}
              placeholder={props.placeholder}
              inputRef={(input) => {
                if (props.inputRef && input != null) {
                  input.focus();
                }
              }}
            />
          );
        }}
      />
  );
};

export default TextFieldControl;