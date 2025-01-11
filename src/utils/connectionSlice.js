import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connections",
    initialState: [],
    reducers: {
      addConnection: (state, action) => {
        // Make sure to spread the existing state and add new connections
        return action.payload // Ensure this handles multiple connections
      },
      removeConnection: () => {
        return []; // Reset to empty array
      },
    },
  });
  

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
