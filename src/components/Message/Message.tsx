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
      <div className="message-header">
        <p>{title}</p>
        <p>{`${day} ${weekDay}/${month}/${year} ${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`}</p>
      </div>
      <div className="message-img">
        <img src={image} width={600} alt="Forest Clearing" />
      </div>
      <div className="message-text">
        <p>{description[0].desc}</p>
      </div>
    </div>
  );
};

export default Message;
