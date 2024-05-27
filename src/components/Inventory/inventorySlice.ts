// src/features/inventory/inventorySlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Item, ItemType } from "../../Utils/Data/Items";

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

export const saveInventory = createAsyncThunk("inventory/saveInventory", async (_, { getState }) => {
  const state = getState() as RootState; // Use your RootState
  localStorage.setItem("inventoryState", JSON.stringify(state.inventory));
});

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addOrRemoveItem: (state, action: PayloadAction<{ item: Item; amount: number }>) => {
      const existingItemIndex = state.items.findIndex((i) => i.id === action.payload.item.id);
      if (existingItemIndex !== -1) {
        // Adjust item amount
        state.items[existingItemIndex].amount += action.payload.amount;
        // Remove item if the amount is zero or less
        if (state.items[existingItemIndex].amount <= 0) {
          state.items.splice(existingItemIndex, 1);
        }
      } else {
        // Add new item only if amount is greater than zero
        if (action.payload.amount > 0) {
          state.items.push({
            ...action.payload.item,
            amount: action.payload.amount,
          });
        }
      }
    },
    removeItem: (state, action: PayloadAction<{ item: Item }>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.item.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },

    updateItem: (state, action: PayloadAction<{ item: Item }>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.item.id);
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

export const { addOrRemoveItem, removeItem, updateItem, setFilter, setSort } = inventorySlice.actions;
export default inventorySlice.reducer;
