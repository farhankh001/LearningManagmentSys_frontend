import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryState{
    categories:string[]
}

const initialState:CategoryState={
    categories:["Others"]
}

const categorySlice=createSlice({
    name:"categories",
    initialState,
    reducers:{
        setCategories:(state,action:PayloadAction<string[]>)=>{
            state.categories=action.payload;
        },
        clearCategories:(state)=>{
            state.categories=["Others"]
        }
        
    }
    
}
)

export const {setCategories,clearCategories}=categorySlice.actions;
export default categorySlice.reducer;