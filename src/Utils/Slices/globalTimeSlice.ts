import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface DateState {
  day: string;
  weekDay: number;
  weekName: string;
  week: number;
  monthName: string;
  month: number;
  year: number;
  hour: number;
  minute: number;
  ampm: string;
}

const days = ["Fire", "Water", "Earth", "Air", "Arcane"];
export const dayEffects = [
  {
    id: "Fire",
    effects: ["+10% Fire Damage", "+10% Slashing Damage"],
  },
  {
    id: "Water",
    effects: ["+10% Water Damage", "+10% Piercing Damage"],
  },
  {
    id: "Earth",
    effects: ["+10% Earth Damage", "+10% Blunt Damage"],
  },
  {
    id: "Air",
    effects: ["+10% Air Damage", "+10% Attack Speed"],
  },
  {
    id: "Arcane",
    effects: ["+10% Arcane Damage", "+10% Armor Penetration"],
  },
];

const weeksOfMonth = ["Warlord", "Healer", "Architect", "Explorer", "Scholar"];
export const weekEffects = [
  {
    id: "Warlord",
    effects: ["+10% Damage", "+10% Critical Chance", "+10% Hit Chance"],
  },
  {
    id: "Healer",
    effects: ["+10% Max Health", "+10% Health Regen", "+10% Healing Received"],
  },
  {
    id: "Architect",
    effects: ["+10% Resource Gain", "+10% Crafting Speed", "+10% Building Effectiveness"],
  },
  {
    id: "Explorer",
    effects: ["+10% Loot Quality", "+10% Loot Drop Rate", "+10% Luck"],
  },
  {
    id: "Scholar",
    effects: ["+10% Character EXP Gain", "+10% Skill EXP Gain", "+10% Knowledge Gain"],
  },
];

const monthsOfYear = ["Inferno", "Deluge", "Harvest", "Gale", "Cosmos"];
export const monthEffects = [
  {
    id: "Inferno",
    effects: ["Unique Fire Bonuses."],
  },
  {
    id: "Deluge",
    effects: ["Unique Water Bonuses."],
  },
  {
    id: "Harvest",
    effects: ["Unique Earth Bonuses."],
  },
  {
    id: "Gale",
    effects: ["Unique Air Bonuses."],
  },
  {
    id: "Cosmos",
    effects: ["Unique Arcane Bonuses."],
  },
];

export const initialState: DateState = {
  day: days[0],
  weekDay: 1,
  weekName: weeksOfMonth[0],
  week: 1,
  monthName: monthsOfYear[0],
  month: 1,
  year: 825,
  hour: 6,
  minute: 0,
  ampm: "AM",
};

// Define an async thunk for saving character data
export const saveGlobalTime = createAsyncThunk(
  "globalTime/saveGlobalTime",
  async (_, { getState }) => {
    const state = getState() as RootState; // Ensure you have a RootState type defined in your store.ts
    localStorage.setItem("globalTimeState", JSON.stringify(state.globalTime));
  }
);

// Thunk for updating time
export const updateTime = createAsyncThunk(
  "globalTime/updateTime",
  async (_, { dispatch }) => {
    // Correctly dispatch the action using the action creator
    dispatch(tickTime());
  }
);

export const globalTimeSlice = createSlice({
  name: 'globalTime',
  initialState,
  reducers: {
    tickTime: (state) => {
      // Increment logic for minute, hour, etc.
      state.minute++;
      if (state.minute === 60) {
        state.minute = 0;
        state.hour++;
        if (state.hour === 12 && state.ampm === "AM") {
          state.ampm = "PM";
        } else if (state.hour === 12 && state.ampm === "PM") {
          state.ampm = "AM";
          state.weekDay++;
          if (state.weekDay > 5) {
            state.weekDay = 1;
            state.week++;
            if (state.week > 5) {
              state.week = 1;
              state.month++;
              if (state.month > 5) {
                state.month = 1;
                state.year++;
              }
            }
          }
          // Additional logic for day, week, month, year updates
        } else if (state.hour === 13) {
          state.hour = 1;
        }
      }
      // Update day, weekName, and monthName
      state.day = days[(state.weekDay - 1) % 5];
      state.weekName = weeksOfMonth[(state.week - 1) % 5];
      state.monthName = monthsOfYear[(state.month - 1) % 5];
    },
  },
});

export const { tickTime } = globalTimeSlice.actions;

export default globalTimeSlice.reducer;
