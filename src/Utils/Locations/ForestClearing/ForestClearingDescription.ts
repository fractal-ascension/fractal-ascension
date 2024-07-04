import { Descriptions } from "../../Data/Locations";
import ForestClearing from "../../../assets/Forest Clearing.jpg";
import ForestclearingBook1 from "../../../assets/ForestClearingBook1.jpg";
import ForestClearingBook2 from "../../../assets/ForestClearingBook2.jpg";
import Attic from "../../../assets/Attic.jpg";
import Campfire from "../../../assets/Campfire.jpg";
import EscortWagon from "../../../assets/EscortWagon.jpg";
import Attack from "../../../assets/Attack.jpg";

export const ForestClearingDescription: Descriptions = {
  description: [
    {
      id: "fc1",
      desc: "Your eyes open. The bright blue sky greet you. You're lying on floor, damp dirt and soft grass. A jolt of pain pierces through your head as you try to stand. Wobbling, you manage to right yourself. Where are you? Who are you?",
      img: ForestClearing,
    },
    {
      id: "fc2",
      desc: "Nothing immediately useful meets your eyes except a tattered book. You also find a sturdy stick and a round rock for primitive self-defense.",
      img: ForestclearingBook1,
    },
    {
      id: "fc3",
      desc: "You carefully open the book and find that it's a diary. Was this diary yours? You flip to the first entry. 'Day 1: I got a diary, something only nobles and wealthy merchants can afford. It was...",
      img: ForestClearingBook2,
    },
    {
      id: "fc4",
      desc: "You flip the page. 'Day 2: This diary has great timing, the day after I get it, something interesting happens. The entire village was drafted by nobles go to the Redthorn Forest and look for... something. Didn't say what it was, but they said we'll know when we see it. We're leaving tomorrow, I better remember to bring my...",
      img: Attic,
    },
    {
      id: "fc5",
      desc: "The pages get a bit dirtier. 'Day 9: We've been traveling for about a week. The villagers are getting tired. Last night, one of the escorts approached me. Said they were a...",
      img: Campfire,
    },
    {
      id: "fc6",
      desc: "You turn the page, skipping many other pages either ripped or too dirty to read. You find one, though covered in blood, 'Day 21: The road has disappeared, trees and tall vegetation surround us. The escorts seem to be getting nervous. Seems something will happen tonight...",
      img: EscortWagon,
    },
    {
      id: "fc7",
      desc: "You turn to the next page, you can barely make out the words through the blood, 'Mons..rs. Red cloaks s..rounded us, g..nt beas.. in tow. We were food. They di..'t need our h.lp, they needed hum.. flesh. I have to run...",
      img: Attack,
    },
  ],
};
