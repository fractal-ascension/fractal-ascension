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

const daysOfWeek = ["Fire", "Water", "Earth", "Air", "Arcane"];
const daysOfWeekEffects = [
  {
    fire: {},
  },
];
const weeksOfMonth = ["Warlord", "Healer", "Architect", "Explorer", "Scholar"];
const monthsOfYear = ["Inferno", "Deluge", "Harvest", "Gale", "Cosmos"];

export const useGlobalTime = (initialYear: number, initialHour: number) => {
  const [date, setDate] = useState<DateState>({
    day: daysOfWeek[0],
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
        const day = daysOfWeek[(weekDay - 1) % 5];
        const weekName = weeksOfMonth[(week - 1) % 5];
        const monthName = monthsOfYear[(month - 1) % 5];

        return { ...prev, minute, hour, weekDay, week, month, year, day, weekName, monthName };
      });
    }, 1000); // Increment every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return date;
};
