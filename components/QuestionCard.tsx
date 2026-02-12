import { QuizQuestion, Direction } from '@/lib/types';

export function QuestionCard({
  question,
  selected,
  onSelect
}: {
  question: QuizQuestion;
  selected?: Direction;
  onSelect: (direction: Direction) => void;
}) {
  return (
    <section className="card">
      <h2 style={{ marginTop: 0 }}>
        Q{question.id}. {question.prompt}
      </h2>
      <div className="grid">
        {question.options.map((option) => {
          const active = selected === option.direction;
          return (
            <button
              key={`${question.id}-${option.direction}`}
              className="btn"
              style={{
                textAlign: 'left',
                border: `1px solid ${active ? '#2563eb' : '#d1d5db'}`,
                background: active ? '#eff6ff' : '#fff'
              }}
              onClick={() => onSelect(option.direction)}
              type="button"
            >
              <strong>{option.direction}</strong>
              <div style={{ marginTop: '.3rem', fontWeight: 400 }}>{option.text}</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
