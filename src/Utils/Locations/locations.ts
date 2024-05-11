// locationsConfig.ts
import { Item } from "../Interfaces/Items";
import { Stats } from "../Interfaces/Stats";
import { ForestClearing } from "./ForestClearing/ForestClearing";
import { ForestPond } from "./ForestPond/ForestPond";

export interface StatChangeEffect {
  id: "statChange";
  effect: {
    stat: keyof Stats;
    value: number;
  }[];
}

export interface ItemChangeEffect {
  id: "itemChange";
  effect: {
    item: Item;
    value: number;
  }[];
}

export interface Activity {
  id: string;
  name?: string;
  icon?: string;
  next?: string;
  previous?: string;
  tooltip?: string;
  effect?: StatChangeEffect[] | ItemChangeEffect[];
  branch?: Activity[];
}

export interface Activities {
  activities: Activity[];
}

export interface Description {
  id: string;
  desc: string;
  img: string;
}

export interface Descriptions {
  description: Description[];
}

export interface LocationData {
  id: string;
  title: string;
  rank: number;
  levelRange: string;
  type: string;
  description: string;
  initialActivity: string;
  defaultActivity: string;
  activities: Activity[];
  descriptions: Description[];
}

// Map location IDs to their respective data modules
const locations: { [key: string]: LocationData } = {
  "forest-clearing": ForestClearing,
  "forest-pond": ForestPond,
  // add more locations
};

export default locations;
