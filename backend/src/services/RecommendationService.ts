import { NotFoundError } from "../errors/NotFoundError";

import { PrismaClient } from "../generated/prisma/client";

import { CaseRepository } from "../repositories/CaseRepository";
import { RecommendationRepository } from "../repositories/RecommendationRepository";
import { OrganizationServiceRepository } from "../repositories/OrganizationServiceRepository";

import { RecommendationEngine } from "../domain/recommendation/RecommendationEngine";

export class RecommendationService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly caseRepository: CaseRepository,
    private readonly organizationServiceRepository: OrganizationServiceRepository,
    private readonly recommendationEngine: RecommendationEngine,
  ) {}

  async generate(caseId: string): Promise<void> {
    const caseEntity = await this.caseRepository.findByIdWithRelations(caseId);

    if (!caseEntity) {
      throw new NotFoundError("Case not found.");
    }

    const organizationServices =
      await this.organizationServiceRepository.findActiveByServiceIds(
        caseEntity.services.map((service) => service.id),
      );

    const inputs = organizationServices.map((organizationService) => ({
      organizationServiceId: organizationService.id,
      serviceId: organizationService.serviceId,
    }));

    const candidates = this.recommendationEngine.generate(inputs);

    if (candidates.length === 0) {
      return;
    }

    const recommendationRepository = new RecommendationRepository(this.prisma);

    await recommendationRepository.createMany(caseId, candidates);
  }

  async regenerate(caseId: string): Promise<void> {
    const caseEntity = await this.caseRepository.findByIdWithRelations(caseId);

    if (!caseEntity) {
      throw new NotFoundError("Case not found.");
    }

    const organizationServices =
      await this.organizationServiceRepository.findActiveByServiceIds(
        caseEntity.services.map((service) => service.id),
      );

    const inputs = organizationServices.map((organizationService) => ({
      organizationServiceId: organizationService.id,
      serviceId: organizationService.serviceId,
    }));

    const candidates = this.recommendationEngine.generate(inputs);

    await this.prisma.$transaction(async (tx) => {
      const recommendationRepository = new RecommendationRepository(tx);

      await recommendationRepository.deletePendingByCaseId(caseId);

      if (candidates.length > 0) {
        await recommendationRepository.createMany(caseId, candidates);
      }
    });
  }
}
