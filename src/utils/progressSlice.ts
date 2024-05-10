import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ProgressState {
  activeLocation: string;
  activeActivity: string;
}

export const initialState: ProgressState = {
  activeLocation: "forest-clearing", // Location ID
  activeActivity: "fc1", // If in limited activity, use defaultActivity
};

// Define an async thunk for saving character data
export const saveProgress = createAsyncThunk(
  "progress/saveProgress",
  async (_, { getState }) => {
    const state = getState() as RootState; // Ensure you have a RootState type defined in your store.ts
    localStorage.setItem("progressState", JSON.stringify(state.progress));
  }
);

export const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setActiveLocation: (state, action) => {
      state.activeLocation = action.payload;
    },
    setActiveActivity: (state, action) => {
      state.activeActivity = action.payload;
    },
  },
});

export const { setActiveLocation, setActiveActivity } = progressSlice.actions;
export default progressSlice.reducer;
