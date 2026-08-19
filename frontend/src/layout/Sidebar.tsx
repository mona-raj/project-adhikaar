import { useActiveSection } from "../hooks/useActiveSection";

const sections = [
  { id: "overview", number: "01", title: "Overview" },
  { id: "problem", number: "02", title: "The Problem" },
  { id: "approach", number: "03", title: "Our Approach" },
  { id: "workflow", number: "04", title: "How It Works" },
  { id: "architecture", number: "05", title: "Architecture" },
  { id: "resources", number: "06", title: "Resources" },
];

export default function Sidebar() {
  const activeSection = useActiveSection(sections.map((s) => s.id));

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-10">
        <h3
          className="
            mb-6
            font-(--font-ui)
            text-sm
            uppercase
            tracking-[0.18em]
            text-(--color-text-muted)
          "
        >
          Contents
        </h3>

        <nav>
          <ul className="space-y-2">
            {sections.map((section) => {
              const active = section.id === activeSection;

              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`
                      group
                      flex
                      items-center
                      gap-4
                      border-l-2
                      py-2
                      pl-4
                      transition-all
                      duration-200

                      ${active ? "border-(--color-accent)" : "border-transparent hover:border-(--color-accent)"}
                    `}
                  >
                    <span
                      className={`
                        w-7
                        font-(--font-ui)
                        text-xs
                        tracking-[0.2em]
                        transition-colors

                        ${
                          active
                            ? "text-(--color-accent)"
                            : "text-(--color-text-muted) group-hover:text-(--color-accent)"
                        }
                      `}
                    >
                      {section.number}
                    </span>

                    <span
                      className={`
                        font-(--font-body)
                        text-sm
                        transition-colors

                        ${
                          active
                            ? "font-medium text-(--color-accent)"
                            : "text-(--color-text-muted) group-hover:text-(--color-text)"
                        }
                      `}
                    >
                      {section.title}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
