import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="container">
      <section className="card" style={{ padding: '1.5rem' }}>
        <h1 style={{ marginTop: 0 }}>Church Compass — CPQ MaxDiff</h1>
        <p>
          Discover what matters most to you in a church through a 15-set MaxDiff Church Preference Quiz, then review
          your ranked priorities.
        </p>
        <div className="actions">
          <Link href="/quiz" className="btn btn-primary">
            Start CPQ Quiz
          </Link>
          <Link href="/city/san-diego" className="btn btn-secondary">
            Browse San Diego Churches
          </Link>
        </div>
      </section>
    </div>
  );
}
