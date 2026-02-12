export function ProgressIndicator({
  current,
  total
}: {
  current: number;
  total: number;
}) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
        <strong>Progress</strong>
        <span>
          {current} / {total}
        </span>
      </div>
      <div style={{ background: '#e5e7eb', borderRadius: 999, height: 10 }}>
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: '#2563eb',
            borderRadius: 999,
            transition: 'width 150ms ease'
          }}
        />
      </div>
    </div>
  );
}
