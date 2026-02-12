'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { quizQuestions } from '@/data/quizQuestions';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { QuestionCard } from '@/components/QuestionCard';
import { computeQuizResult } from '@/lib/scoring';
import { ANSWERS_STORAGE_KEY, RESULT_STORAGE_KEY } from '@/lib/storage';
import { Direction } from '@/lib/types';

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Direction>>({});

  const question = quizQuestions[currentIndex];
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const onSelect = (direction: Direction) => {
    setAnswers((prev) => ({ ...prev, [question.id]: direction }));
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
      <h1>CFQ Lite Quiz</h1>
      <ProgressIndicator current={answeredCount} total={quizQuestions.length} />
      <QuestionCard question={question} selected={answers[question.id]} onSelect={onSelect} />
      <div className="actions" style={{ marginTop: '1rem' }}>
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentIndex((value) => Math.max(0, value - 1))}
          disabled={currentIndex === 0}
          type="button"
        >
          Back
        </button>
        <button className="btn btn-primary" onClick={next} type="button" disabled={!answers[question.id]}>
          {currentIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}
