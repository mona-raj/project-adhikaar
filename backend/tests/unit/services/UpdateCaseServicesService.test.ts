import { beforeEach, describe, expect, it, vi } from "vitest";

import { UpdateCaseServicesService } from "../../../src/services/UpdateCaseServicesService";
import { CaseRepository } from "../../../src/repositories/CaseRepository";
import { ServiceRepository } from "../../../src/repositories/ServiceRepository";
import { RecommendationService } from "../../../src/services/RecommendationService";
import { NotFoundError } from "../../../src/errors/NotFoundError";

describe("UpdateCaseServicesService", () => {
  let caseRepository = {
    findById: vi.fn(),
    updateServices: vi.fn(),
  };

  let serviceRepository = {
    findManyByIds: vi.fn(),
  };

  let recommendationService = {
    regenerate: vi.fn(),
  };

  let service: UpdateCaseServicesService;

  beforeEach(() => {
    vi.clearAllMocks();

    service = new UpdateCaseServicesService(
      caseRepository as unknown as CaseRepository,
      serviceRepository as unknown as ServiceRepository,
      recommendationService as unknown as RecommendationService,
    );
  });

  it("updates the case services and regenerates recommendations", async () => {
    // Arrange
    const caseId = "case-123";

    const input = {
      serviceIds: ["service-1", "service-2"],
    };

    caseRepository.findById.mockResolvedValue({
      id: caseId,
    });

    serviceRepository.findManyByIds.mockResolvedValue([
      { id: "service-1" },
      { id: "service-2" },
    ]);

    // Act
    const response = await service.execute(caseId, input);

    // Assert
    expect(response).toEqual({
      caseId: caseId,
      serviceCount: 2,
    });

    expect(caseRepository.findById).toHaveBeenCalledWith(caseId);

    expect(serviceRepository.findManyByIds).toHaveBeenCalledWith(
      input.serviceIds,
    );

    expect(caseRepository.updateServices).toHaveBeenCalledWith(
      caseId,
      input.serviceIds,
    );

    expect(recommendationService.regenerate).toHaveBeenCalledWith(caseId);

    expect(caseRepository.findById).toHaveBeenCalledTimes(1);

    expect(serviceRepository.findManyByIds).toHaveBeenCalledTimes(1);

    expect(caseRepository.updateServices).toHaveBeenCalledTimes(1);

    expect(recommendationService.regenerate).toHaveBeenCalledTimes(1);
  });

  it("throws when case does not exist", async () => {
    // Arrange
    const caseId = "case-123";

    const input = {
      serviceIds: ["service-1", "service-2"],
    };

    caseRepository.findById.mockResolvedValue(null);

    // Act + Assert
    await expect(service.execute(caseId, input)).rejects.toThrow(NotFoundError);

    expect(caseRepository.findById).toHaveBeenCalledWith(caseId);

    expect(caseRepository.findById).toHaveBeenCalledTimes(1);

    expect(caseRepository.updateServices).not.toHaveBeenCalled();

    expect(recommendationService.regenerate).not.toHaveBeenCalled();

    expect(serviceRepository.findManyByIds).not.toHaveBeenCalled();
  });

  it("throws when one or more services not found", async () => {
    // Arrange
    const caseId = "case-123";

    const input = {
      serviceIds: ["service-1", "service-2"],
    };

    caseRepository.findById.mockResolvedValue({
      id: caseId,
    });

    serviceRepository.findManyByIds.mockResolvedValue([{ id: "service-1" }]);

    // Act + Assert
    await expect(service.execute(caseId, input)).rejects.toThrow(NotFoundError);

    expect(caseRepository.findById).toHaveBeenCalledWith(caseId);

    expect(caseRepository.findById).toHaveBeenCalledTimes(1);

    expect(serviceRepository.findManyByIds).toHaveBeenCalledWith(
      input.serviceIds,
    );

    expect(serviceRepository.findManyByIds).toHaveBeenCalledTimes(1);

    expect(caseRepository.updateServices).not.toHaveBeenCalled();

    expect(recommendationService.regenerate).not.toHaveBeenCalled();
  });
});
