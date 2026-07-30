import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";
import ResourcesLink from "../../components/ui/ResourcesLink";

const docs = [
  {
    title: "Product",
    description: "Vision, users, MVP scope, product principles and future direction.",
    href: "https://github.com/mona-raj/project-adhikaar/blob/main/docs/1_Product.md",
  },
  {
    title: "Domain",
    description: "Core domain concepts, relationships and business terminology.",
    href: "https://github.com/mona-raj/project-adhikaar/blob/main/docs/2_Domain.md",
  },
  {
    title: "Architecture",
    description: "Layered architecture, responsibilities and persistence strategy.",
    href: "https://github.com/mona-raj/project-adhikaar/blob/main/docs/3_Architecture.md",
  },
  {
    title: "Design Decisions",
    description: "Important architectural and product decisions recorded throughout development.",
    href: "https://github.com/mona-raj/project-adhikaar/blob/main/docs/Decisions.md",
  },
  {
    title: "OpenAPI Specification",
    description: "Complete REST API specification generated from the backend.",
    href: "https://github.com/mona-raj/project-adhikaar/blob/main/docs/openapi.json",
  },
  {
    title: "ER Diagram",
    description: "Database schema generated directly from the Prisma data model.",
    href: "https://github.com/mona-raj/project-adhikaar/blob/main/docs/er-diagram.svg",
  },
];

export default function Resources() {
  return (
    <Section id="resources">
      <SectionHeading number="06" title="Resources" />

      <p
        className="
          mb-14
          max-w-3xl
          text-lg
          leading-9
          text-(--color-text-muted)
        "
      >
        Project Adhikaar follows a documentation-first workflow. Product decisions, architecture,
        domain concepts and API specifications are maintained alongside the source code to ensure
        the implementation remains transparent and easy to understand.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {docs.map((resource) => (
          <ResourcesLink key={resource.title} {...resource} />
        ))}
      </div>
    </Section>
  );
}
