import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";
import PrincipleCard from "../../components/ui/PrincipleCard";

const principles = [
  {
    title: "Safety First",
    description:
      "When safety conflicts with convenience, the platform always prioritizes the safety of the Help Seeker.",
  },
  {
    title: "Privacy by Default",
    description:
      "Only the minimum information required to receive assistance should ever be shared.",
  },
  {
    title: "User Agency",
    description:
      "Project Adhikaar facilitates connections but never removes decision-making from the Help Seeker.",
  },
  {
    title: "Trust Through Transparency",
    description:
      "Trust is earned through openness, reliability, and accurate information—not through marketing.",
  },
  {
    title: "Human-Centred",
    description:
      "Technology supports people. Human judgment is preferred whenever it provides better outcomes.",
  },
  {
    title: "Accessible by Design",
    description:
      "The platform should remain usable regardless of language, device quality, technical literacy, or financial situation.",
  },
];

export default function Approach() {
  return (
    <Section id="approach">
      <SectionHeading number="03" title="Our Approach" />

      <p
        className="
          mb-14
          max-w-3xl
          text-lg
          leading-9
          text-(--color-text-muted)
        "
      >
        Every product and engineering decision in Project Adhikaar is guided by a small set of
        principles. These principles ensure the platform remains focused on helping people safely
        access trusted support while respecting their privacy and autonomy.
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {principles.map((principle) => (
          <PrincipleCard
            key={principle.title}
            title={principle.title}
            description={principle.description}
          />
        ))}
      </div>
    </Section>
  );
}
