import { ChurchCard } from '@/components/ChurchCard';
import { sanDiegoChurches } from '@/data/churches';

export default function SanDiegoCityPage() {
  return (
    <div className="container">
      <h1>San Diego, CA Churches</h1>
      <p>Seed churches for Compass Lite MVP.</p>
      <div className="grid">
        {sanDiegoChurches.map((church) => (
          <ChurchCard key={church.id} church={church} />
        ))}
      </div>
    </div>
  );
}
