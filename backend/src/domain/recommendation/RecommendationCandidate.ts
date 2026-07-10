export interface RecommendationCandidate {
  organizationServiceId: string;
  serviceId: string;

  score: number;
  reason: string;
}
