import { SafetyEvaluationService } from "./SafetyEvaluationService";
import { ServiceInferenceService } from "./ServiceInferenceService";
import { RecommendationService } from "./RecommendationService";

export class ProcessCaseService {
  constructor(
    private readonly safetyEvaluationService: SafetyEvaluationService,
    private readonly serviceInferenceService: ServiceInferenceService,
    private readonly recommendationService: RecommendationService,
  ) {}

  async execute(caseId: string): Promise<void> {
    await this.safetyEvaluationService.evaluate(caseId);
    await this.serviceInferenceService.infer(caseId);
    await this.recommendationService.generate(caseId);
  }
}
