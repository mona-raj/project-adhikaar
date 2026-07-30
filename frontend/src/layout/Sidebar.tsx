const sections = [
  {
    id: "overview",
    title: "Overview",
  },
  {
    id: "problem",
    title: "The Problem",
  },
  {
    id: "approach",
    title: "Our Approach",
  },
  {
    id: "workflow",
    title: "How It Works",
  },
  {
    id: "engineering",
    title: "Engineering",
  },
  {
    id: "roadmap",
    title: "Roadmap",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-10">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-slate-500">
          Contents
        </h3>

        <nav>
          <ul className="space-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-slate-600 transition-colors hover:text-[#0E8734]"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
