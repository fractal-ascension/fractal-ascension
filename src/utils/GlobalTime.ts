// GlobalTime.ts
import { useState, useEffect } from "react";

type DateState = {
  day: string;
  weekDay: number;
  weekName: string;
  week: number;
  monthName: string;
  month: number;
  year: number;
  hour: number;
  minute: number;
};

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
]

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
]

export const useGlobalTime = (initialYear: number, initialHour: number) => {
  const [date, setDate] = useState<DateState>({
    day: days[0],
    weekDay: 1,
    weekName: weeksOfMonth[0],
    week: 1,
    monthName: monthsOfYear[0],
    month: 1,
    year: initialYear,
    hour: initialHour,
    minute: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setDate((prev) => {
        let { minute, hour, weekDay, week, month, year } = prev;

        minute++;
        if (minute === 60) {
          minute = 0;
          hour++;
          if (hour === 24) {
            hour = 0;
            weekDay++;
            if (weekDay > 5) {
              weekDay = 1;
              week++;
              if (week > 5) {
                week = 1;
                month++;
                if (month > 5) {
                  month = 1;
                  year++;
                }
              }
            }
          }
        }

        // Calculate new day, weekName, and monthName based on the updated counters
        const day = days[(weekDay - 1) % 5];
        const weekName = weeksOfMonth[(week - 1) % 5];
        const monthName = monthsOfYear[(month - 1) % 5];

        return { ...prev, minute, hour, weekDay, week, month, year, day, weekName, monthName };
      });
    }, 1000); // Increment every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return date;
};
