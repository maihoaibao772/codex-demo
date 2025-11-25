import SectionTitle from '../components/ui/SectionTitle';
import SectionWrapper from '../components/ui/SectionWrapper';
import { roadmap } from '../data/roadmap';

const RoadmapPage = () => {
  return (
    <div className="pt-10">
      <SectionTitle title="Lộ trình HSK 0 → 6" subtitle="Mục tiêu, trọng tâm và tài nguyên đề xuất" />
      <SectionWrapper>
        <div className="space-y-4">
          {roadmap.map((step, idx) => (
            <div key={step.level} className="relative rounded-3xl bg-white p-6 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm uppercase text-primary">Bước {idx + 1}</div>
                  <h3 className="text-2xl font-bold text-slate-900">{step.level}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                  <div className="mt-3 text-sm text-slate-700">
                    <p className="font-semibold text-primary">Trọng tâm</p>
                    <ul className="ml-4 list-disc space-y-1">
                      {step.focus.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3 text-sm text-slate-700">
                    <p className="font-semibold text-primary">Tài nguyên gợi ý</p>
                    <ul className="ml-4 list-disc space-y-1">
                      {step.resources.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <span className="text-3xl">🏞️</span>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default RoadmapPage;
