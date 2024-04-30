import './Display.scss';

const Display = () => {
  const activities = [
    { name: 'Talk to the village elder', icon: '🗨️' },
    { name: 'Trade with village trader', icon: '🛒' },
    { name: 'Work on the fields', icon: '🌾' },
    { name: 'Go for a run around the village', icon: '🏃' },
    { name: 'Try to carry some bags of grain', icon: '🎒' },
    { name: 'Go to Shack', icon: '🏚️' },
    { name: 'Go to Nearby cave', icon: '🕳️' },
    { name: 'Enter the Infested field', icon: '🐀' },
  ];

  const handleActivityClick = (activityName: string) => {
    console.log(`${activityName} was clicked.`);
    // Implement your click handling logic here
  };

  return (
    <div className="display-container">
      <div className="display-header">
        <p>Saturday 21/09/1000 16:58⛅</p>
        <p>Village</p>
        <p>
          Medium-sized village built near a small river. It's surrounded by many fields, a few of them infested by huge rats which, while an annoyance, don't seem possible to fully eradicate. Other than that, there's nothing interesting around
        </p>
      </div>
      <div className="display-actions">
        {activities.map((activity) => (
          <div
            key={activity.name}
            className="display-action"
            onClick={() => handleActivityClick(activity.name)}
          >
            {activity.icon} {activity.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
