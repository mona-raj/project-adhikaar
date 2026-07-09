import { SafetyEvaluationService } from "./SafetyEvaluationService";
import { ServiceInferenceService } from "./ServiceInferenceService";

export class ProcessCaseService {
  constructor(
    private readonly safetyEvaluationService: SafetyEvaluationService,
    private readonly serviceInferenceService: ServiceInferenceService,
  ) {}

  async execute(caseId: string): Promise<void> {
    await this.safetyEvaluationService.evaluate(caseId);

    await this.serviceInferenceService.infer(caseId);

    // Next milestones:
    // await this.recommendationService.generate(caseId);
  }
}
