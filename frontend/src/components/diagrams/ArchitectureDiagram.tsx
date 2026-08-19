import { Database, Globe, Layers3, Network } from "lucide-react";

import DiagramArrow from "./DiagramArrow";
import DiagramCard from "./DiagramCard";

export default function ArchitectureDiagram() {
  return (
    <div className="my-16 flex flex-col items-center">
      <DiagramCard icon={Globe} title="API Layer" badge="Presentation" className="w-full max-w-xl">
        <ul className="space-y-2 text-left">
          <li>• HTTP Routes</li>
          <li>• Controllers</li>
          <li>• Request Validation</li>
        </ul>
      </DiagramCard>

      <DiagramArrow direction="vertical" />

      <DiagramCard
        icon={Network}
        title="Application Layer"
        badge="Use Cases"
        className="w-full max-w-xl"
      >
        <ul className="space-y-2 text-left">
          <li>• Create Help Requests</li>
          <li>• Generate Recommendations</li>
          <li>• Coordinate Workflows</li>
        </ul>
      </DiagramCard>

      <DiagramArrow direction="vertical" />

      <DiagramCard icon={Layers3} title="Domain Layer" badge="Core" className="w-full max-w-xl">
        <ul className="space-y-2 text-left">
          <li>• Entities</li>
          <li>• Business Rules</li>
          <li>• Domain Relationships</li>
        </ul>
      </DiagramCard>

      <DiagramArrow direction="vertical" />

      <DiagramCard
        icon={Database}
        title="Infrastructure Layer"
        badge="Persistence"
        className="w-full max-w-xl"
      >
        <ul className="space-y-2 text-left">
          <li>• Prisma ORM</li>
          <li>• Database</li>
          <li>• External Integrations</li>
        </ul>
      </DiagramCard>
    </div>
  );
}
