import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AdminModel from "../../Models/AdminModel";
import usersService from "../../Services/Users";

export class AuthState {
    public admin: AdminModel;
}


const initialState: AuthState = {
    admin: usersService.checkUserExp()
}

const adminReducer = createSlice({
    name: "adminReducer",
    initialState,
    reducers: {
        adminLoggedIn: (state, action: PayloadAction<AdminModel>) => {
            state.admin = action.payload;
        },
        adminLoggedOut: (state) => {
            state.admin = null;
        },
    }
});

export const { adminLoggedIn, adminLoggedOut } = adminReducer.actions;

export default adminReducer.reducer;