import { NotFoundError } from "../errors/NotFoundError";

import { CaseRepository } from "../repositories/CaseRepository";
import { ServiceRepository } from "../repositories/ServiceRepository";

import { ServiceInferenceEngine } from "../domain/inference/ServiceInferenceEngine";

export class ServiceInferenceService {
  constructor(
    private readonly caseRepository: CaseRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly inferenceEngine: ServiceInferenceEngine,
  ) {}

  async infer(caseId: string): Promise<void> {
    const caseEntity =
      await this.caseRepository.findByIdWithRelations(caseId);

    if (!caseEntity) {
      throw new NotFoundError("Case not found.");
    }

    const inferredCodes = this.inferenceEngine.infer(
      caseEntity.helpRequest.description,
    );

    const services =
      await this.serviceRepository.findManyByCodes(inferredCodes);

    const serviceIds = services.map((service) => service.id);

    await this.caseRepository.updateServices(caseId, serviceIds);
  }
}
