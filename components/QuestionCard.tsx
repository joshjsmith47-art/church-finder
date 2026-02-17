import { PreferenceItemId, QuizQuestion, SetAnswer } from '@/lib/types';

export function QuestionCard({
  question,
  selected,
  onSelect
}: {
  question: QuizQuestion;
  selected: SetAnswer;
  onSelect: (type: 'most' | 'least', itemId: PreferenceItemId) => void;
}) {
  return (
    <section className="card">
      <h2 style={{ marginTop: 0 }}>Set {question.id}</h2>
      <div className="grid">
        {question.options.map((option) => (
          <div key={`${question.id}-${option.itemId}`} className="card" style={{ padding: '0.75rem' }}>
            <p style={{ marginTop: 0, marginBottom: '.75rem' }}>{option.text}</p>
            <div className="actions">
              <button
                className="btn"
                style={{ background: selected.most === option.itemId ? 'var(--success)' : 'var(--secondary)', borderColor: 'var(--border)' }}
                onClick={() => onSelect('most', option.itemId)}
                type="button"
              >
                Most
              </button>
              <button
                className="btn"
                style={{ background: selected.least === option.itemId ? 'var(--danger)' : 'var(--secondary)', borderColor: 'var(--border)' }}
                onClick={() => onSelect('least', option.itemId)}
                type="button"
              >
                Least
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
