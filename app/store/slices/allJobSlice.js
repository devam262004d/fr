import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allJob:[]
};

const allJobSlice = createSlice({
    name:"allJob",
    initialState,
    reducers:{
        setAllJob(state, action){
            state.allJob = action.payload
        },
    }
});

export const {setAllJob} = allJobSlice.actions;
export default allJobSlice.reducer;