import {
  FileText,
  ShieldCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle,
  HandHeart,
} from "lucide-react";

import DiagramArrow from "./DiagramArrow";
import DiagramCard from "./DiagramCard";

export default function WorkflowDiagram() {
  return (
    <div
      className="
        my-12
        flex
        flex-col
        items-center
        justify-center
        gap-6
        lg:flex-row
      "
    >
      <DiagramCard icon={FileText} title="Help Request">
        Describe your situation and request support.
      </DiagramCard>

      <DiagramArrow />

      <DiagramCard icon={ShieldCheck} title="Safety Review">
        The platform evaluates urgency and potential risks."
      </DiagramCard>

      <DiagramArrow />

      <DiagramCard icon={BriefcaseBusiness} title="Services">
        Required services are identified from the request.
      </DiagramCard>

      <DiagramArrow />

      <DiagramCard icon={Building2} title="Organizations">
        Suitable organizations are recommended.
      </DiagramCard>

      <DiagramArrow />

      <DiagramCard icon={CheckCircle} title="Approval">
        The Help Seeker decides which referrals to approve.
      </DiagramCard>

      <DiagramArrow />

      <DiagramCard icon={HandHeart} title="Support">
        Organizations coordinate assistance.
      </DiagramCard>
    </div>
  );
}
