import { NotFoundError } from "../errors/NotFoundError";
import { SafetyStatus } from "../generated/prisma/enums";
import { CaseRepository } from "../repositories/CaseRepository";

export class SafetyEvaluationService {
  constructor(private readonly caseRepository: CaseRepository) {}

  async evaluate(caseId: string): Promise<SafetyStatus> {
    const caseEntity =
      await this.caseRepository.findByIdWithHelpRequest(caseId);

    if (!caseEntity) {
      throw new NotFoundError("Case not found.");
    }

    const evaluatedStatus =
      caseEntity.helpRequest.declaredSafetyStatus ?? SafetyStatus.UNKNOWN;

    await this.caseRepository.updateEvaluatedSafetyStatus(
      caseId,
      evaluatedStatus,
    );

    return evaluatedStatus;
  }
}
