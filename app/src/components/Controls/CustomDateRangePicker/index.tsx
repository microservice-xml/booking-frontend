import * as React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



const CustomDatePicker: React.FC<{ helperText: string, label: string }> = (props) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                className='search__container-inputs--textbox'
                label={props.label}
            />
        </LocalizationProvider>
    );
}


export default CustomDatePicker;