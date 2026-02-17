import { PreferenceItemId, QuizQuestion } from '@/lib/types';

export const preferenceItemText: Record<PreferenceItemId, string> = {
  T1: 'Clear doctrinal teaching on core theology',
  T2: 'Verse-by-verse expository preaching',
  T3: 'Practical life application of Scripture',
  C1: 'A warm welcome and intentional follow-up',
  C2: 'Deep, close friendships within the church',
  C3: 'Strong small group participation opportunities',
  C4: 'A culture of accountability and spiritual friendship',
  W1: 'Contemporary worship style (modern music, band-led)',
  W2: 'Traditional or liturgical worship (hymns, structured service)',
  W3: 'Emotionally expressive or Spirit-led worship',
  S1: 'A visible emphasis on corporate prayer gatherings',
  S2: 'Active spiritual gifts (prophecy, healing, tongues)',
  M1: 'Clear opportunities to serve within church ministries',
  M2: 'Strong emphasis on evangelism and gospel outreach',
  M3: 'Active community compassion and service',
  L1: 'Transparent communication about church decisions',
  L2: 'Financial transparency and accountability',
  X1: 'Transparent handling of conflict and leadership disagreements',
  X2: 'Comfort with worship or ministry changes over time',
  F1: "Strong children's and youth ministry"
};

const setDesign: PreferenceItemId[][] = [
  ['T1', 'C3', 'S1', 'L1'],
  ['T2', 'C4', 'S2', 'L2'],
  ['T3', 'W1', 'M1', 'X1'],
  ['C1', 'W2', 'M2', 'X2'],
  ['C2', 'W3', 'M3', 'F1'],
  ['T1', 'C4', 'M1', 'X2'],
  ['T2', 'W1', 'M2', 'F1'],
  ['T3', 'W2', 'M3', 'L1'],
  ['C1', 'W3', 'S1', 'L2'],
  ['C2', 'C3', 'S2', 'X1'],
  ['T1', 'W1', 'M3', 'L2'],
  ['T2', 'W2', 'S1', 'X1'],
  ['T3', 'W3', 'S2', 'X2'],
  ['C1', 'C3', 'M1', 'F1'],
  ['C2', 'C4', 'M2', 'L1']
];

export const quizQuestions: QuizQuestion[] = setDesign.map((items, index) => ({
  id: index + 1,
  options: items.map((itemId) => ({ itemId, text: preferenceItemText[itemId] }))
}));
