import { ReferralSharedData } from "./ReferralSharedData";

import { CreateReferralInput } from "../../validation/createReferral.schema";

import { RecommendationRepository } from "../../repositories/RecommendationRepository";

type RecommendationAggregate = Awaited<
  ReturnType<RecommendationRepository["findByIdWithRelations"]>
>;

export class ReferralSharedDataBuilder {
  static build(
    recommendation: NonNullable<RecommendationAggregate>,
    input: CreateReferralInput,
  ): ReferralSharedData {
    return {
      contact: {
        name: input.contactName,
        email: input.email ?? null,
        phone: input.phone ?? null,
      },

      helpRequest: {
        description: recommendation.case.helpRequest.description,
      },

      preferredLanguage: recommendation.case.helpRequest.preferredLanguage
        ? {
            code: recommendation.case.helpRequest.preferredLanguage.code,
            name: recommendation.case.helpRequest.preferredLanguage.name,
          }
        : null,

      service: {
        code: recommendation.service.code,
        name: recommendation.service.name,
      },
    };
  }
}
