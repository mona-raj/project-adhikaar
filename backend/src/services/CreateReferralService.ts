import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";

import { PrismaClient } from "../generated/prisma/client";
import { RecommendationStatus } from "../generated/prisma/enums";

import { RecommendationRepository } from "../repositories/RecommendationRepository";
import { ReferralRepository } from "../repositories/ReferralRepository";

import { ReferralSharedDataBuilder } from "../domain/referral/ReferralSharedDataBuilder";

import { CreateReferralInput } from "../validation/createReferral.schema";

import { CreateReferralResponse } from "../contracts/referral/createReferral.contract";

export class CreateReferralService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly recommendationRepository: RecommendationRepository,
  ) {}

  async execute(
    recommendationId: string,
    input: CreateReferralInput,
  ): Promise<CreateReferralResponse> {
    const recommendation =
      await this.recommendationRepository.findByIdWithRelations(
        recommendationId,
      );

    if (!recommendation) {
      throw new NotFoundError("Recommendation not found.");
    }

    if (recommendation.referral) {
      throw new ConflictError(
        "A referral has already been created for this recommendation.",
      );
    }

    const sharedData = ReferralSharedDataBuilder.build(recommendation, input);

    const referral = await this.prisma.$transaction(async (tx) => {
      const referralRepository = new ReferralRepository(tx);
      const recommendationRepository = new RecommendationRepository(tx);

      const createdReferral = await referralRepository.create(
        recommendation.id,
        recommendation.case.id,
        sharedData,
      );

      await recommendationRepository.updateStatus(
        recommendation.id,
        RecommendationStatus.APPROVED,
      );

      return createdReferral;
    });

    return {
      id: referral.id,
      status: referral.status,
      recommendationId: referral.recommendationId,
      caseId: referral.caseId,
      createdAt: referral.createdAt,
    };
  }
}
