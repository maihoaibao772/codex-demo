import { ReactNode } from 'react';

const SectionTitle = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) => (
  <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div>
      <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export default SectionTitle;
