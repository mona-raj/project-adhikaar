import { beforeEach, describe, expect, it, vi } from "vitest";

import { RecommendationService } from "../../../src/services/RecommendationService";

import { CaseRepository } from "../../../src/repositories/CaseRepository";
import { OrganizationServiceRepository } from "../../../src/repositories/OrganizationServiceRepository";

import { RecommendationEngine } from "../../../src/domain/recommendation/RecommendationEngine";
import { RecommendationRepository } from "../../../src/repositories/RecommendationRepository";
import { NotFoundError } from "../../../src/errors/NotFoundError";

describe("RecommendationService", () => {
  let prisma = {
    $transaction: vi.fn(),
  };

  let caseRepository = {
    findByIdWithRelations: vi.fn(),
  };

  let organizationServiceRepository = {
    findActiveByServiceIds: vi.fn(),
  };

  let recommendationEngine = {
    generate: vi.fn(),
  };

  let service: RecommendationService;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();

    service = new RecommendationService(
      prisma as any,
      caseRepository as unknown as CaseRepository,
      organizationServiceRepository as unknown as OrganizationServiceRepository,
      recommendationEngine as unknown as RecommendationEngine,
    );

    prisma.$transaction.mockImplementation(async (callback) => {
      return callback({});
    });
  });

  it("creates recommendations for all eligible organization services", async () => {
    // Arrange
    const createManySpy = vi
      .spyOn(RecommendationRepository.prototype, "createMany")
      .mockResolvedValue(undefined as any);

    const caseId = "case-123";

    caseRepository.findByIdWithRelations.mockResolvedValue({
      id: caseId,
      services: [{ id: "service-1" }, { id: "service-2" }],
    });

    organizationServiceRepository.findActiveByServiceIds.mockResolvedValue([
      {
        id: "org-service-1",
        serviceId: "service-1",
      },
      {
        id: "org-service-2",
        serviceId: "service-2",
      },
    ]);

    recommendationEngine.generate.mockReturnValue([
      {
        organizationServiceId: "org-service-1",
        serviceId: "service-1",
        score: 1,
        reason: "Service available",
      },
      {
        organizationServiceId: "org-service-2",
        serviceId: "service-2",
        score: 1,
        reason: "Service available",
      },
    ]);

    const candidates = [
      {
        organizationServiceId: "org-service-1",
        serviceId: "service-1",
        score: 1,
        reason: "Service available",
      },
      {
        organizationServiceId: "org-service-2",
        serviceId: "service-2",
        score: 1,
        reason: "Service available",
      },
    ];

    recommendationEngine.generate.mockReturnValue(candidates);

    // Act
    await service.generate(caseId);

    // Assert
    expect(caseRepository.findByIdWithRelations).toHaveBeenCalledWith(caseId);

    expect(
      organizationServiceRepository.findActiveByServiceIds,
    ).toHaveBeenCalledWith(["service-1", "service-2"]);

    expect(recommendationEngine.generate).toHaveBeenCalledWith([
      {
        organizationServiceId: "org-service-1",
        serviceId: "service-1",
      },
      {
        organizationServiceId: "org-service-2",
        serviceId: "service-2",
      },
    ]);

    expect(createManySpy).toHaveBeenCalledWith(caseId, candidates);
  });

  it("throws when case does not exist", async () => {
    // Arrange
    const createManySpy = vi
      .spyOn(RecommendationRepository.prototype, "createMany")
      .mockResolvedValue(undefined as any);

    const caseId = "case-123";

    caseRepository.findByIdWithRelations.mockResolvedValue(null);

    // Act + Assert
    await expect(service.generate(caseId)).rejects.toThrow(NotFoundError);

    expect(caseRepository.findByIdWithRelations).toHaveBeenCalledWith(caseId);

    expect(caseRepository.findByIdWithRelations).toHaveBeenCalledTimes(1);

    expect(
      organizationServiceRepository.findActiveByServiceIds,
    ).not.toHaveBeenCalled();

    expect(recommendationEngine.generate).not.toHaveBeenCalled();

    expect(createManySpy).not.toHaveBeenCalled();
  });

  it("does not persist recommendations when the engine returns no candidates", async () => {
    // Arrange
    const createManySpy = vi
      .spyOn(RecommendationRepository.prototype, "createMany")
      .mockResolvedValue(undefined as any);

    const caseId = "case-123";

    caseRepository.findByIdWithRelations.mockResolvedValue({
      id: caseId,
      services: [{ id: "service-1" }, { id: "service-2" }],
    });

    organizationServiceRepository.findActiveByServiceIds.mockResolvedValue([
      {
        id: "org-service-1",
        serviceId: "service-1",
      },
      {
        id: "org-service-2",
        serviceId: "service-2",
      },
    ]);

    recommendationEngine.generate.mockReturnValue([]);

    // Act
    await service.generate(caseId);

    // Assert
    expect(caseRepository.findByIdWithRelations).toHaveBeenCalledWith(caseId);

    expect(
      organizationServiceRepository.findActiveByServiceIds,
    ).toHaveBeenCalledWith(["service-1", "service-2"]);

    expect(recommendationEngine.generate).toHaveBeenCalled();

    expect(createManySpy).not.toHaveBeenCalled();
  });

  it("replaces pending recommendations with newly generated recommendations", async () => {
    // Arrange
    const deletePendingSpy = vi
      .spyOn(RecommendationRepository.prototype, "deletePendingByCaseId")
      .mockResolvedValue(undefined as any);

    const createManySpy = vi
      .spyOn(RecommendationRepository.prototype, "createMany")
      .mockResolvedValue(undefined as any);

    const caseId = "case=123";

    caseRepository.findByIdWithRelations.mockResolvedValue({
      id: caseId,
      services: [{ id: "service-1" }, { id: "service-2" }],
    });

    organizationServiceRepository.findActiveByServiceIds.mockResolvedValue([
      {
        id: "org-service-1",
        serviceId: "service-1",
      },
      {
        id: "org-service-2",
        serviceId: "service-2",
      },
    ]);

    const candidates = [
      {
        organizationServiceId: "org-service-1",
        serviceId: "service-1",
        score: 1,
        reason: "Service available",
      },
      {
        organizationServiceId: "org-service-2",
        serviceId: "service-2",
        score: 1,
        reason: "Service available",
      },
    ];

    recommendationEngine.generate.mockReturnValue(candidates);

    // Act
    await service.regenerate(caseId);

    // Assert
    expect(caseRepository.findByIdWithRelations).toHaveBeenCalledWith(caseId);

    expect(
      organizationServiceRepository.findActiveByServiceIds,
    ).toHaveBeenCalledWith(["service-1", "service-2"]);

    expect(recommendationEngine.generate).toHaveBeenCalledWith([
      {
        organizationServiceId: "org-service-1",
        serviceId: "service-1",
      },
      {
        organizationServiceId: "org-service-2",
        serviceId: "service-2",
      },
    ]);

    expect(deletePendingSpy).toHaveBeenCalledWith(caseId);

    expect(createManySpy).toHaveBeenCalledWith(caseId, candidates);

    expect(deletePendingSpy.mock.invocationCallOrder[0]).toBeLessThan(
      createManySpy.mock.invocationCallOrder[0],
    );
  });

  it("throws when regenerating recommendations for a non-existent case", async () => {
    // Arrange
    const createManySpy = vi
      .spyOn(RecommendationRepository.prototype, "createMany")
      .mockResolvedValue(undefined as any);

    const caseId = "case-123";

    caseRepository.findByIdWithRelations.mockResolvedValue(null);

    // Act + Assert
    await expect(service.regenerate(caseId)).rejects.toThrow(NotFoundError);

    expect(caseRepository.findByIdWithRelations).toHaveBeenCalledWith(caseId);

    expect(caseRepository.findByIdWithRelations).toHaveBeenCalledTimes(1);

    expect(
      organizationServiceRepository.findActiveByServiceIds,
    ).not.toHaveBeenCalled();

    expect(recommendationEngine.generate).not.toHaveBeenCalled();

    expect(createManySpy).not.toHaveBeenCalled();
  });

  it("does not recreate recommendations when the engine returns no candidates during regeneration", async () => {
    // Arrange
    const deletePendingSpy = vi
      .spyOn(RecommendationRepository.prototype, "deletePendingByCaseId")
      .mockResolvedValue(undefined as any);

    const createManySpy = vi
      .spyOn(RecommendationRepository.prototype, "createMany")
      .mockResolvedValue(undefined as any);

    const caseId = "case=123";

    caseRepository.findByIdWithRelations.mockResolvedValue({
      id: caseId,
      services: [{ id: "service-1" }, { id: "service-2" }],
    });

    organizationServiceRepository.findActiveByServiceIds.mockResolvedValue([
      {
        id: "org-service-1",
        serviceId: "service-1",
      },
      {
        id: "org-service-2",
        serviceId: "service-2",
      },
    ]);

    recommendationEngine.generate.mockReturnValue([]);

    // Act
    await service.regenerate(caseId);

    // Assert
    expect(caseRepository.findByIdWithRelations).toHaveBeenCalledWith(caseId);

    expect(
      organizationServiceRepository.findActiveByServiceIds,
    ).toHaveBeenCalledWith(["service-1", "service-2"]);

    expect(recommendationEngine.generate).toHaveBeenCalledWith([
      {
        organizationServiceId: "org-service-1",
        serviceId: "service-1",
      },
      {
        organizationServiceId: "org-service-2",
        serviceId: "service-2",
      },
    ]);

    expect(deletePendingSpy).toHaveBeenCalledWith(caseId);

    expect(createManySpy).not.toHaveBeenCalled;
  });
});
