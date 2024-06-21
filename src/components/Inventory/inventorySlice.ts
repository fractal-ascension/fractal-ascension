import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Item, ItemType } from "../../Utils/Data/Items";

export type FilterType = "ALL" | ItemType;
export type SortCriteria = "AZ" | "09" | "TYPE" | "VAL";
export type SortType = "NONE" | `${SortCriteria}_ASC` | `${SortCriteria}_DESC`;

interface InventoryItem {
  id: string;
  amount: number;
}

interface InventoryState {
  items: InventoryItem[];
  filter: FilterType[];
  sort: SortType;
}

export const initialState: InventoryState = {
  items: [],
  filter: ["ALL"],
  sort: "TYPE_DESC",
};

export const saveInventory = createAsyncThunk("inventory/saveInventory", async (_, { getState }) => {
  const state = getState() as RootState;
  localStorage.setItem("inventoryState", JSON.stringify(state.inventory));
});

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addOrRemoveItem: (state, action: PayloadAction<{ item: Item; amount: number }>) => {
      const existingItemIndex = state.items.findIndex((i) => i.id === action.payload.item.id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].amount += action.payload.amount;
        if (state.items[existingItemIndex].amount <= 0) {
          state.items.splice(existingItemIndex, 1);
        }
      } else {
        if (action.payload.amount > 0) {
          state.items.push({
            id: action.payload.item.id,
            amount: action.payload.amount,
          });
        }
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    updateItem: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.items[index].amount = action.payload.amount;
      }
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = [action.payload];
    },
    addFilter: (state, action: PayloadAction<FilterType>) => {
      if (!state.filter.includes(action.payload)) {
        state.filter.push(action.payload);
      }
    },
    removeFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = state.filter.filter((f) => f !== action.payload);
    },
    clearFilters: (state) => {
      state.filter = ["ALL"];
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
  },
});

export const { addOrRemoveItem, removeItem, updateItem, setFilter, addFilter, removeFilter, clearFilters, setSort } = inventorySlice.actions;
export default inventorySlice.reducer;
