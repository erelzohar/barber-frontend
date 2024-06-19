import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AdminModel from "../../Models/AdminModel";
import LineModel from "../../Models/LineModel";

export class LinesState {
    public currentAdmin: AdminModel;
    public lines: LineModel[];
}


const initialState: LinesState = {
    currentAdmin: null,
    lines: []
}

const linesReducer = createSlice({
    name: "linesReducer",
    initialState,
    reducers: {
        setCurrentAdmin: (state, action: PayloadAction<AdminModel>) => {
            state.currentAdmin = action.payload;
        },
        addLine: (state, action: PayloadAction<LineModel>) => {
            state.lines.push(action.payload);            
        },
        setLines: (state, action: PayloadAction<LineModel[]>) => {
            state.lines = action.payload;

        },
        deleteLine: (state, action: PayloadAction<string>) => {
            const index = state.lines.findIndex(line => line._id === action.payload);
            if (index < 0) return;
            state.lines.splice(index, 1);
        }
    }
});

export const { setCurrentAdmin, setLines ,addLine,deleteLine} = linesReducer.actions;

export default linesReducer.reducer;