'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { DirectionBadge } from '@/components/DirectionBadge';
import { readStoredResult } from '@/lib/storage';

export default function ResultsPage() {
  const result = useMemo(() => readStoredResult(), []);

  if (!result) {
    return (
      <div className="container">
        <div className="card">
          <h1>No saved result yet</h1>
          <p>Take the CFQ Lite quiz first to see your directions and church match recommendations.</p>
          <Link className="btn btn-primary" href="/quiz">
            Start Quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your Compass Lite Results</h1>
      <section className="card">
        <p>
          Primary Direction: <DirectionBadge direction={result.primaryDirection} />
        </p>
        <p>
          Secondary Direction: <DirectionBadge direction={result.secondaryDirection} />
        </p>
        <p>
          Primary CFP: <strong>{result.primaryCFP}</strong>
        </p>
        <p>
          Secondary CFP: <strong>{result.secondaryCFP}</strong>
        </p>
        <p>
          Growth Stretch Recommendation: <DirectionBadge direction={result.growthStretchDirection} />
        </p>
      </section>
      <section className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>Direction Totals</h2>
        <ul>
          {Object.entries(result.totals).map(([direction, score]) => (
            <li key={direction}>
              {direction}: {score}
            </li>
          ))}
        </ul>
      </section>
      <div className="actions" style={{ marginTop: '1rem' }}>
        <Link className="btn btn-secondary" href="/quiz">
          Retake Quiz
        </Link>
        <Link className="btn btn-primary" href="/match">
          View Church Matches
        </Link>
      </div>
    </div>
  );
}
