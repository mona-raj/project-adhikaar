import { RecommendationCandidate } from "./RecommendationCandidate";
import { RecommendationInput } from "./RecommendationInput";

export class RecommendationEngine {
  generate(inputs: RecommendationInput[]): RecommendationCandidate[] {
    return inputs.map((input) => ({
      organizationServiceId: input.organizationServiceId,
      serviceId: input.serviceId,
      score: 1,
      reason: "Service available",
    }));
  }
}
