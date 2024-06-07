/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum Icons {
  Strength = "💪",
  Vitality = "❤️",
  Agility = "🏃",
  Dexterity = "🎯",
  Intelligence = "🧠",
  Wisdom = "📚",
  Perception = "👁️",
  Luck = "🍀",
  Hunger = "🍔",
  SP = "⚡",
  Thirst = "💧",
  MP = "🔮",
  Sleep = "😴",
  Energy = "🔋",
  XP = "🌟",
  DodgeChance = "🛡️",
  CriticalChance = "💥",
  Book = "📖",
  Sword = "⚔️",
  Bow = "🏹",
  Nature = "🌿",
  Skull = "💀",
  Home = "🏠",
  Pickaxe = "⛏️",

  // For Combat Stats
  PD = "⚔️",
  MD = "🔮",
  AR = "💿",
  MR = "🌟",
  BCh = "🛡️",
  DCh = "🦶",
  CCh = "💥",
  CMult = "🔥",
  HCh = "🎯",
  AtkSpd = "⚡",
  APen = "🏹",
  MPen = "✨",
}

export const getStarRepresentation = (rank: number) => {
  if (rank === 0) return "☆"; // Directly return one empty star for rank 0

  const filledStars = Math.ceil(rank / 2); // Compute number of filled stars
  const totalStars = filledStars + (rank % 2); // Add one more star if rank is odd

  const stars = "★".repeat(filledStars) + "☆".repeat(totalStars - filledStars);
  return stars;
};
