import { RecommendationCandidate } from "../domain/recommendation/RecommendationCandidate";
import { Prisma, PrismaClient } from "../generated/prisma/client";
import { RecommendationStatus } from "../generated/prisma/enums";

export class RecommendationRepository {
  constructor(
    private readonly prisma: PrismaClient | Prisma.TransactionClient,
  ) {}

  async findByCaseId(caseId: string) {
    return this.prisma.recommendation.findMany({
      where: {
        caseId,
      },
      include: {
        organizationService: {
          include: {
            organization: true,
            service: true,
          },
        },
      },
      orderBy: {
        score: "desc",
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

  async deletePendingByCaseId(caseId: string) {
    return this.prisma.recommendation.deleteMany({
      where: {
        caseId,
        status: RecommendationStatus.PENDING,
      },
    });
  }

  async createMany(caseId: string, candidates: RecommendationCandidate[]) {
    return this.prisma.recommendation.createMany({
      data: candidates.map((candidate) => ({
        caseId,
        organizationServiceId: candidate.organizationServiceId,
        serviceId: candidate.serviceId,
        score: candidate.score,
        reason: candidate.reason,
      })),
    });
  }

  async updateStatus(id: string, status: RecommendationStatus) {
    return this.prisma.recommendation.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
