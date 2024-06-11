import { Item } from "../Items";
import { ManualList } from "./Tools/ManualList";
import { ArcaneTomeList } from "./Weapons/ArcaneTomeList";
import { BowList } from "./Weapons/BowList";
import { ClubList } from "./Weapons/ClubList";
import { HammerList } from "./Weapons/HammerList";
import { SwordList } from "./Weapons/SwordList";

export const ItemList: Item[] = [
  ...ManualList,
  ...ArcaneTomeList,
  ...BowList,
  ...ClubList,
  ...HammerList,
  ...SwordList,
];
