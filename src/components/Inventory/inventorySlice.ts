// src/features/inventory/inventorySlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Define specific types for item types and filter/sort options
export type ItemType = "WPN" | "USE" | "CMBT" | "EQP" | "TOOL" | "ETC";
type FilterType = "ALL" | ItemType;
export type SortCriteria = "AZ" | "09" | "TYPE" | "VAL";
type SortType = "NONE" | `${SortCriteria}_ASC` | `${SortCriteria}_DESC`;

export interface InventoryItem {
  name: string;
  amount: number;
  type: ItemType;
  value: number;
}

interface InventoryState {
  items: InventoryItem[];
  filter: FilterType;
  sort: SortType;
}

export const initialState: InventoryState = {
  items: [],
  filter: "ALL",
  sort: "TYPE_DESC",
};

export const saveInventory = createAsyncThunk(
  "inventory/saveInventory",
  async (_, { getState }) => {
    const state = getState() as RootState; // Use your RootState
    localStorage.setItem("inventoryState", JSON.stringify(state.inventory));
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<InventoryItem>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.name === action.payload.name && item.type === action.payload.type
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].amount += action.payload.amount;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<{ name: string; type: ItemType }>) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name || item.type !== action.payload.type
      );
    },
    updateItem: (state, action: PayloadAction<InventoryItem>) => {
      const index = state.items.findIndex(
        (item) => item.name === action.payload.name && item.type === action.payload.type
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    setSort: (state, action: PayloadAction<SortCriteria>) => {
      const isCurrentSortAsc = state.sort === `${action.payload}_ASC`;
      state.sort = isCurrentSortAsc ? `${action.payload}_DESC` : `${action.payload}_ASC`;
    },
  },
});

export const { addItem, removeItem, updateItem, setFilter, setSort } = inventorySlice.actions;
export const selectInventory = (state: { inventory: InventoryState }) => state.inventory;
export default inventorySlice.reducer;
