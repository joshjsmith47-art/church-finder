import { Church, Direction } from '@/lib/types';
import { DirectionBadge } from '@/components/DirectionBadge';

export function ChurchCard({
  church,
  matchDirection,
  matchScore
}: {
  church: Church;
  matchDirection?: { primary?: Direction; secondary?: Direction };
  matchScore?: number;
}) {
  return (
    <article className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ margin: '0 0 0.25rem' }}>{church.name}</h3>
          <p style={{ margin: 0, color: '#6b7280' }}>{church.neighborhood}, San Diego</p>
        </div>
        <DirectionBadge direction={church.primaryDirection} />
      </div>
      <p style={{ margin: '.8rem 0' }}>
        <a href={church.website} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>
          Visit website
        </a>
      </p>
      <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
        {church.tags.map((tag) => (
          <span key={tag} className="badge" style={{ background: '#f3f4f6' }}>
            {tag}
          </span>
        ))}
      </div>
      {matchDirection && (
        <p style={{ margin: '.8rem 0 0', fontSize: '.9rem', color: '#374151' }}>
          Match score: <strong>{matchScore ?? 0}</strong>
          {matchDirection.primary && church.primaryDirection === matchDirection.primary
            ? ' (Primary alignment)'
            : ''}
          {matchDirection.secondary && church.primaryDirection === matchDirection.secondary
            ? ' (Secondary alignment)'
            : ''}
        </p>
      )}
    </article>
  );
}
