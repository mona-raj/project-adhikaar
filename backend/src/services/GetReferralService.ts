import { GetReferralResponse } from "../contracts/referral/getReferral.contract";
import { ReferralSharedData } from "../domain/referral/ReferralSharedData";

import { NotFoundError } from "../errors/NotFoundError";

import { ReferralRepository } from "../repositories/ReferralRepository";

export class GetReferralService {
  constructor(private readonly referralRepository: ReferralRepository) {}

  async execute(id: string): Promise<GetReferralResponse> {
    const referral = await this.referralRepository.findById(id);

    if (!referral) {
      throw new NotFoundError("Referral not found.");
    }

    return {
      id: referral.id,

      status: referral.status,

      createdAt: referral.createdAt,

      recommendation: {
        id: referral.recommendation.id,
        status: referral.recommendation.status,
        score: referral.recommendation.score,
        reason: referral.recommendation.reason,
      },

      service: {
        id: referral.recommendation.service.id,
        code: referral.recommendation.service.code,
        name: referral.recommendation.service.name,
      },

      organization: {
        id: referral.recommendation.organizationService.organization.id,
        name: referral.recommendation.organizationService.organization.name,
        website:
          referral.recommendation.organizationService.organization.website,
        email: referral.recommendation.organizationService.organization.email,
        phone: referral.recommendation.organizationService.organization.phone,
      },

      sharedData: referral.sharedData as unknown as ReferralSharedData,
    };
  }
}
