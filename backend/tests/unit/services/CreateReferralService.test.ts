import { beforeEach, describe, expect, it, vi } from "vitest";

import { GetCaseService } from "../../../src/services/GetCaseService";

import { CaseRepository } from "../../../src/repositories/CaseRepository";

import { NotFoundError } from "../../../src/errors/NotFoundError";

import {
  CaseStatus,
  RecommendationStatus,
  SafetyStatus,
} from "../../../src/generated/prisma/enums";

describe("GetCaseService", () => {
  let caseRepository: {
    findByIdWithRelations: ReturnType<typeof vi.fn>;
  };

  let service: GetCaseService;

  beforeEach(() => {
    caseRepository = {
      findByIdWithRelations: vi.fn(),
    };

    service = new GetCaseService(caseRepository as unknown as CaseRepository);
  });

  it("maps the case aggregate into the response", async () => {
    // Arrange
    const caseId = "case-123";

    caseRepository.findByIdWithRelations.mockResolvedValue({
      id: caseId,

      status: CaseStatus.NEW,

      evaluatedSafetyStatus: SafetyStatus.UNKNOWN,

      helpRequest: {
        id: "help-request-1",
        description: "I need food and temporary shelter.",
        declaredSafetyStatus: SafetyStatus.UNKNOWN,
      },

      services: [
        {
          id: "service-1",
          code: "FOOD",
          name: "Food Assistance",
        },
        {
          id: "service-2",
          code: "SHELTER",
          name: "Shelter",
        },
      ],

      recommendations: [
        {
          id: "recommendation-1",

          status: RecommendationStatus.PENDING,

          score: 1,

          reason: "Service available",

          service: {
            id: "service-1",
            code: "FOOD",
            name: "Food Assistance",
          },

          organizationService: {
            organization: {
              id: "organization-1",
              name: "Helping Hands NGO",
              website: "https://example.org",
              email: "help@example.org",
              phone: "9999999999",
            },
          },
        },
      ],
    });

    // Act
    const result = await service.execute(caseId);

    // Assert
    expect(caseRepository.findByIdWithRelations).toHaveBeenCalledWith(caseId);

    expect(result).toEqual({
      id: caseId,

      status: CaseStatus.NEW,

      evaluatedSafetyStatus: SafetyStatus.UNKNOWN,

      helpRequest: {
        id: "help-request-1",
        description: "I need food and temporary shelter.",
        declaredSafetyStatus: SafetyStatus.UNKNOWN,
      },

      services: [
        {
          id: "service-1",
          code: "FOOD",
          name: "Food Assistance",
        },
        {
          id: "service-2",
          code: "SHELTER",
          name: "Shelter",
        },
      ],

      recommendations: [
        {
          id: "recommendation-1",

          status: RecommendationStatus.PENDING,

          score: 1,

          reason: "Service available",

          service: {
            id: "service-1",
            code: "FOOD",
            name: "Food Assistance",
          },

          organization: {
            id: "organization-1",
            name: "Helping Hands NGO",
            website: "https://example.org",
            email: "help@example.org",
            phone: "9999999999",
          },
        },
      ],
    });
  });

  it("throws when the case does not exist", async () => {
    // Arrange
    const caseId = "case-123";

    caseRepository.findByIdWithRelations.mockResolvedValue(null);

    // Act + Assert
    await expect(service.execute(caseId)).rejects.toThrow(NotFoundError);

    expect(caseRepository.findByIdWithRelations).toHaveBeenCalledWith(caseId);
  });
});
