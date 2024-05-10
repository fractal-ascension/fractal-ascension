// locationsConfig.ts
import { ForestClearing } from "./ForestClearing/ForestClearing";
import { ForestPond } from "./ForestPond/ForestPond";

export interface EffectDetail {
  stat: string;
  value: number;
}

export interface StatChangeEffect {
  id: string;
  effect: EffectDetail[];
}

export interface Activity {
  id: string;
  name?: string;
  icon?: string;
  next?: string;
  tooltip?: string;
  effect?: StatChangeEffect[];
  branch?: Activity[];
}

export interface Activities {
  activities: Activity[];
}

export interface Description {
  id: string;
  desc: string;
}

export interface Descriptions {
  description: Description[];
}

export interface LocationData {
  id: string;
  title: string;
  img: string;
  rank: string;
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
