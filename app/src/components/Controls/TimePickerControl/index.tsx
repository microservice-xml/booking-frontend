import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GenericProps from "../Generic/GenericProps";
import { Controller } from "react-hook-form";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { styled } from "@mui/material/styles";

const StyledTimePicker = styled(TimeField)({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },

  "& .MuiFormControl-root": {
    width: "100%",
    height: "100%",
  },

  "& .MuiInputLabel-root": {
    color: "#999",
    fontSize: "1.5rem",
    fontWeight: "600",
    top: ".4rem",
  },

  "&. MuiInputBase-input": {
    height: "100%",
    width: "100%",
    fontSize: "1.5rem",
  },

  "& .MuiInputBase-root": {
    background: "#fff",
    borderRadius: "4px",
    borderBottom: "1.5px solid #ccc",
    height: "100%",
    width: "100%",
    fontSize: "1.5rem",
    fontWeight: "500",
    paddingTop: "1.5rem",
    "&.Mui-focused": {
      borderBottom: "1px solid #fff",
    },
  },

  "& .MuiInputAdornment-root": {
    "& : active": {
      paddingTop: "15px",
    },
  },

  "& .MuiSvgIcon-root": {
    height: "2rem",
    width: "2rem",
  },

  "& .MuiInputBase-input-MuiOutlinedInput-input": {
    height: "100%",
    width: "100%",
    fontSize: "1.8rem",
  },

  "& .MuiInputLabel-shrink": {
    transform: "translate(22px, 6px) scale(0.9) !important",
  },

  "& .MuiInputBase-root:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.09)",
  },
});

const TimePickerControl: React.FC<GenericProps> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={props.control}
        name={props.name}
        render={({ field }) => (
          <StyledTimePicker
            {...field}
            inputRef={field.ref}
            className={props.customClass}
            label={props.label}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default TimePickerControl;
