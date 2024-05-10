// src/features/inventory/inventorySlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Item, ItemType } from "../../Interfaces/Items";

// Define specific types for item types and filter/sort options
type FilterType = "ALL" | ItemType;
export type SortCriteria = "AZ" | "09" | "TYPE" | "VAL";
type SortType = "NONE" | `${SortCriteria}_ASC` | `${SortCriteria}_DESC`;

interface InventoryState {
  items: Item[];
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
    addItem: (state, action: PayloadAction<{ item: Item; amount: number }>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.name === action.payload.item.name && item.type === action.payload.item.type
      );
      if (existingItemIndex !== -1) {
        // If item exists, update its amount
        state.items[existingItemIndex].amount += action.payload.amount;
      } else {
        // If item does not exist, push a new object with initial amount
        state.items.push({
          ...action.payload.item,
          amount: action.payload.amount, // Ensure the amount is set
        });
      }
    },
    removeItem: (state, action: PayloadAction<{ name: string; type: ItemType }>) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name || item.type !== action.payload.type
      );
    },
    updateItem: (state, action: PayloadAction<Item>) => {
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
