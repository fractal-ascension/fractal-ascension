import "./Display.scss";
import { ForestClearing } from "../../location/forestClearing";

const Display = () => {
  const activities = [...ForestClearing.activities];
  const title = ForestClearing.title;
  const image = ForestClearing.img;
  const description = ForestClearing.description;

  const handleActivityClick = (activityName: string) => {
    console.log(`${activityName} was clicked.`);
    // Implement your click handling logic here
  };

  return (
    <div className="display-container">
      <div className="display-header">
        <p>{title}</p>
        <p>Fire 01/01/825 06:00</p>
      </div>
      <div className="display-img">
        <img src={image} width={600} alt="Forest Clearing" />
      </div>
      <div className="display-text">
        <p>
          {description[0].desc}
        </p>
      </div>
      <div className="display-actions">
        {activities.map((activity) => (
          <div key={activity.name} className="display-action" onClick={() => handleActivityClick(activity.name)}>
            {activity.icon} {activity.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
