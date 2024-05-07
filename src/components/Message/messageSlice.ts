import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  id: number;
  timestamp: Date;
  message: string;
}

export interface MessageState {
  messages: Message[];
  maxMessages: number;
  showTimestamp: boolean;
}

export const initialState: MessageState = {
  messages: [
    { id: 1, timestamp: new Date(), message: "Welcome to the chat!" },
    { id: 2, timestamp: new Date(), message: "Hello, world!" },
    { id: 3, timestamp: new Date(), message: "How are you today?" },
  ],
  maxMessages: 500,
  showTimestamp: true,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ id: number; message: string }>) => {
      const newMessage: Message = {
        id: action.payload.id,
        timestamp: new Date(), // Create the timestamp at the moment the message is added
        message: action.payload.message,
      };
      state.messages.push(newMessage);
      if (state.messages.length > state.maxMessages) {
        state.messages.shift(); // Removes the oldest message if the limit is exceeded
      }
    },
    toggleTimestamp: (state) => {
      state.showTimestamp = !state.showTimestamp;
    },
  },
});

export const { addMessage, toggleTimestamp } = messageSlice.actions;
export default messageSlice.reducer;
