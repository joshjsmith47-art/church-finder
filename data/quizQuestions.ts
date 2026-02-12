import { QuizQuestion } from '@/lib/types';

const directionOptionText = {
  Spirit: 'I feel most connected through worship, prayer, and spiritual practices.',
  Intellect: 'I grow most through teaching, study, and asking deeper questions.',
  Community: 'I thrive when I can build close relationships and do life with others.',
  Mission: 'I come alive when serving, sharing hope, and taking faith into the city.'
} as const;

const prompts = [
  'On a typical Sunday, what helps you feel most engaged?',
  'What kind of church activity recharges you most?',
  'When facing a hard season, what support do you seek first?',
  'What would make you eager to join a new church?',
  'How do you prefer to grow in your faith?',
  'What usually motivates you to show up consistently?',
  'In worship gatherings, what do you value most?',
  'Which ministry setting sounds most natural to you?',
  'How do you tend to process spiritual questions?',
  'What makes a sermon especially meaningful to you?',
  'How do you connect with God outside church?',
  'What role do you naturally play in groups?',
  'Which church announcement would excite you most?',
  'How do you like to welcome newcomers?',
  'What is your preferred way to serve?',
  'When choosing a church, what signal matters most?',
  'What kind of discipleship plan fits you best?',
  'What church culture helps you stay committed?',
  'How do you respond when you see a need in the city?',
  'What conversation topic energizes you most after service?',
  'How would friends describe your spiritual strengths?',
  'What kind of growth goal sounds most compelling right now?',
  'Which weekend experience feels like a great fit?',
  'If you had one hour to volunteer, what would you choose?',
  'What outcome do you hope for from your next church season?'
];

export const quizQuestions: QuizQuestion[] = prompts.map((prompt, index) => ({
  id: index + 1,
  prompt,
  options: [
    { direction: 'Spirit', text: directionOptionText.Spirit },
    { direction: 'Intellect', text: directionOptionText.Intellect },
    { direction: 'Community', text: directionOptionText.Community },
    { direction: 'Mission', text: directionOptionText.Mission }
  ]
}));
