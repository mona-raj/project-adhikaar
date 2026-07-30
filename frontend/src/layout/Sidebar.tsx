const sections = [
  {
    id: "overview",
    number: "01",
    title: "Overview",
  },
  {
    id: "problem",
    number: "02",
    title: "The Problem",
  },
  {
    id: "approach",
    number: "03",
    title: "Our Approach",
  },
  {
    id: "workflow",
    number: "04",
    title: "How It Works",
  },
  {
    id: "architecture",
    number: "05",
    title: "Architecture",
  },
  {
    id: "resources",
    number: "06",
    title: "Resources",
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
        hidden
        w-64
        shrink-0
        xl:block
      "
    >
      <div
        className="
          sticky
          top-12
        "
      >
        <p
          className="
            mb-8
            font-(--font-ui)
            text-xs
            uppercase
            tracking-[0.35em]
            text-(--color-accent)
          "
        >
          Contents
        </p>

        <nav>
          <ol className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    border-l-2
                    border-transparent
                    py-2
                    pl-4
                    transition-all
                    duration-200
                    hover:border-(--color-accent)
                    hover:text-(--color-text)
                  "
                >
                  <span
                    className="
                      w-7
                      font-(--font-ui)
                      text-xs
                      tracking-[0.2em]
                      text-(--color-text-muted)
                      transition-colors
                      group-hover:text-(--color-accent)
                    "
                  >
                    {section.number}
                  </span>

                  <span
                    className="
                      font-(--font-body)
                      text-sm
                      text-(--color-text-muted)
                      transition-colors
                      group-hover:text-(--color-text)
                    "
                  >
                    {section.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
