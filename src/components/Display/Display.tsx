import "./Display.scss";
import { dayEffects, monthEffects, weekEffects } from "../../Utils/Slices/globalTimeSlice";
import ReactDOMServer from "react-dom/server";
import { Tooltip, TooltipRefProps } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Activity, ActivityTypes } from "../../Utils/Data/Locations";
import { setActiveActivity } from "../../Utils/Slices/progressSlice";
import { addOrRemoveItem } from "../Inventory/inventorySlice";
import { getStarRepresentation } from "../../Utils/Data/Icons";
import { addMessage } from "../Message/messageSlice";
import { modifyStat } from "../Character/characterSlice";
import { ItemTooltipUtil } from "../../Utils/Functions/ItemTooltipUtil";
import { fullStatNames, statAbbreviations } from "../../Utils/Data/Stats";
import locations from "../../Utils/Data/LocationList";
import { useRef } from "react";

const Display = () => {
  const dispatch = useDispatch();
  const tooltipRef = useRef<TooltipRefProps>(null);

  const progress = useSelector((state: RootState) => state.progress);
  const time = useSelector((state: RootState) => state.globalTime);
  const skill = useSelector((state: RootState) => state.character.skill);
  const activeArea = progress.activeLocation;
  const activeActivity = progress.activeActivity;

  const locationData = locations[activeArea] || locations["forest-clearing"]; // Fallback to a default location if needed

  const activities = locationData.activities;
  const title = locationData.title;
  const descriptions = locationData.descriptions;
  const rank = locationData.rank;
  const levelRange = locationData.levelRange;
  const type = locationData.type;
  const areaDescription = locationData.description;

  const currentDay = time.day;

  const activity = activities.find((activity) => activity.id === activeActivity);
  const description = descriptions.find((desc) => desc.id === activeActivity)?.desc; // Find description matching the activity id
  const image = descriptions.find((desc) => desc.id === activeActivity)?.img; // Find description matching the activity id

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
          data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
            <span>
              {branchActivity.tooltip}
              {branchActivity.effect
                ? branchActivity.effect.map((effect) =>
                    effect.id === ActivityTypes.StatChange
                      ? effect.effect.map((statChange) => (
                          <span key={statChange.stat}>
                            <hr />
                            {statChange.value > 0 ? "+" : ""}
                            {statChange.value} {fullStatNames[statAbbreviations[statChange.stat]]}
                          </span>
                        ))
                      : effect.id === ActivityTypes.ItemChange
                      ? effect.effect.map((itemChange) => <span key={itemChange.item.id}>{ItemTooltipUtil(itemChange.item, skill)}</span>)
                      : null
                  )
                : null}
            </span>
          )}
        >
          {branchActivity.icon} {branchActivity.name}
          {branchActivity.tooltip ? <Tooltip id="branchActivity-tooltip" ref={tooltipRef} className="branchActivity-tooltip" /> : null}
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
        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
          <span>
            {activity.tooltip}
            {activity.effect
              ? activity.effect.map((effect) =>
                  effect.id === ActivityTypes.StatChange
                    ? effect.effect.map((statChange) => (
                        <span key={statChange.stat}>
                          <hr />
                          {statChange.value > 0 ? "+" : ""}
                          {statChange.value} {fullStatNames[statAbbreviations[statChange.stat]]}
                        </span>
                      ))
                    : effect.id === ActivityTypes.ItemChange
                    ? effect.effect.map((itemChange) => <span key={itemChange.item.id}>{ItemTooltipUtil(itemChange.item, skill)}</span>)
                    : null
                )
              : null}
          </span>
        )}
      >
        {activity.icon} {activity.name}
        {activity.tooltip ? <Tooltip id="activity-tooltip" ref={tooltipRef} className="activity-tooltip" /> : null}
      </div>
    );
  };

  const clickActivity = (activity: Activity) => {
    console.log("Clicked activity: ", activity);
    dispatch(
      addMessage({
        timestamp: `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")} ${time.ampm}`,
        message: `${description}`,
        type: "activity",
      })
    );
    // Tooltip Message
    activity.tooltip
      ? activity.effect
        ? dispatch(
            addMessage({
              timestamp: `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")} ${time.ampm}`,
              message: `${activity.icon} ${activity.name}`,
              type: "activity",
              tooltip: `${activity.tooltip}`,
              effect: activity.effect,
            })
          )
        : dispatch(
            addMessage({
              timestamp: `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")} ${time.ampm}`,
              message: `${activity.icon} ${activity.name}`,
              type: "activity",
              tooltip: `${activity.tooltip}`,
            })
          )
      : activity.effect
      ? dispatch(
          addMessage({
            timestamp: `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")} ${time.ampm}`,
            message: `${activity.icon} ${activity.name}`,
            type: "activity",
            effect: activity.effect,
          })
        )
      : dispatch(
          addMessage({
            timestamp: `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")} ${time.ampm}`,
            message: `${activity.icon} ${activity.name}`,
            type: "activity",
          })
        );

    dispatch(setActiveActivity(activity.next));
    activity.effect?.forEach((effect) => {
      if (effect.id === ActivityTypes.StatChange) {
        console.log("Stat change effect: ", effect);
        effect.effect.forEach((statChange) => {
          console.log(`Changing stat ${statChange.stat} by ${statChange.value}`);
          dispatch(modifyStat({ statName: statChange.stat, value: statChange.value }));
          // Handle stat changes if needed, perhaps with another dispatch
        });
      } else if (effect.id === ActivityTypes.ItemChange) {
        console.log("Item effect: ", effect);
        effect.effect.forEach((itemChange) => {
          console.log("Giving item: ", itemChange.item, " Amount: ", itemChange.value);
          dispatch(addOrRemoveItem({ item: itemChange.item, amount: itemChange.value }));
        });
      }
    });
    tooltipRef.current?.close();
    setTimeout(() => tooltipRef.current?.open(), 0);
  };

  // DEBUG
  const goBack = (activity: Activity) => {
    activity.previous ? dispatch(setActiveActivity(activity.previous)) : null;
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
              Rank : [ {getStarRepresentation(rank)} ]
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
              <b>Day of {time.day}</b>
              <hr />
              {dayEffects
                .find((currDay) => currDay.id === currentDay)
                ?.effects.map((effect) => (
                  <div key={effect}>• {effect}</div>
                ))}
              <hr />

              <b>Week of the {time.weekName}</b>
              <hr />
              {weekEffects
                .find((currWeek) => currWeek.id === time.weekName)
                ?.effects.map((effect) => (
                  <div key={effect}>• {effect}</div>
                ))}

              <hr />
              <b>Month of {time.monthName}</b>
              <hr />
              {monthEffects
                .find((currMonth) => currMonth.id === time.monthName)
                ?.effects.map((effect) => (
                  <div key={effect}>• {effect}</div>
                ))}
            </div>
          )}
        >
          {`[${time.day}] ${time.weekDay}/${time.week}/${time.month}/${time.year} ${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")} ${time.ampm}`}
          <Tooltip id="date-tooltip" className="tooltip" />
        </p>
      </div>
      <div className="display-img">
        <img src={image} alt="Forest Clearing" />
        <div className="display-text">
          <p>{description || "No description available."}</p>
        </div>
      </div>
      <div className="display-actions">{activity ? renderActivity(activity) : <p>No activities available.</p>}</div>
      {/* DEBUG */}
      <div className="display-footer">
        <button className="display-back" onClick={() => goBack(activity!)} disabled={!activity?.previous}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Display;
