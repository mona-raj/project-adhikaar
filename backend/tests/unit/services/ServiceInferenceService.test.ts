import { beforeEach, describe, expect, it, vi } from "vitest";

import { ServiceInferenceService } from "../../../src/services/ServiceInferenceService";

import { CaseRepository } from "../../../src/repositories/CaseRepository";
import { ServiceRepository } from "../../../src/repositories/ServiceRepository";

import { ServiceInferenceEngine } from "../../../src/domain/inference/ServiceInferenceEngine";

import { NotFoundError } from "../../../src/errors/NotFoundError";

describe("ServiceInferenceService", () => {
  let caseRepository: {
    findByIdWithRelations: ReturnType<typeof vi.fn>;
    updateServices: ReturnType<typeof vi.fn>;
  };

  let serviceRepository: {
    findManyByCodes: ReturnType<typeof vi.fn>;
  };

  let inferenceEngine: {
    infer: ReturnType<typeof vi.fn>;
  };

  let service: ServiceInferenceService;

  beforeEach(() => {
    caseRepository = {
      findByIdWithRelations: vi.fn(),
      updateServices: vi.fn(),
    };

    serviceRepository = {
      findManyByCodes: vi.fn(),
    };

    inferenceEngine = {
      infer: vi.fn(),
    };

    service = new ServiceInferenceService(
      caseRepository as unknown as CaseRepository,
      serviceRepository as unknown as ServiceRepository,
      inferenceEngine as unknown as ServiceInferenceEngine,
    );
  });

  it("infers services and updates the case", async () => {
    // Arrange
    const caseId = "case-123";

    caseRepository.findByIdWithRelations.mockResolvedValue({
      helpRequest: {
        description: "I need food and shelter.",
      },
    });

    inferenceEngine.infer.mockReturnValue(["FOOD", "SHELTER"]);

    serviceRepository.findManyByCodes.mockResolvedValue([
      { id: "service-1" },
      { id: "service-2" },
    ]);

    // Act
    await service.infer(caseId);

    // Assert
    expect(caseRepository.findByIdWithRelations).toHaveBeenCalledWith(caseId);

    expect(inferenceEngine.infer).toHaveBeenCalledWith(
      "I need food and shelter.",
    );

    expect(serviceRepository.findManyByCodes).toHaveBeenCalledWith([
      "FOOD",
      "SHELTER",
    ]);

    expect(caseRepository.updateServices).toHaveBeenCalledWith(caseId, [
      "service-1",
      "service-2",
    ]);
  });

  it("updates the case with no services when nothing is inferred", async () => {
    // Arrange
    const caseId = "case-123";

    caseRepository.findByIdWithRelations.mockResolvedValue({
      helpRequest: {
        description: "Hello",
      },
    });

    inferenceEngine.infer.mockReturnValue([]);

    serviceRepository.findManyByCodes.mockResolvedValue([]);

    // Act
    await service.infer(caseId);

    // Assert
    expect(serviceRepository.findManyByCodes).toHaveBeenCalledWith([]);

    expect(caseRepository.updateServices).toHaveBeenCalledWith(caseId, []);
  });

  it("throws when the case does not exist", async () => {
    // Arrange
    const caseId = "case-123";

    caseRepository.findByIdWithRelations.mockResolvedValue(null);

    // Act + Assert
    await expect(service.infer(caseId)).rejects.toThrow(NotFoundError);

    expect(inferenceEngine.infer).not.toHaveBeenCalled();

    expect(serviceRepository.findManyByCodes).not.toHaveBeenCalled();

    expect(caseRepository.updateServices).not.toHaveBeenCalled();
  });
});
