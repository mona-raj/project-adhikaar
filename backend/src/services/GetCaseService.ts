import { NotFoundError } from "../errors/NotFoundError";

import { CaseRepository } from "../repositories/CaseRepository";

import { GetCaseResponse } from "../contracts/case/getCase.contract";

export class GetCaseService {
  constructor(private readonly caseRepository: CaseRepository) {}

  async execute(caseId: string): Promise<GetCaseResponse> {
    const caseEntity = await this.caseRepository.findByIdWithRelations(caseId);

    if (!caseEntity) {
      throw new NotFoundError("Case not found.");
    }

    return {
      id: caseEntity.id,

      status: caseEntity.status,

      evaluatedSafetyStatus: caseEntity.evaluatedSafetyStatus,

      helpRequest: {
        id: caseEntity.helpRequest.id,
        description: caseEntity.helpRequest.description,
        declaredSafetyStatus: caseEntity.helpRequest.declaredSafetyStatus,
      },

      services: caseEntity.services.map((service) => ({
        id: service.id,
        code: service.code,
        name: service.name,
      })),

      recommendations: caseEntity.recommendations.map((recommendation) => ({
        id: recommendation.id,

        status: recommendation.status,

        score: recommendation.score,

        reason: recommendation.reason,

        service: {
          id: recommendation.service.id,
          code: recommendation.service.code,
          name: recommendation.service.name,
        },

        organization: {
          id: recommendation.organizationService.organization.id,
          name: recommendation.organizationService.organization.name,
          website: recommendation.organizationService.organization.website,
          email: recommendation.organizationService.organization.email,
          phone: recommendation.organizationService.organization.phone,
        },
      })),
    };
  }
}
