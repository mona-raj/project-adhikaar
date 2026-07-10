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
}
