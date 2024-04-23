import { configureStore } from "@reduxjs/toolkit";
import characterReducer, { initialState as characterInitialState } from "./components/Character/characterSlice";
import inventoryReducer, { initialState as inventoryInitialState } from "./components/Inventory/inventorySlice";
import { useDispatch } from "react-redux";
import { autoSaveMiddleware } from "./middleware";

export const b64Encode = (value: string): string => btoa(value);

export const b64Decode = (value: string): string => atob(value);

export const loadState = (key: string, initialState: unknown) => {
  try {
    const storedState = localStorage.getItem(key);
    return storedState ? JSON.parse(b64Decode(storedState)) : initialState;
  } catch (error) {
    console.error("Failed to load or decode state:", error);
    return initialState;
  }
};

export const saveState = (key: string, state: unknown) => {
  try {
    const serializedState = b64Encode(JSON.stringify(state));
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Failed to save or encode state:", error);
  }
};

export const store = configureStore({
  reducer: {
    character: characterReducer,
    inventory: inventoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(autoSaveMiddleware),
  preloadedState: {
    character: loadState("characterState", characterInitialState),
    inventory: loadState("inventoryState", inventoryInitialState),
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
