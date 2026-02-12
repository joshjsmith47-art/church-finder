import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Church Compass Lite',
  description: 'Find your church direction with a lightweight quiz.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ borderBottom: '1px solid #e5e7eb', background: '#fff' }}>
          <nav className="container" style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
            <Link href="/">Church Compass</Link>
            <Link href="/quiz">Quiz</Link>
            <Link href="/results">Results</Link>
            <Link href="/city/san-diego">San Diego Churches</Link>
            <Link href="/match">Matches</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
