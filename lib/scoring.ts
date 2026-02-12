import { DIRECTIONS, Direction, QuizResult } from '@/lib/types';

const cfpByDirection: Record<Direction, string> = {
  Spirit: 'Worship Enthusiast',
  Intellect: 'Intellectual Explorer',
  Community: 'Relational Connector',
  Mission: 'Missional Pioneer'
};

const oppositeDirection: Record<Direction, Direction> = {
  Spirit: 'Mission',
  Mission: 'Spirit',
  Intellect: 'Community',
  Community: 'Intellect'
};

export function questionWeight(questionId: number): number {
  return questionId === 1 || questionId === 25 ? 2 : 1;
}

export function rankDirections(totals: Record<Direction, number>): Direction[] {
  return [...DIRECTIONS].sort((a, b) => {
    if (totals[b] !== totals[a]) {
      return totals[b] - totals[a];
    }
    return DIRECTIONS.indexOf(a) - DIRECTIONS.indexOf(b);
  });
}

export function computeGrowthStretch(
  totals: Record<Direction, number>,
  primaryDirection: Direction
): Direction {
  const nonPrimary = DIRECTIONS.filter((direction) => direction !== primaryDirection);
  const lowestScore = Math.min(...nonPrimary.map((direction) => totals[direction]));
  const lowestDirections = nonPrimary.filter((direction) => totals[direction] === lowestScore);

  if (lowestDirections.length === 1) {
    return lowestDirections[0];
  }

  const opposite = oppositeDirection[primaryDirection];
  if (lowestDirections.includes(opposite)) {
    return opposite;
  }

  return lowestDirections[0];
}

export function computeQuizResult(answers: Record<number, Direction>): QuizResult {
  const totals: Record<Direction, number> = {
    Spirit: 0,
    Intellect: 0,
    Community: 0,
    Mission: 0
  };

  for (const [questionId, direction] of Object.entries(answers)) {
    totals[direction] += questionWeight(Number(questionId));
  }

  const ranked = rankDirections(totals);
  const [primaryDirection, secondaryDirection] = ranked;

  return {
    totals,
    primaryDirection,
    secondaryDirection,
    primaryCFP: cfpByDirection[primaryDirection],
    secondaryCFP: cfpByDirection[secondaryDirection],
    growthStretchDirection: computeGrowthStretch(totals, primaryDirection)
  };
}
