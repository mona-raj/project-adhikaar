import { NotFoundError } from "../errors/NotFoundError";

import { CaseRepository } from "../repositories/CaseRepository";
import { ServiceRepository } from "../repositories/ServiceRepository";

import { UpdateCaseServicesInput } from "../validation/updateCaseServices.schema";

import { UpdateCaseServicesResponse } from "../contracts/service/updateCaseServices.contract";
import { RecommendationService } from "./RecommendationService";

export class UpdateCaseServicesService {
  constructor(
    private readonly caseRepository: CaseRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly recommendationService: RecommendationService,
  ) {}

  async execute(
    caseId: string,
    input: UpdateCaseServicesInput,
  ): Promise<UpdateCaseServicesResponse> {
    const caseEntity = await this.caseRepository.findById(caseId);

    if (!caseEntity) {
      throw new NotFoundError("Case not found.");
    }

    const services = await this.serviceRepository.findManyByIds(
      input.serviceIds,
    );

    if (services.length !== input.serviceIds.length) {
      throw new NotFoundError("One or more services were not found.");
    }

    await this.caseRepository.updateServices(caseId, input.serviceIds);

    await this.recommendationService.regenerate(caseId);

    return {
      caseId,
      serviceCount: input.serviceIds.length,
    };
  }
}
