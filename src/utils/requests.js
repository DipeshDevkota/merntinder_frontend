import { createSlice } from "@reduxjs/toolkit";

const requestslice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
      addrequests: (state, action) => {
        // Make sure to spread the existing state and add new connections
        return action.payload // Ensure this handles multiple connections
      },
      removerequests: (state,action) => {
          const newArray= state.filter((r)=> r._id != action.payload);
          return newArray // Reset to empty array
      },
    },
  });
  

export const { addrequests, removerequests } = requestslice.actions;
export default requestslice.reducer;
