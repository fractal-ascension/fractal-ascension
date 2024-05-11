const Icons = {
  iconList: [
    { id: "strength", icon: "💪" },
    { id: "vitality", icon: "❤️" },
    { id: "agility", icon: "🏃" },
    { id: "dexterity", icon: "🎯" },
    { id: "intelligence", icon: "🧠" },
    { id: "wisdom", icon: "📚" },
    { id: "perception", icon: "👁️" },
    { id: "luck", icon: "🍀" },
    { id: "hp", icon: "❤️" },
    { id: "hunger", icon: "🍔" },
    { id: "sp", icon: "⚡" },
    { id: "thirst", icon: "💧" },
    { id: "mp", icon: "🔮" },
    { id: "sleep", icon: "😴" },
    { id: "energy", icon: "🔋" },
    { id: "xp", icon: "🌟" },
    { id: "nextLevelExperience", icon: "🌟" },
    { id: "hitChance", icon: "🎯" },
    { id: "dodgeChance", icon: "🛡️" },
    { id: "criticalChance", icon: "💥" },
    { id: "book", icon: "📖" },
    { id: "sword", icon: "⚔️" },
    { id: "bow", icon: "🏹" },
    { id: "nature", icon: "🌿" },
  ],
};

export const getIconById = (id: string) => {
  const icon = Icons.iconList.find((iconItem) => iconItem.id === id);
  return icon ? icon.icon : ""; // Returns an empty string if no icon is found
};

export const getStarRepresentation = (rank: number) => {
  if (rank === 0) return '☆'; // Directly return one empty star for rank 0

  const filledStars = Math.ceil(rank / 2); // Compute number of filled stars
  const totalStars = filledStars + (rank % 2); // Add one more star if rank is odd

  const stars = "★".repeat(filledStars) + "☆".repeat(totalStars - filledStars);
  return stars;
};