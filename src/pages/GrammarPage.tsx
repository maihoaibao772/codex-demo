import { useState } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import SectionWrapper from '../components/ui/SectionWrapper';
import Button from '../components/ui/Button';
import { grammarPoints } from '../data/grammar';
import { ExerciseQuestion } from '../types';

const GrammarPage = () => {
  const [activeId, setActiveId] = useState(grammarPoints[0].id);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  const activePoint = grammarPoints.find((g) => g.id === activeId);

  const checkAnswer = (quiz: ExerciseQuestion) => {
    const answer = quizAnswers[quiz.id];
    if (!answer) return '';
    return answer.trim().toLowerCase() === quiz.answer.trim().toLowerCase() ? 'Đúng rồi 🎉' : 'Sai, thử lại nhé';
  };

  return (
    <div className="pt-10">
      <SectionTitle title="Ngữ pháp" subtitle="Chọn chủ điểm để xem giải thích và làm quiz nhỏ" />
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="rounded-3xl bg-white p-4 shadow-soft">
          <h3 className="text-sm font-semibold text-slate-700">Chủ điểm</h3>
          <div className="mt-3 space-y-2">
            {grammarPoints.map((g) => (
              <button
                key={g.id}
                className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeId === g.id ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-700'
                }`}
                onClick={() => setActiveId(g.id)}
              >
                {g.title}
              </button>
            ))}
          </div>
        </div>

        <SectionWrapper>
          {activePoint && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-6 shadow-soft">
                <div className="text-sm uppercase text-primary">Mẫu câu</div>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">{activePoint.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{activePoint.explanation}</p>
                <div className="mt-3 rounded-xl bg-primary/5 px-4 py-3 text-primary">{activePoint.pattern}</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {activePoint.examples.map((ex, idx) => (
                    <li key={idx}>• {ex}</li>
                  ))}
                </ul>
              </div>

              {activePoint.quiz && (
                <div className="rounded-2xl bg-white p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-slate-900">Mini Quiz</h4>
                    <Button variant="ghost" className="bg-white text-primary" onClick={() => setQuizAnswers({})}>
                      Xóa đáp án
                    </Button>
                  </div>
                  <div className="mt-4 space-y-4">
                    {activePoint.quiz.map((q) => (
                      <div key={q.id} className="rounded-xl border border-slate-100 p-4">
                        <p className="text-sm font-semibold text-slate-800">{q.question}</p>
                        {q.type !== 'fill' && q.options && (
                          <div className="mt-3 grid gap-3 md:grid-cols-2">
                            {q.options.map((opt) => (
                              <button
                                key={opt}
                                className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                                  quizAnswers[q.id] === opt ? 'border-primary bg-primary/10' : 'border-slate-200'
                                }`}
                                onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                        {q.type === 'fill' && (
                          <input
                            className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                            placeholder="Nhập đáp án"
                            value={quizAnswers[q.id] || ''}
                            onChange={(e) => setQuizAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                          />
                        )}
                        <p className="mt-2 text-sm text-primary">{checkAnswer(q)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </SectionWrapper>
      </div>
    </div>
  );
};

export default GrammarPage;
