import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";
// import WorkflowDiagram from "../../components/diagrams/WorkflowDiagram";

const steps = [
  {
    title: "Help Request",
    description:
      "The Help Seeker submits a request describing their situation and the kind of support they require.",
  },
  {
    title: "Safety Evaluation",
    description:
      "The platform evaluates the request to understand urgency and identify potential safety concerns.",
  },
  {
    title: "Service Identification",
    description:
      "Relevant support services are identified and confirmed before recommendations are generated.",
  },
  {
    title: "Recommendations",
    description:
      "Suitable organizations are recommended based on the confirmed service requirements.",
  },
  {
    title: "User Approval",
    description:
      "The Help Seeker decides which organizations, if any, should receive their information.",
  },
  {
    title: "Referral",
    description:
      "Only after explicit approval is a referral created and shared with the selected organization.",
  },
];

export default function HowItWorks() {
  return (
    <Section id="workflow">
      <SectionHeading number="04" title="How It Works" />

      <p
        className="
          mb-14
          max-w-3xl
          text-lg
          leading-9
          text-(--color-text-muted)
        "
      >
        Project Adhikaar is designed to support people throughout their journey while ensuring they
        remain in control of every important decision.
      </p>

      {/* Workflow Diagram

      <div
        className="
          overflow-hidden
          rounded-lg
          border
          border-(--color-border)
          bg-(--color-surface)
        "
      >
        <WorkflowDiagram />
      </div> */}

      {/* Steps */}

      <div className="mt-20 grid gap-8 lg:grid-cols-2">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="
              border-l-4
              border-(--color-accent)
              pl-6
            "
          >
            <p
              className="
                mb-2
                font-(--font-ui)
                text-xs
                uppercase
                tracking-[0.3em]
                text-(--color-accent)
              "
            >
              Step {index + 1}
            </p>

            <h3
              className="
                mb-3
                font-(--font-heading)
                text-2xl
                uppercase
              "
            >
              {step.title}
            </h3>

            <p
              className="
                leading-8
                text-(--color-text-muted)
              "
            >
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
