import Forest_Clearing from "../../assets/Forest Clearing.jpg";
import { LocationData } from "../locations";
import { ForestClearingActivity } from "./ForestClearingActivity";
import { ForestClearingDescription } from "./ForestClearingDescription";

export const ForestClearing: LocationData = {
  id: "forest-clearing", 
  title: "Forest Clearing",
  img: Forest_Clearing,
  rank: "☆", //★
  levelRange: "1-1",
  type: "Safe Zone",
  description: "A small clearing in the forest with a fish pond and a variety of herbs and mushrooms.",
  initialActivity: "fc1",
  defaultActivity: "fc10",
  activities: ForestClearingActivity.activities,
  descriptions: ForestClearingDescription.description
};
