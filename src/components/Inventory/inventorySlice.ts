// src/features/inventory/inventorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define specific types for item types and filter/sort options
type ItemType = 'WPN' | 'USE' | 'EQP' | 'OTHER';
type FilterType = 'ALL' | ItemType;
export type SortCriteria = 'AZ' | '09' | 'TYPE' | 'VAL';
type SortType = 'NONE' | `${SortCriteria}_ASC` | `${SortCriteria}_DESC`;

interface InventoryItem {
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

const initialState: InventoryState = {
  items: [
    { name: 'A Stick', amount: 1, type: 'WPN', value: 1 },
    { name: 'Cure Grass', amount: 15, type: 'USE', value: 100 },
    { name: 'Iron Sword', amount: 2, type: 'WPN', value: 123 },
    { name: 'Healing Potion', amount: 5, type: 'USE', value: 12323 },
    { name: 'Leather Armor', amount: 1, type: 'EQP', value: 12222222 },
    { name: 'Mystery Ore', amount: 3, type: 'OTHER', value: 122222221 },
    { name: 'Silver Dagger', amount: 1, type: 'WPN', value: 0 },
    { name: 'Mana Potion', amount: 7, type: 'USE', value: 112312312311232 },
  ],
  filter: 'ALL',
  sort: 'NONE',
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<InventoryItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<{ name: string }>) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    updateItem: (state, action: PayloadAction<InventoryItem>) => {
      const index = state.items.findIndex(item => item.name === action.payload.name);
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
export default inventorySlice.reducer;
