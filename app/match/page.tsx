'use client';

import Link from 'next/link';

export default function MatchPage() {
  return (
    <div className="container">
      <div className="card">
        <h1>Church Matches Coming Soon</h1>
        <p>
          The new Church Preference Quiz now returns ranked ministry preferences. Automated church matching will be
          updated to use this new scoring model in a future release.
        </p>
        <div className="actions">
          <Link href="/quiz" className="btn btn-primary">
            Take Quiz
          </Link>
          <Link href="/city/san-diego" className="btn btn-secondary">
            Browse San Diego Churches
          </Link>
        </div>
      </div>
    </div>
  );
}
