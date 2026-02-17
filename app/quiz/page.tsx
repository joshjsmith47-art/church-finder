'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { quizQuestions } from '@/data/quizQuestions';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { computeQuizResult } from '@/lib/scoring';
import { ANSWERS_STORAGE_KEY, RESULT_STORAGE_KEY } from '@/lib/storage';
import { PreferenceItemId, SetAnswer } from '@/lib/types';

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, SetAnswer>>({});

  const question = quizQuestions[currentIndex];
  const selected = answers[question.id] || {};
  const answeredCount = useMemo(
    () => Object.values(answers).filter((value) => value.most && value.least).length,
    [answers]
  );

  const onSelect = (type: 'most' | 'least', itemId: PreferenceItemId) => {
    setAnswers((prev) => {
      const prior = prev[question.id] || {};
      const next: SetAnswer = { ...prior, [type]: itemId };
      if (type === 'most' && next.least === itemId) {
        next.least = undefined;
      }
      if (type === 'least' && next.most === itemId) {
        next.most = undefined;
      }
      return { ...prev, [question.id]: next };
    });
  };

  const next = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((value) => value + 1);
      return;
    }

    const result = computeQuizResult(answers);
    localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(answers));
    localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
    router.push('/results');
  };

  return (
    <div className="container">
      <h1>Church Preference Quiz (CPQ)</h1>
      <p>For each set, choose one MOST important and one LEAST important statement.</p>
      <ProgressIndicator current={answeredCount} total={quizQuestions.length} />

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Set {question.id}</h2>
        <div className="grid">
          {question.options.map((option) => {
            const isMost = selected.most === option.itemId;
            const isLeast = selected.least === option.itemId;

            return (
              <div key={`${question.id}-${option.itemId}`} className="card" style={{ padding: '0.75rem' }}>
                <p style={{ marginTop: 0, marginBottom: '.75rem' }}>{option.text}</p>
                <div className="actions">
                  <button
                    className="btn"
                    style={{ background: isMost ? '#dcfce7' : '#e5e7eb' }}
                    onClick={() => onSelect('most', option.itemId)}
                    type="button"
                  >
                    Most
                  </button>
                  <button
                    className="btn"
                    style={{ background: isLeast ? '#fee2e2' : '#e5e7eb' }}
                    onClick={() => onSelect('least', option.itemId)}
                    type="button"
                  >
                    Least
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="actions" style={{ marginTop: '1rem' }}>
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentIndex((value) => Math.max(0, value - 1))}
          disabled={currentIndex === 0}
          type="button"
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={next}
          type="button"
          disabled={!selected.most || !selected.least}
        >
          {currentIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}
