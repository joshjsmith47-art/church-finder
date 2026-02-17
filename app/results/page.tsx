'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { readStoredResult } from '@/lib/storage';

export default function ResultsPage() {
  const result = useMemo(() => readStoredResult(), []);

  if (!result) {
    return (
      <div className="container">
        <div className="card">
          <h1>No saved result yet</h1>
          <p>Take the CPQ quiz first to see your ranked church preferences.</p>
          <Link className="btn btn-primary" href="/quiz">
            Start Quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your CPQ Results</h1>
      <section className="card">
        <h2 style={{ marginTop: 0 }}>Top Preferences</h2>
        <ul>
          {result.topPreferences.map((item) => (
            <li key={item.itemId}>
              <strong>{item.itemId}</strong>: {item.text} ({item.score > 0 ? '+' : ''}
              {item.score})
            </li>
          ))}
        </ul>
      </section>

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>Lowest Priorities</h2>
        <ul>
          {result.lowPreferences.map((item) => (
            <li key={item.itemId}>
              <strong>{item.itemId}</strong>: {item.text} ({item.score > 0 ? '+' : ''}
              {item.score})
            </li>
          ))}
        </ul>
      </section>

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>All Item Scores</h2>
        <ul>
          {result.rankedItems.map((item) => (
            <li key={item.itemId}>
              <strong>{item.itemId}</strong>: {item.text} ({item.score > 0 ? '+' : ''}
              {item.score})
            </li>
          ))}
        </ul>
      </section>

      <div className="actions" style={{ marginTop: '1rem' }}>
        <Link className="btn btn-secondary" href="/quiz">
          Retake Quiz
        </Link>
      </div>
    </div>
  );
}
