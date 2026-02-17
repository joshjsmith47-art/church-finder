import { describe, expect, it } from 'vitest';
import { computeQuizResult } from '../lib/scoring';

describe('computeQuizResult', () => {
  it('assigns +1 for MOST and -1 for LEAST', () => {
    const result = computeQuizResult({
      1: { most: 'T1', least: 'C3' },
      2: { most: 'T1', least: 'S2' },
      3: { most: 'C3', least: 'T1' }
    });

    expect(result.itemScores.T1).toBe(1);
    expect(result.itemScores.C3).toBe(0);
    expect(result.itemScores.S2).toBe(-1);
  });

  it('returns ranked, top, and low preference lists', () => {
    const result = computeQuizResult({
      1: { most: 'T1', least: 'S1' },
      2: { most: 'T1', least: 'S2' },
      3: { most: 'C1', least: 'W1' },
      4: { most: 'T2', least: 'W1' }
    });

    expect(result.rankedItems[0].itemId).toBe('T1');
    expect(result.topPreferences).toHaveLength(5);
    expect(result.lowPreferences).toHaveLength(5);
    expect(result.lowPreferences.some((item) => item.itemId === 'W1')).toBe(true);
  });
});
