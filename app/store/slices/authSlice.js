import { createSlice } from "@reduxjs/toolkit";



const initialState ={
    userId:null,
    type:null
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUserId(state, action){
            state.userId= action.payload.id;
            state.type = action.payload.accountType;
        },
        removeUserId(state){
            state.userId= null;
            state.type= null;
        }
    }
});

export const {setUserId, removeUserId} = authSlice.actions;
export default authSlice.reducer;

