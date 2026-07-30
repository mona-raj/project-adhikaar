import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";
import SectionText from "../../components/ui/SectionText";

const challenges = [
  "Fragmented across many platforms",
  "Difficult to discover during a crisis",
  "Inconsistent in quality and responsiveness",
  "Difficult to trust for first-time users",
  "Not designed around anonymity and user control",
];

export default function Problem() {
  return (
    <Section id="problem">
      <SectionHeading number="02" title="The Problem" />

      <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <SectionText>
            Many vulnerable people—especially queer and transgender individuals—already have
            organizations willing to help.
          </SectionText>

          <SectionText>
            The challenge is finding the right organization at the right time while remaining safe.
            Existing support networks are often difficult to navigate during moments of crisis,
            causing many people to delay asking for help or never receive it.
          </SectionText>
        </div>

        <div
          className="
            border
            border-(--color-border)
            bg-(--color-surface)
            p-8
          "
        >
          <h3
            className="
              mb-6
              font-(--font-ui)
              text-sm
              uppercase
              tracking-[0.25em]
              text-(--color-accent)
            "
          >
            Current Challenges
          </h3>

          <ul className="space-y-5">
            {challenges.map((challenge) => (
              <li
                key={challenge}
                className="
                  flex
                  items-start
                  gap-4
                  text-(--color-text-muted)
                "
              >
                <span
                  className="
                    mt-2
                    h-2
                    w-2
                    rounded-full
                    bg-(--color-accent)
                  "
                />

                <span className="leading-7">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
