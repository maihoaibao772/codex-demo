import { ReactNode } from 'react';

const SectionWrapper = ({ children, id }: { children: ReactNode; id?: string }) => (
  <section id={id} className="section-gradient mt-14 rounded-3xl bg-white p-6 shadow-soft md:p-10">
    {children}
  </section>
);

export default SectionWrapper;
