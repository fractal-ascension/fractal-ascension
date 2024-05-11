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
import globalTimeReducer, { initialState as globalTimeInitialState } from "./Utils/Slices/globalTimeSlice";
import progressReducer, { initialState as progressInitialState } from "./Utils/Slices/progressSlice";

import { useDispatch } from "react-redux";

export const b64Encode = (value: string): string => btoa(value);
export const b64Decode = (value: string): string => atob(value);

export const loadState = (key: string, initialState: unknown) => {
  try {
    const storedState = localStorage.getItem(key);
    return storedState ? JSON.parse(b64Decode(storedState)) : initialState;
    // return storedState ? JSON.parse(storedState) : initialState;
    
  } catch (error) {
    console.error("Failed to load or decode state:", error);
    return initialState;
  }
};

export const saveState = (key: string, state: unknown) => {
  try {
    const serializedState = b64Encode(JSON.stringify(state));
    // const serializedState = JSON.stringify(state);

    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Failed to save or encode state:", error);
  }
};

const autoSaveMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  // STATEMARKER
  saveState("characterState", state.character);
  saveState("inventoryState", state.inventory);
  saveState("messageState", state.message);
  saveState("globalTimeState", state.globalTime);
  saveState("progressState", state.progress);
  return result;
};

export const store = configureStore({
  reducer: {
    // STATEMARKER
    character: characterReducer,
    inventory: inventoryReducer,
    message: messageReducer,
    globalTime: globalTimeReducer,
    progress: progressReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(autoSaveMiddleware),
  preloadedState: {
    // STATEMARKER
    character: loadState("characterState", characterInitialState),
    inventory: loadState("inventoryState", inventoryInitialState),
    message: loadState("messageState", messageInitialState),
    globalTime: loadState("globalTimeState", globalTimeInitialState),
    progress: loadState("progressState", progressInitialState),
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
