export const DIRECTIONS = ['Spirit', 'Intellect', 'Community', 'Mission'] as const;
export type Direction = (typeof DIRECTIONS)[number];

export const PREFERENCE_ITEM_IDS = [
  'T1',
  'T2',
  'T3',
  'C1',
  'C2',
  'C3',
  'C4',
  'W1',
  'W2',
  'W3',
  'S1',
  'S2',
  'M1',
  'M2',
  'M3',
  'L1',
  'L2',
  'X1',
  'X2',
  'F1'
] as const;

export type PreferenceItemId = (typeof PREFERENCE_ITEM_IDS)[number];

export type QuizOption = {
  itemId: PreferenceItemId;
  text: string;
};

export type QuizQuestion = {
  id: number;
  options: QuizOption[];
};

export type SetAnswer = {
  most?: PreferenceItemId;
  least?: PreferenceItemId;
};

export type QuizResult = {
  itemScores: Record<PreferenceItemId, number>;
  rankedItems: Array<{ itemId: PreferenceItemId; text: string; score: number }>;
  topPreferences: Array<{ itemId: PreferenceItemId; text: string; score: number }>;
  lowPreferences: Array<{ itemId: PreferenceItemId; text: string; score: number }>;
};

export type Church = {
  id: string;
  name: string;
  neighborhood: string;
  website: string;
  primaryDirection: Direction;
  tags: string[];
};
