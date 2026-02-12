export const DIRECTIONS = ['Spirit', 'Intellect', 'Community', 'Mission'] as const;

export type Direction = (typeof DIRECTIONS)[number];

export type QuizOption = {
  direction: Direction;
  text: string;
};

export type QuizQuestion = {
  id: number;
  prompt: string;
  options: QuizOption[];
};

export type QuizResult = {
  totals: Record<Direction, number>;
  primaryDirection: Direction;
  secondaryDirection: Direction;
  primaryCFP: string;
  secondaryCFP: string;
  growthStretchDirection: Direction;
};

export type Church = {
  id: string;
  name: string;
  neighborhood: string;
  website: string;
  primaryDirection: Direction;
  tags: string[];
};
