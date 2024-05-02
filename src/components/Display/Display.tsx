import "./Display.scss";

const Display = () => {
  const activities = [
    { name: "Talk to the village elder", icon: "🗨️" },
    { name: "Trade with village trader", icon: "🛒" },
    { name: "Work on the fields", icon: "🌾" },
    { name: "Go for a run around the village", icon: "🏃" },
    { name: "Try to carry some bags of grain", icon: "🎒" },
    { name: "Go to Shack", icon: "🏚️" },
    { name: "Go to Nearby cave", icon: "🕳️" },
    { name: "Enter the Infested field", icon: "🐀" },
  ];

  const handleActivityClick = (activityName: string) => {
    console.log(`${activityName} was clicked.`);
    // Implement your click handling logic here
  };

  return (
    <div className="display-container">
      <div className="display-header">
        <p>Forest Clearing</p>
        <p>Fire 01/01/825 06:00</p>
      </div>
      <div className="display-img">
        <img src={Forest_Clearing} width={600} alt="Forest Clearing" />
      </div>
      <div className="display-text">
        <p>
          Your eyes open. The bright blue sky and waving trees greet you. A jolt of pain pierces through your head as you push your hands against the
          moist dirt and sharp grass in an effort to stand up. Wobbling, you manage to right yourself. Where are you? Who are you?
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
