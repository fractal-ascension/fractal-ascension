// locationsConfig.ts
import { Item } from "./Items";
import { Stats } from "./Stats";

export enum ActivityTypes {
  StatChange = "StatChange",
  ItemChange = "ItemChange",
}

export interface StatChangeEffect {
  id: ActivityTypes.StatChange;
  effect: {
    stat: keyof Stats;
    value: number;
  }[];
}

export interface ItemChangeEffect {
  id: ActivityTypes.ItemChange;
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
  effect?: (StatChangeEffect | ItemChangeEffect)[];
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
