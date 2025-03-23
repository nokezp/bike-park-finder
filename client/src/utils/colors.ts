type Color = 'emerald' | 'red' | 'green' | 'yellow' | 'purple' | 'blue' | 'orange';

const COLORS: Color[] = ['emerald', 'red', 'green', 'yellow', 'purple', 'blue', 'orange'];

export const getRandomColor = (): Color => {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
};

// Optional: Function to get a color by index (useful for consistent colors for the same item)
export const getColorByIndex = (index: number): Color => {
  return COLORS[index % COLORS.length];
};
