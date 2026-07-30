import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-16 py-16">
      <h2 className="mb-6 text-3xl font-bold text-slate-900">{title}</h2>

      <div className="max-w-3xl space-y-6 leading-8 text-slate-700">{children}</div>
    </section>
  );
}
