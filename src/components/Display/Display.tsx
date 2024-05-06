import "./Display.scss";
import { ForestClearing } from "../../Locations/ForestClearing/ForestClearing";
import { ForestClearingDescription } from "../../Locations/ForestClearing/ForestClearingDescription";
import { ForestClearingActivity } from "../../Locations/ForestClearing/ForestClearingActivity";
import { useGlobalTime } from "../../Utils/GlobalTime";
import ReactDOMServer from "react-dom/server";
import { Tooltip } from "react-tooltip";

const Display = () => {
  const activities = [...ForestClearingActivity.activities];
  const title = ForestClearing.title;
  const image = ForestClearing.img;
  const description = ForestClearingDescription.description;

  const { day, weekDay, month, year, hour, minute } = useGlobalTime(825, 6);

  return (
    <div className="display-container">
      <div className="display-header">
        <p>{title}</p>
        <p
          data-tooltip-id="my-tooltip"
          data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
            <div>
              <b>Day of {day}</b>
              <hr />
            </div>
          )}
        >
          {`${day} ${weekDay}/${month}/${year} ${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`}
        </p>
        <Tooltip id="my-tooltip" className="tooltip" />
      </div>
      <div className="display-img">
        <img src={image} alt="Forest Clearing" />
        <div className="display-text">
          <p>{description[0].desc}</p>
        </div>
      </div>
      <div className="display-actions">
        {activities.map((activity) => (
          <div key={activity.name} className="display-action">
            {activity.icon} {activity.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
