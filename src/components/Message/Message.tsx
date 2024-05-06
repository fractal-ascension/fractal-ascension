import "./Message.scss";
import { ForestClearing } from "../../Locations/ForestClearing/ForestClearing";
import { ForestClearingDescription } from "../../Locations/ForestClearing/ForestClearingDescription";
import { ForestClearingActivity } from "../../Locations/ForestClearing/ForestClearingActivity";
import { useGlobalTime } from "../../Utils/GlobalTime";

const Message = () => {
  const activities = [...ForestClearingActivity.activities];
  const title = ForestClearing.title;
  const image = ForestClearing.img;
  const description = ForestClearingDescription.description;

  const { day, weekDay, week, month, year, hour, minute } = useGlobalTime(825, 6);

  return (
    <div className="message-container">
      LOL
    </div>
  );
};

export default Message;
