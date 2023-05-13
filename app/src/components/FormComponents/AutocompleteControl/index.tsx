import { Box, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import { Controller } from "react-hook-form";
import cities from "../../../constants/Cities";
import CustomPopperStyled from "../PopperControl";
import TextFieldControl from "../TextFieldControl";
import './index.scss';
import AutocompleteProps from "./props";
import { StyledTextField } from "../TextFieldControl";
import {useState} from 'react';

const sxStyle = {
    height : '100%',
    width: '100%',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const boxStyle = {
    fontSize: '2rem',
    fontWeight: '500',
}

const StyledAutocompleteControl = styled(Autocomplete)({
    '& .MuiFormControl-root': {
      width: '100%',
      height: '100%',
    },
    '& .MuiInputLabel-root': {
      color: '#999',
      fontSize: '1.8rem',
      fontWeight: '600',
      left: '-7.5px'
    },
    '& .MuiInputBase-root': {
      background: '#fff',
      borderRadius: '4px',
      height: '100%',
      },
    '& .MuiAutocomplete-inputRoot': {
      padding: '0px',
      '& .MuiAutocomplete-input': {
        height: '100%',
        fontSize: '1.8rem',
        fontWeight: '500',
        color: '#444444'
      },
    },
    '& .MuiAutocomplete-listbox': {
      padding: '0px',
      marginTop: '5px',
      '& .MuiListItem-root': {
        padding: '5px',
        fontSize: '16px',
        '&:hover': {
          background: '#f2f2f2',
        },
      },
    },
  },
)

const AutocompleteControl : React.FC<AutocompleteProps> = (props) => {

    let image = props.iconPath;

    const getClassName = () => {
        return "control " + props.customClass;
    }

    return (<Controller control={props.control}
                        name={props.name}
                        rules={props.rules}
                        render={({field : {onChange, value}}) => (
                            <StyledAutocompleteControl                       
                                options={props.options}
                                renderInput={(params) => <StyledTextField variant="filled" {...params} label={props.label} onChange={onChange}/>}
                                style={sxStyle}
                                freeSolo={true}
                                value={value || null}
                                className={getClassName()}
                                onChange={(event, values) => onChange(values)}
                                renderOption={(props, city : any) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <img
                                        loading="lazy"
                                        style={boxStyle}
                                        width="20"
                                        src={image}
                                        srcSet={image}
                                        alt=""
                                        />
                                        {city.label}
                                    </Box>
                                )}
                                PopperComponent={CustomPopperStyled} />
                                )} />)      
}

export default AutocompleteControl;