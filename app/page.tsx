import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="container">
      <section className="card" style={{ padding: '1.5rem' }}>
        <h1 style={{ marginTop: 0 }}>Church Compass — Compass Lite</h1>
        <p>
          Discover your church fit through a simple 25-question Direction quiz, then view matching churches in
          San Diego.
        </p>
        <div className="actions">
          <Link href="/quiz" className="btn btn-primary">
            Start CFQ Lite Quiz
          </Link>
          <Link href="/city/san-diego" className="btn btn-secondary">
            Browse San Diego Churches
          </Link>
        </div>
      </section>
    </div>
  );
}
