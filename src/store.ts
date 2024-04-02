import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './components/Character/characterSlice';
import inventoryReducer from './components/Inventory/inventorySlice';

export const store = configureStore({
  reducer: {
    character: characterReducer,
    inventory: inventoryReducer,
  },
});

// Typing for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
