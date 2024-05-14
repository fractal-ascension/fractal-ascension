import { LocationData } from "../../Data/Locations";
import { ForestClearingActivity } from "./ForestClearingActivity";
import { ForestClearingDescription } from "./ForestClearingDescription";

export const ForestClearing: LocationData = {
  id: "forest-clearing", 
  title: "Forest Clearing",
  rank: 0,
  levelRange: "1-1",
  type: "Safe Zone",
  description: "A small clearing in the forest with a fish pond and a variety of herbs and mushrooms.",
  initialActivity: "fc1",
  defaultActivity: "fc10",
  activities: ForestClearingActivity.activities,
  descriptions: ForestClearingDescription.description
};
