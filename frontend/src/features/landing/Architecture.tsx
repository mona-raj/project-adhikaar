import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";

const decisions = [
  "Documentation-first workflow",
  "Privacy by default",
  "Help Seekers control referrals",
  "Anonymous Help Requests",
  "AI isolated behind abstractions",
  "Persistent recommendation history",
];

export default function Architecture() {
  return (
    <Section id="architecture">
      <SectionHeading number="05" title="Architecture" />

      <p
        className="
          mb-14
          max-w-3xl
          text-lg
          leading-9
          text-(--color-text-muted)
        "
      >
        Project Adhikaar follows a layered architecture that separates business rules from
        infrastructure concerns. The domain model remains independent of the web framework,
        database, and external services.
      </p>

      {/* Layered Architecture */}

      <div
        className="
          overflow-hidden
          rounded-lg
          border
          border-(--color-border)
          bg-(--color-surface)
        "
      >
        <img src="/diagrams/architecture.svg" alt="Layered architecture" className="w-full" />
      </div>

      {/* Domain */}

      <div className="mt-24">
        <h3
          className="
            mb-8
            font-(--font-heading)
            text-3xl
            uppercase
          "
        >
          Domain Model
        </h3>

        <div
          className="
            overflow-hidden
            rounded-lg
            border
            border-(--color-border)
            bg-(--color-surface)
          "
        >
          <img src="/diagrams/er-diagram.svg" alt="Domain model" className="w-full" />
        </div>
      </div>

      {/* Decisions */}

      <div className="mt-24">
        <h3
          className="
            mb-8
            font-(--font-heading)
            text-3xl
            uppercase
          "
        >
          Key Design Decisions
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {decisions.map((decision) => (
            <div
              key={decision}
              className="
                border
                border-(--color-border)
                p-6
              "
            >
              {decision}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
