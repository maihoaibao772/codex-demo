import { useMemo, useState } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import SectionWrapper from '../components/ui/SectionWrapper';
import Button from '../components/ui/Button';
import { flashcards } from '../data/flashcards';

const levels = [1, 2, 3, 4, 5, 6];
const topics = Array.from(new Set(flashcards.map((f) => f.topic)));

const FlashcardsPage = () => {
  const [level, setLevel] = useState<number | 'all'>('all');
  const [topic, setTopic] = useState<string | 'all'>('all');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [remembered, setRemembered] = useState<{ [id: number]: boolean }>({});

  const filtered = useMemo(() => {
    return flashcards.filter((f) => {
      const matchLevel = level === 'all' || f.levelHSK === level;
      const matchTopic = topic === 'all' || f.topic === topic;
      return matchLevel && matchTopic;
    });
  }, [level, topic]);

  const current = filtered[index] || filtered[0];

  const handleRemember = (value: boolean) => {
    if (!current || filtered.length === 0) return;
    setRemembered((prev) => ({ ...prev, [current.id]: value }));
    setFlipped(false);
    setIndex((prev) => ((prev + 1) % filtered.length || 0));
  };

  return (
    <div className="pt-10">
      <SectionTitle title="Flashcard" subtitle="Lật thẻ, đánh dấu đã nhớ/chưa nhớ" />
      <SectionWrapper>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">HSK:</span>
            <button
              className={`rounded-lg px-3 py-2 text-sm ${level === 'all' ? 'bg-primary text-white' : 'bg-slate-100'}`}
              onClick={() => setLevel('all')}
            >
              All
            </button>
            {levels.map((lv) => (
              <button
                key={lv}
                className={`rounded-lg px-3 py-2 text-sm ${level === lv ? 'bg-primary text-white' : 'bg-slate-100'}`}
                onClick={() => {
                  setLevel(lv);
                  setIndex(0);
                }}
              >
                HSK {lv}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Chủ đề:</span>
            <button
              className={`rounded-lg px-3 py-2 text-sm ${topic === 'all' ? 'bg-primary text-white' : 'bg-slate-100'}`}
              onClick={() => {
                setTopic('all');
                setIndex(0);
              }}
            >
              All
            </button>
            {topics.map((tp) => (
              <button
                key={tp}
                className={`rounded-lg px-3 py-2 text-sm ${topic === tp ? 'bg-primary text-white' : 'bg-slate-100'}`}
                onClick={() => {
                  setTopic(tp);
                  setIndex(0);
                }}
              >
                {tp}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div
            className="relative h-72 cursor-pointer overflow-hidden rounded-3xl border border-slate-100 bg-white text-center shadow-soft"
            onClick={() => setFlipped((p) => !p)}
          >
            <div className={`absolute inset-0 grid place-items-center p-6 transition-opacity duration-300 ${flipped ? 'opacity-0' : 'opacity-100'}`}>
              <div className="space-y-3">
                <div className="text-sm uppercase tracking-wide text-primary">{current ? `HSK ${current.levelHSK}` : ''}</div>
                <div className="text-3xl font-bold">{current?.front || 'Hết thẻ rồi'}</div>
                {!flipped && <p className="text-slate-500">Nhấn để lật mặt sau</p>}
              </div>
            </div>
            <div
              className={`absolute inset-0 grid place-items-center bg-primary/90 p-6 text-center text-white transition-opacity duration-300 ${
                flipped ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="space-y-2">
                <div className="text-sm uppercase tracking-wide">Nghĩa & ví dụ</div>
                <div className="text-2xl font-semibold">{current?.back}</div>
                <p className="text-sm text-white/80">{current?.example}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl bg-slate-900 p-6 text-white shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase text-white/70">Tiến độ</div>
                <div className="text-2xl font-bold">{Object.keys(remembered).length}/{flashcards.length} thẻ</div>
              </div>
              <span className="text-3xl">🐼</span>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setFlipped((p) => !p)} variant="ghost" className="bg-white text-primary">
                Lật thẻ
              </Button>
              <Button onClick={() => handleRemember(true)}>ĐÃ NHỚ</Button>
              <Button variant="ghost" className="bg-white text-primary" onClick={() => handleRemember(false)}>
                CHƯA NHỚ
              </Button>
            </div>
            <div className="text-sm text-white/80">
              {current
                ? `Chủ đề: ${current.topic}. Đã nhớ: ${remembered[current.id] ? 'Yes' : 'No'}`
                : 'Hết thẻ, đổi bộ khác nhé!'}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default FlashcardsPage;
