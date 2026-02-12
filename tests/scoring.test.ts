import { describe, expect, it } from 'vitest';
import { computeGrowthStretch, computeQuizResult, questionWeight, rankDirections } from '@/lib/scoring';
import { Direction } from '@/lib/types';

describe('questionWeight', () => {
  it('weights Q1 and Q25 at 2', () => {
    expect(questionWeight(1)).toBe(2);
    expect(questionWeight(25)).toBe(2);
    expect(questionWeight(5)).toBe(1);
  });
});

describe('rankDirections', () => {
  it('orders by score descending', () => {
    const ranking = rankDirections({ Spirit: 4, Intellect: 7, Community: 2, Mission: 7 });
    expect(ranking).toEqual(['Intellect', 'Mission', 'Spirit', 'Community']);
  });
});

describe('computeGrowthStretch', () => {
  it('returns lowest scoring non-primary direction', () => {
    const totals = { Spirit: 8, Intellect: 2, Community: 5, Mission: 4 };
    expect(computeGrowthStretch(totals, 'Spirit')).toBe('Intellect');
  });

  it('breaks ties by opposite direction when tied for lowest', () => {
    const totals = { Spirit: 9, Intellect: 2, Community: 4, Mission: 2 };
    expect(computeGrowthStretch(totals, 'Spirit')).toBe('Mission' as Direction);
  });
});

describe('computeQuizResult', () => {
  it('computes primary/secondary and CFP mapping', () => {
    const answers: Record<number, Direction> = {
      1: 'Spirit',
      2: 'Spirit',
      3: 'Intellect',
      4: 'Community',
      5: 'Mission',
      25: 'Spirit'
    };

    const result = computeQuizResult(answers);

    expect(result.primaryDirection).toBe('Spirit');
    expect(result.secondaryDirection).toBe('Intellect');
    expect(result.primaryCFP).toBe('Worship Enthusiast');
    expect(result.secondaryCFP).toBe('Intellectual Explorer');
    expect(result.totals.Spirit).toBe(5);
  });
});
