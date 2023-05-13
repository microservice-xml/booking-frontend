import Popper, { PopperProps } from "@mui/material/Popper";
import { styled } from "@mui/material/styles";

const CustomPopper = styled(Popper)<PopperProps>(({ theme }) => ({
        "& .MuiAutocomplete-listbox": {
            width: "100%",
            fontSize: "1.8rem",
            '&::-webkit-scrollbar': {
                width: '1.2rem'
            },
                        
            '&::-webkit-scrollbar-track': {
                webKitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)', 
                borderRadius: '2rem'
            },
                        
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '2rem',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)',
                background: 'rgba(7, 112, 227, 0.3)'
            },
            "& li": {
                height: "5rem",
                width: '100%'
            }
    },
    
}))

    
export default function CustomPopperStyled(props : any) {
    return <CustomPopper {...props} style={{width: props.width}}/>
}
