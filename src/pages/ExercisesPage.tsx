import { useState } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import SectionWrapper from '../components/ui/SectionWrapper';
import Button from '../components/ui/Button';
import { exercises } from '../data/exercises';
import { ExerciseQuestion } from '../types';

const ExercisesPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion: ExerciseQuestion = exercises[currentIndex];

  const submit = () => {
    if (!selected) return;
    if (selected.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase()) {
      setScore((s) => s + 1);
    }
    if (currentIndex === exercises.length - 1) {
      setShowResult(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected('');
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelected('');
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="pt-10">
      <SectionTitle title="Bài tập" subtitle="Trắc nghiệm, điền từ, ghép nghĩa" />
      <SectionWrapper>
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Câu {currentIndex + 1} / {exercises.length}</span>
            <span>Điểm: {score}</span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-slate-900">{currentQuestion.question}</h3>

          {currentQuestion.type === 'multiple' && (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {currentQuestion.options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelected(opt)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    selected === opt ? 'border-primary bg-primary/10' : 'border-slate-200 bg-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'match' && (
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {currentQuestion.options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelected(opt)}
                  className={`rounded-2xl border px-4 py-3 text-center text-sm transition ${
                    selected === opt ? 'border-primary bg-primary/10' : 'border-slate-200 bg-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'fill' && (
            <input
              className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none"
              placeholder="Nhập đáp án"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            />
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {!showResult && (
              <Button onClick={submit}>Trả lời</Button>
            )}
            {showResult && (
              <>
                <div className="rounded-xl bg-primary/10 px-4 py-3 text-primary">
                  Cậu đúng {score}/{exercises.length} câu. {score === exercises.length ? 'Xuất sắc!' : 'Tiếp tục luyện nhé!'}
                </div>
                <Button variant="ghost" className="bg-white text-primary" onClick={restart}>
                  Làm lại
                </Button>
              </>
            )}
          </div>
          {currentQuestion.explanation && !showResult && (
            <p className="mt-3 text-sm text-slate-500">Gợi ý: {currentQuestion.explanation}</p>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default ExercisesPage;
