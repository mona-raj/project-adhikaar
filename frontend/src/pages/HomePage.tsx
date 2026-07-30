import Hero from "../features/landing/Hero";

import Overview from "../features/landing/Overview";
import Problem from "../features/landing/Problem";
import Approach from "../features/landing/Approach";
import Workflow from "../features/landing/Workflow";
import DocumentationLayout from "../layout/DocumentationLayout";
import Footer from "../layout/Footer";
import Quote from "../features/landing/Quote";
import Architecture from "../features/landing/Architecture";
import Documentation from "../features/landing/Resources";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Quote/>

      <DocumentationLayout>
        <Overview />

        <Problem />

        <Approach />

        <Workflow />

        <Architecture />

        <Documentation />
      </DocumentationLayout>

      <Footer />
    </>
  );
}
