import { beforeEach, describe, expect, it, vi } from "vitest";

import { SafetyEvaluationService } from "../../../src/services/SafetyEvaluationService";
import { CaseRepository } from "../../../src/repositories/CaseRepository";

import { NotFoundError } from "../../../src/errors/NotFoundError";
import { SafetyStatus } from "../../../src/generated/prisma/enums";

describe("SafetyEvaluationService", () => {
  let caseRepository: {
    findByIdWithRelations: ReturnType<typeof vi.fn>;
    updateEvaluatedSafetyStatus: ReturnType<typeof vi.fn>;
  };

  let service: SafetyEvaluationService;

  beforeEach(() => {
    caseRepository = {
      findByIdWithRelations: vi.fn(),
      updateEvaluatedSafetyStatus: vi.fn(),
    };

    service = new SafetyEvaluationService(
      caseRepository as unknown as CaseRepository,
    );
  });

  it("returns the declared safety status and updates the case", async () => {
    // Arrange
    const caseId = "case-123";

    caseRepository.findByIdWithRelations.mockResolvedValue({
      helpRequest: {
        declaredSafetyStatus: SafetyStatus.UNSAFE,
      },
    });

    // Act
    const result = await service.evaluate(caseId);

    // Assert
    expect(caseRepository.findByIdWithRelations).toHaveBeenCalledWith(caseId);

    expect(caseRepository.updateEvaluatedSafetyStatus).toHaveBeenCalledWith(
      caseId,
      SafetyStatus.UNSAFE,
    );

    expect(result).toBe(SafetyStatus.UNSAFE);
  });

  it("returns UNKNOWN when no declared safety status exists", async () => {
    // Arrange
    const caseId = "case-123";

    caseRepository.findByIdWithRelations.mockResolvedValue({
      helpRequest: {
        declaredSafetyStatus: null,
      },
    });

    // Act
    const result = await service.evaluate(caseId);

    // Assert
    expect(caseRepository.updateEvaluatedSafetyStatus).toHaveBeenCalledWith(
      caseId,
      SafetyStatus.UNKNOWN,
    );

    expect(result).toBe(SafetyStatus.UNKNOWN);
  });

  it("throws when the case does not exist", async () => {
    // Arrange
    const caseId = "case-123";

    caseRepository.findByIdWithRelations.mockResolvedValue(null);

    // Act + Assert
    await expect(service.evaluate(caseId)).rejects.toThrow(NotFoundError);

    expect(caseRepository.updateEvaluatedSafetyStatus).not.toHaveBeenCalled();
  });
});
