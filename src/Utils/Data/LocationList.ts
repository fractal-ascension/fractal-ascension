import { ForestClearing } from "../Locations/ForestClearing/ForestClearing";
import { ForestPond } from "../Locations/ForestPond/ForestPond";
import { LocationData } from "./Locations";

// Map location IDs to their respective data modules
const locations: { [key: string]: LocationData } = {
  "forest-clearing": ForestClearing,
  "forest-pond": ForestPond,
  // add more locations
};

export default locations;
