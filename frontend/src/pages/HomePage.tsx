import Hero from "../features/landing/Hero";

import Overview from "../features/landing/Overview";
import Problem from "../features/landing/Problem";
import Approach from "../features/landing/Approach";
import Workflow from "../features/landing/Workflow";
import Engineering from "../features/landing/Engineering";
import Roadmap from "../features/landing/Roadmap";

import DocumentationLayout from "../layout/DocumentationLayout";
import Footer from "../layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />

      <DocumentationLayout>
        <Overview />

        <Problem />

        <Approach />

        <Workflow />

        <Engineering />

        <Roadmap />
      </DocumentationLayout>

      <Footer />
    </>
  );
}
