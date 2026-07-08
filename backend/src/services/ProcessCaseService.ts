import { SafetyEvaluationService } from "./SafetyEvaluationService";

export class ProcessCaseService {
  constructor(
    private readonly safetyEvaluationService: SafetyEvaluationService,
  ) {}

  async execute(caseId: string): Promise<void> {
    await this.safetyEvaluationService.evaluate(caseId);

    // Next milestones:
    // await this.serviceInferenceService.infer(caseId);
    // await this.recommendationService.generate(caseId);
  }
}
