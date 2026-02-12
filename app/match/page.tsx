'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { ChurchCard } from '@/components/ChurchCard';
import { sanDiegoChurches } from '@/data/churches';
import { readStoredResult } from '@/lib/storage';

export default function MatchPage() {
  const result = useMemo(() => readStoredResult(), []);

  if (!result) {
    return (
      <div className="container">
        <div className="card">
          <h1>No quiz results found</h1>
          <p>Take the quiz first so we can rank churches by alignment.</p>
          <Link href="/quiz" className="btn btn-primary">
            Start Quiz
          </Link>
        </div>
      </div>
    );
  }

  const ranked = [...sanDiegoChurches]
    .map((church) => {
      let score = 0;
      if (church.primaryDirection === result.primaryDirection) score += 2;
      if (church.primaryDirection === result.secondaryDirection) score += 1;
      return { church, score };
    })
    .sort((a, b) => b.score - a.score || a.church.name.localeCompare(b.church.name));

  return (
    <div className="container">
      <h1>Church Matches</h1>
      <p>
        Ranked by alignment with your Primary (<strong>{result.primaryDirection}</strong>) and Secondary (
        <strong>{result.secondaryDirection}</strong>) directions.
      </p>
      <div className="grid">
        {ranked.map(({ church, score }) => (
          <ChurchCard
            key={church.id}
            church={church}
            matchScore={score}
            matchDirection={{ primary: result.primaryDirection, secondary: result.secondaryDirection }}
          />
        ))}
      </div>
    </div>
  );
}
