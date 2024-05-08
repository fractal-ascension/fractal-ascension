import { configureStore, Middleware } from "@reduxjs/toolkit";
import characterReducer, {
  initialState as characterInitialState,
} from "./components/Character/characterSlice";
import inventoryReducer, {
  initialState as inventoryInitialState,
} from "./components/Inventory/inventorySlice";
import messageReducer, {
  initialState as messageInitialState,
} from "./components/Message/messageSlice";
import globalTimeReducer, {
  initialState as globalTimeInitialState,
} from "./Utils/globalTimeSlice";
import { useDispatch } from "react-redux";

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

const autoSaveMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  saveState("characterState", state.character);
  saveState("inventoryState", state.inventory);
  saveState("messageState", state.message);
  saveState("globalTimeState", state.globalTime);
  return result;
};

export const store = configureStore({
  reducer: {
    character: characterReducer,
    inventory: inventoryReducer,
    message: messageReducer,
    globalTime: globalTimeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(autoSaveMiddleware),
  preloadedState: {
    character: loadState("characterState", characterInitialState),
    inventory: loadState("inventoryState", inventoryInitialState),
    message: loadState("messageState", messageInitialState),
    globalTime: loadState("globalTimeState", globalTimeInitialState),
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
