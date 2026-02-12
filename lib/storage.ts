import { QuizResult } from '@/lib/types';

export const ANSWERS_STORAGE_KEY = 'compass-lite-answers';
export const RESULT_STORAGE_KEY = 'compass-lite-result';

export function readStoredResult(): QuizResult | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = localStorage.getItem(RESULT_STORAGE_KEY);
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as QuizResult;
  } catch {
    return null;
  }
}
