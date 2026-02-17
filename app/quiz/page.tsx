'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { quizQuestions } from '@/data/quizQuestions';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { QuestionCard } from '@/components/QuestionCard';
import { computeQuizResult } from '@/lib/scoring';
import { ANSWERS_STORAGE_KEY, RESULT_STORAGE_KEY } from '@/lib/storage';
import { PreferenceItemId, SetAnswer } from '@/lib/types';

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, SetAnswer>>({});
  const [aboutYou, setAboutYou] = useState({
    ageRange: '',
    hasChildrenUnder18: '',
    churchStatus: ''
  });

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
    localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify({ answers, aboutYou }));
    localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
    router.push('/results');
  };

  return (
    <div className="container">
      <h1>Church Preference Quiz (CPQ)</h1>
      <p>For each set, choose one MOST important and one LEAST important statement.</p>

      <section className="card" style={{ marginBottom: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>About You (Optional)</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <label>
            Age range
            <select
              value={aboutYou.ageRange}
              onChange={(event) => setAboutYou((prev) => ({ ...prev, ageRange: event.target.value }))}
              style={{ width: '100%', marginTop: '.35rem' }}
            >
              <option value="">Prefer not to say</option>
              <option value="18-29">18-29</option>
              <option value="30-44">30-44</option>
              <option value="45-59">45-59</option>
              <option value="60+">60+</option>
            </select>
          </label>

          <label>
            Children under 18 at home
            <select
              value={aboutYou.hasChildrenUnder18}
              onChange={(event) =>
                setAboutYou((prev) => ({ ...prev, hasChildrenUnder18: event.target.value }))
              }
              style={{ width: '100%', marginTop: '.35rem' }}
            >
              <option value="">Prefer not to say</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          <label>
            Current church status
            <select
              value={aboutYou.churchStatus}
              onChange={(event) => setAboutYou((prev) => ({ ...prev, churchStatus: event.target.value }))}
              style={{ width: '100%', marginTop: '.35rem' }}
            >
              <option value="">Prefer not to say</option>
              <option value="Exploring">Exploring</option>
              <option value="Visiting regularly">Visiting regularly</option>
              <option value="Member">Member</option>
              <option value="Leader">Leader</option>
            </select>
          </label>
        </div>
      </section>

      <ProgressIndicator current={answeredCount} total={quizQuestions.length} />
      <QuestionCard question={question} selected={selected} onSelect={onSelect} />

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
