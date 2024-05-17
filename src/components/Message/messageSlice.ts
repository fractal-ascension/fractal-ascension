import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Item } from "../../Utils/Data/Items";
import { ItemChangeEffect, StatChangeEffect } from "../../Utils/Data/Locations";

export interface Message {
  id: number;
  timestamp: string;
  type: string;
  message: string;
  tooltip?: string;
  effect?: (StatChangeEffect | ItemChangeEffect)[];
}

export interface MessageState {
  messages: Message[];
  maxMessages: number;
  showTimestamp: boolean;
}

export const initialState: MessageState = {
  messages: [],
  maxMessages: 500,
  showTimestamp: true,
};

// Define an async thunk for saving character data
export const saveMessage = createAsyncThunk("message/saveMessage", async (_, { getState }) => {
  const state = getState() as RootState; // Ensure you have a RootState type defined in your store.ts
  localStorage.setItem("messageState", JSON.stringify(state.message));
});

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{
        timestamp: string;
        type: string;
        message: string;
        tooltip?: string;
        item?: Item;
        effect?: (StatChangeEffect | ItemChangeEffect)[];
      }>
    ) => {
      // Determine the next ID
      const nextId =
        state.messages.length > 0 ? Math.max(...state.messages.map((msg) => msg.id)) + 1 : 1;

      const newMessage: Message = {
        id: nextId, // Use the calculated next ID
        timestamp: action.payload.timestamp, // Assume timestamp is still passed in, or generate it here
        type: action.payload.type,
        message: action.payload.message,
        tooltip: action.payload.tooltip,
        effect: action.payload.effect,
      };
      state.messages.push(newMessage);
      if (state.messages.length > state.maxMessages) {
        state.messages.shift(); // Removes the oldest message if the limit is exceeded
      }
    },
    toggleTimestamp: (state) => {
      state.showTimestamp = !state.showTimestamp;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, toggleTimestamp, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
