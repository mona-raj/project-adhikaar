import { Prisma, PrismaClient } from "../generated/prisma/client";
import {
  ReferralStatus,
} from "../generated/prisma/enums";

import { ReferralSharedData } from "../domain/referral/ReferralSharedData";

export class ReferralRepository {
  constructor(
    private readonly prisma: PrismaClient | Prisma.TransactionClient,
  ) {}

  async create(
    recommendationId: string,
    caseId: string,
    sharedData: ReferralSharedData,
  ) {
    return this.prisma.referral.create({
      data: {
        recommendationId,
        caseId,
        status: ReferralStatus.SENT,
        sharedData: sharedData as unknown as Prisma.InputJsonValue,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.referral.findUnique({
      where: { id },
      include: {
        recommendation: {
          include: {
            service: true,
            organizationService: {
              include: {
                organization: true,
              },
            },
          },
        },
      },
    });
  }

  async findByRecommendationId(recommendationId: string) {
    return this.prisma.referral.findUnique({
      where: {
        recommendationId,
      },
    });
  }

  async findByIdWithRelations(id: string) {
    return this.prisma.recommendation.findUnique({
      where: {
        id,
      },
      include: {
        service: true,

        case: {
          include: {
            helpRequest: {
              include: {
                preferredLanguage: true,
              },
            },
          },
        },

        organizationService: {
          include: {
            organization: true,
          },
        },

        referral: true,
      },
    });
  }

  async updateStatus(id: string, status: ReferralStatus) {
    return this.prisma.referral.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
