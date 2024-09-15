import { createSlice } from "@reduxjs/toolkit";

const docsSlice = createSlice({
    name: "docs",
    initialState: {
        documentUpdateStatus: true
    },
    reducers: {
        docUpdated: (state) => {
            state.documentUpdateStatus = true;
        },
        docNotUpdated: (state) => {
            state.documentUpdateStatus = false;
        }
    }
});


export const { docNotUpdated, docUpdated } = docsSlice.actions;
export default docsSlice.reducer;