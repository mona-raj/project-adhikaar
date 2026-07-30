import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";
import SectionText from "../../components/ui/SectionText";

export default function Overview() {
  return (
    <Section id="overview">
      <SectionHeading number="01" title="Overview" />

      <SectionText>
        Project Adhikaar is an open-source platform that helps vulnerable individuals safely
        discover, access, and coordinate trustworthy support while preserving their privacy and
        agency.
      </SectionText>

      <blockquote
        className="
          mt-16
          border-l-4
          border-(--color-accent)
          pl-6
          font-(--font-heading)
          text-3xl
          leading-tight
          italic
        "
      >
        Everyone has the right to live freely, safely, and with dignity.
      </blockquote>
    </Section>
  );
}
