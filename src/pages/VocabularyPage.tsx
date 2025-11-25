import { useMemo, useState } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import SectionWrapper from '../components/ui/SectionWrapper';
import { vocabularies } from '../data/vocabulary';
import { VocabularyItem } from '../types';

const levels = [1, 2, 3, 4, 5, 6];
const topics = Array.from(new Set(vocabularies.map((v) => v.topic)));

const VocabularyPage = () => {
  const [level, setLevel] = useState<number | 'all'>('all');
  const [topic, setTopic] = useState<string | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<VocabularyItem | null>(null);

  const filtered = useMemo(() => {
    return vocabularies.filter((v) => {
      const matchLevel = level === 'all' || v.levelHSK === level;
      const matchTopic = topic === 'all' || v.topic === topic;
      const matchQuery =
        v.hanzi.includes(query) || v.pinyin.toLowerCase().includes(query.toLowerCase()) || v.meaningVi.includes(query);
      return matchLevel && matchTopic && matchQuery;
    });
  }, [level, topic, query]);

  return (
    <div className="pt-10">
      <SectionTitle title="Bảng từ vựng" subtitle="Lọc theo HSK, chủ đề, tìm kiếm và xem ví dụ" />
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
                onClick={() => setLevel(lv)}
              >
                HSK {lv}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Chủ đề:</span>
            <button
              className={`rounded-lg px-3 py-2 text-sm ${topic === 'all' ? 'bg-primary text-white' : 'bg-slate-100'}`}
              onClick={() => setTopic('all')}
            >
              All
            </button>
            {topics.map((tp) => (
              <button
                key={tp}
                className={`rounded-lg px-3 py-2 text-sm ${topic === tp ? 'bg-primary text-white' : 'bg-slate-100'}`}
                onClick={() => setTopic(tp)}
              >
                {tp}
              </button>
            ))}
          </div>
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
            placeholder="Tìm Hán tự, pinyin hoặc nghĩa"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Hán tự</th>
                <th className="px-4 py-3">Pinyin</th>
                <th className="px-4 py-3">Nghĩa</th>
                <th className="px-4 py-3">HSK</th>
                <th className="px-4 py-3">Chủ đề</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-sm">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="cursor-pointer hover:bg-primary/5"
                  onClick={() => setSelected(item)}
                >
                  <td className="px-4 py-3 font-semibold">{item.hanzi}</td>
                  <td className="px-4 py-3 text-slate-600">{item.pinyin}</td>
                  <td className="px-4 py-3 text-slate-600">{item.meaningVi}</td>
                  <td className="px-4 py-3 text-slate-600">HSK {item.levelHSK}</td>
                  <td className="px-4 py-3 text-slate-600 capitalize">{item.topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4" onClick={() => setSelected(null)}>
          <div
            className="max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-2xl font-bold">{selected.hanzi}</div>
                <div className="text-sm text-primary">{selected.pinyin}</div>
                <div className="mt-2 text-sm text-slate-700">{selected.meaningVi}</div>
              </div>
              <button className="text-slate-400 hover:text-primary" onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>
            <div className="mt-4 rounded-xl bg-primary/5 p-4 text-sm text-slate-700">
              <p className="font-semibold text-primary">Ví dụ gợi ý</p>
              <p className="mt-1">{selected.hanzi} 是一个很{selected.meaningVi}的词。</p>
              <p className="text-slate-500">(Ví dụ demo, cậu có thể thay bằng câu thật)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabularyPage;
