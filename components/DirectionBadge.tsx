import { Direction } from '@/lib/types';

const palette: Record<Direction, string> = {
  Spirit: '#ede9fe',
  Intellect: '#dbeafe',
  Community: '#dcfce7',
  Mission: '#fee2e2'
};

export function DirectionBadge({ direction }: { direction: Direction }) {
  return (
    <span className="badge" style={{ background: palette[direction] }}>
      {direction}
    </span>
  );
}
