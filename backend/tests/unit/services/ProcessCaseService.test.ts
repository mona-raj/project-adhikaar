import { beforeEach, describe, expect, it, vi } from "vitest";

import { ProcessCaseService } from "../../../src/services/ProcessCaseService";
import { SafetyEvaluationService } from "../../../src/services/SafetyEvaluationService";
import { ServiceInferenceService } from "../../../src/services/ServiceInferenceService";
import { RecommendationService } from "../../../src/services/RecommendationService";

describe("ProcessCaseService", () => {
  let safetyEvaluationService = {
    evaluate: vi.fn(),
  };

  let serviceInferenceService = {
    infer: vi.fn(),
  };

  let recommendationService = {
    generate: vi.fn(),
  };

  let service: ProcessCaseService;

  beforeEach(() => {
    vi.clearAllMocks();

    service = new ProcessCaseService(
      safetyEvaluationService as unknown as SafetyEvaluationService,
      serviceInferenceService as unknown as ServiceInferenceService,
      recommendationService as unknown as RecommendationService,
    );
  });

  it("evaluates safety, infers services, and generates recommendations in order", async () => {
    // Arrange
    const caseId = "case-123";

    safetyEvaluationService.evaluate.mockResolvedValue(undefined);
    serviceInferenceService.infer.mockResolvedValue(undefined);
    recommendationService.generate.mockResolvedValue(undefined);

    // Act
    await service.execute(caseId);

    // Assert
    expect(safetyEvaluationService.evaluate).toHaveBeenCalledWith(caseId);

    expect(serviceInferenceService.infer).toHaveBeenCalledWith(caseId);

    expect(recommendationService.generate).toHaveBeenCalledWith(caseId);

    expect(
      safetyEvaluationService.evaluate.mock.invocationCallOrder[0],
    ).toBeLessThan(serviceInferenceService.infer.mock.invocationCallOrder[0]);

    expect(
      serviceInferenceService.infer.mock.invocationCallOrder[0],
    ).toBeLessThan(recommendationService.generate.mock.invocationCallOrder[0]);
  });

  it("does not continue processing when safety evaluation fails", async () => {
    // Arrange
    const caseId = "case-123";

    const error = new Error("Safety evaluation failed");

    safetyEvaluationService.evaluate.mockRejectedValue(error);

    // Act + Assert
    await expect(service.execute(caseId)).rejects.toThrow(error);

    expect(safetyEvaluationService.evaluate).toHaveBeenCalledWith(caseId);

    expect(serviceInferenceService.infer).not.toHaveBeenCalled();

    expect(recommendationService.generate).not.toHaveBeenCalled();
  });

  it("does not generate recommendations when service inference fails", async () => {
    // Arrange
    const caseId = "case-123";

    const error = new Error("Inference failed");

    safetyEvaluationService.evaluate.mockResolvedValue(undefined);

    serviceInferenceService.infer.mockRejectedValue(error);

    // Act + Assert
    await expect(service.execute(caseId)).rejects.toThrow(error);

    expect(safetyEvaluationService.evaluate).toHaveBeenCalledWith(caseId);

    expect(serviceInferenceService.infer).toHaveBeenCalledWith(caseId);

    expect(recommendationService.generate).not.toHaveBeenCalled();
  });
});
