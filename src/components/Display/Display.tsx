import "./Display.scss";
import { ForestClearing } from "../../Locations/ForestClearing/ForestClearing";
import { ForestClearingDescription } from "../../Locations/ForestClearing/ForestClearingDescription";
import { ForestClearingActivity } from "../../Locations/ForestClearing/ForestClearingActivity";
import { dayEffects, monthEffects, weekEffects } from "../../Utils/globalTimeSlice";
import ReactDOMServer from "react-dom/server";
import { Tooltip } from "react-tooltip";

interface DisplayTimeProps {
  day: string;
  weekDay: number;
  weekName: string;
  week: number;
  monthName: string;
  month: number;
  year: number;
  hour: number;
  minute: number;
  ampm: string;
}

const Display = ({ day, weekName, weekDay, monthName, month, year, hour, minute, ampm }: DisplayTimeProps) => {
  const activities = [...ForestClearingActivity.activities];
  const title = ForestClearing.title;
  const image = ForestClearing.img;
  const description = ForestClearingDescription.description;
  const rank = ForestClearing.rank;
  const levelRange = ForestClearing.levelRange;
  const type = ForestClearing.type;
  const areaDescription = ForestClearing.description;

  const currentDay = day;
  return (
    <div className="display-container">
      <div className="display-header">
        <p
          data-tooltip-id="location-tooltip"
          data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
            <div>
              <hr />
              <b>{title}</b>
              <hr />
              Rank : [ {rank} ]
              <br />
              Level: [ {levelRange} ]
              <br />
              Type : [ {type} ]
              <hr />
              {areaDescription}
              <hr />
            </div>
          )}
        >
          {title}
          <Tooltip id="location-tooltip" className="location-tooltip" />
        </p>
        <p
          data-tooltip-id="date-tooltip"
          data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
            <div>
              <hr />
              <b>Day of {day}</b>
              <hr />
              {dayEffects
                .find((currDay) => currDay.id === currentDay)
                ?.effects.map((effect) => (
                  <div key={effect}>• {effect}</div>
                ))}
              <hr />

              <b>Week of the {weekName}</b>
              <hr />
              {weekEffects
                .find((currWeek) => currWeek.id === weekName)
                ?.effects.map((effect) => (
                  <div key={effect}>• {effect}</div>
                ))}

              <hr />
              <b>Month of {monthName}</b>
              <hr />
              {monthEffects
                .find((currMonth) => currMonth.id === monthName)
                ?.effects.map((effect) => (
                  <div key={effect}>• {effect}</div>
                ))}
            </div>
          )}
        >
          {`[${day}] ${weekDay}/${month}/${year} ${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")} ${ampm}`}
          <Tooltip id="date-tooltip" className="tooltip" />
        </p>
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
