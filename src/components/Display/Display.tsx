import "./Display.scss";
import { dayEffects, monthEffects, weekEffects } from "../../Utils/globalTimeSlice";
import ReactDOMServer from "react-dom/server";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import locations, { Activity } from "../../Locations/locations";
import { setActiveActivity } from "../../Utils/progressSlice";

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

const Display = ({
  day,
  weekName,
  weekDay,
  monthName,
  week,
  month,
  year,
  hour,
  minute,
  ampm,
}: DisplayTimeProps) => {
  const dispatch = useDispatch();

  const progress = useSelector((state: RootState) => state.progress);
  const activeArea = progress.activeLocation;
  const activeActivity = progress.activeActivity;

  const locationData = locations[activeArea] || locations["forest-clearing"]; // Fallback to a default location if needed

  const activities = locationData.activities;
  const title = locationData.title;
  const image = locationData.img;
  const descriptions = locationData.descriptions;
  const rank = locationData.rank;
  const levelRange = locationData.levelRange;
  const type = locationData.type;
  const areaDescription = locationData.description;

  const currentDay = day;

  const activity = activities.find((activity) => activity.id === activeActivity);
  const description = descriptions.find((desc) => desc.id === activeActivity)?.desc; // Find description matching the activity id

  // Function to render a single activity or a list of branch activities
  const renderActivity = (activity: Activity) => {
    // If there are branches, map over them and return
    if (activity.branch) {
      return activity.branch.map((branchActivity: Activity) => (
        <div
          key={branchActivity.id}
          className="display-action"
          onClick={() => clickActivity(branchActivity)}
          data-tooltip-id="branchActivity-tooltip"
          data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<p>{branchActivity.tooltip}</p>)}
        >
          {branchActivity.icon} {branchActivity.name}
          {branchActivity.tooltip ? <Tooltip id="branchActivity-tooltip" className="branchActivity-tooltip" /> : null}
        </div>
      ));
    }
    // Otherwise, return the main activity
    return (
      <div
        key={activity.id}
        className="display-action"
        onClick={() => clickActivity(activity)}
        data-tooltip-id="activity-tooltip"
        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<p>{activity.tooltip}</p>)}
      >
        {activity.icon} {activity.name}
        {activity.tooltip ? <Tooltip id="activity-tooltip" className="activity-tooltip" /> : null}
      </div>
    );
  };

  const clickActivity = (activity: Activity) => {
    console.log("Clicked activity: ", activity);
    dispatch(setActiveActivity(activity.next));
  };

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
          {`[${day}] ${weekDay}/${week}/${month}/${year} ${hour
            .toString()
            .padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${ampm}`}
          <Tooltip id="date-tooltip" className="tooltip" />
        </p>
      </div>
      <div className="display-img">
        <img src={image} alt="Forest Clearing" />
        <div className="display-text">
          <p>{description || "No description available."}</p>
        </div>
      </div>
      <div className="display-actions">
        {activity ? renderActivity(activity) : <p>No activities available.</p>}
      </div>
    </div>
  );
};

export default Display;
