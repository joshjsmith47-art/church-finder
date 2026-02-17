import { preferenceItemText } from '@/data/quizQuestions';
import { PREFERENCE_ITEM_IDS, PreferenceItemId, QuizResult, SetAnswer } from '@/lib/types';

export function computeQuizResult(answers: Record<number, SetAnswer>): QuizResult {
  const itemScores = PREFERENCE_ITEM_IDS.reduce(
    (acc, itemId) => ({ ...acc, [itemId]: 0 }),
    {} as Record<PreferenceItemId, number>
  );

  Object.values(answers).forEach((answer) => {
    if (answer.most) {
      itemScores[answer.most] += 1;
    }
    if (answer.least) {
      itemScores[answer.least] -= 1;
    }
  });

  const rankedItems = [...PREFERENCE_ITEM_IDS]
    .map((itemId) => ({ itemId, text: preferenceItemText[itemId], score: itemScores[itemId] }))
    .sort((a, b) => b.score - a.score || a.itemId.localeCompare(b.itemId));

  return {
    itemScores,
    rankedItems,
    topPreferences: rankedItems.slice(0, 5),
    lowPreferences: [...rankedItems].reverse().slice(0, 5)
  };
}
