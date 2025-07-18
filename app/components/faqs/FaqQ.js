"use client"

import {Box, TextField} from "@mui/material";
 const inputStyle = {
     width:{md:"30%", xs:"60%"},
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '2px solid black',
            },
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '2px solid black',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '2px solid black',
        },
        '& .MuiInputLabel-root': {
            color: 'black',
        },
        '& .Mui-focused .MuiInputLabel-root': {
            color: 'black',
        },
        '& .MuiSelect-icon': {
            color: 'black',
        },
        "& label.Mui-focused": {
            color: "black",
        },
        
    };

export default function FaqQ(){
    return(
        <Box sx={{width:"100%", display:"flex", flexDirection:"row",justifyContent:"center", alignItems:"center" }}>
            <TextField size="small"  placeholder="Search FAQ..." sx={inputStyle}/>
        </Box>
    );
}