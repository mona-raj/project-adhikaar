import { beforeEach, describe, expect, it, vi } from "vitest";

import { CreateReferralService } from "../../../src/services/CreateReferralService";

import { RecommendationRepository } from "../../../src/repositories/RecommendationRepository";
import { ReferralRepository } from "../../../src/repositories/ReferralRepository";

import { ReferralSharedDataBuilder } from "../../../src/domain/referral/ReferralSharedDataBuilder";

import {
  RecommendationStatus,
  ReferralStatus,
} from "../../../src/generated/prisma/enums";

import { NotFoundError } from "../../../src/errors/NotFoundError";
import { ConflictError } from "../../../src/errors/ConflictError";

describe("CreateReferralService", () => {
  let prisma = {
    $transaction: vi.fn(),
  };

  let recommendationRepository = {
    findByIdWithRelations: vi.fn(),
  };

  let service: CreateReferralService;

  let createReferralSpy: ReturnType<typeof vi.spyOn>;
  let updateStatusSpy: ReturnType<typeof vi.spyOn>;
  let buildSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();

    createReferralSpy = vi.spyOn(ReferralRepository.prototype, "create");

    updateStatusSpy = vi.spyOn(
      RecommendationRepository.prototype,
      "updateStatus",
    );

    buildSpy = vi.spyOn(ReferralSharedDataBuilder, "build");

    service = new CreateReferralService(
      prisma as any,
      recommendationRepository as unknown as RecommendationRepository,
    );

    prisma.$transaction.mockImplementation(async (callback) => {
      return callback({} as any);
    });
  });

  const input = {
    contactName: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
  };

  const recommendation = {
    id: "recommendation-1",

    referral: null,

    case: {
      id: "case-1",

      helpRequest: {
        description: "Need financial assistance for education.",
        preferredLanguage: {
          code: "en",
          name: "English",
        },
      },
    },

    service: {
      id: "service-1",
      code: "FINANCIAL_AID",
      name: "Financial Aid",
    },
  };

  const sharedData = {
    contact: {
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
    },

    helpRequest: {
      description: "Need financial assistance for education.",
    },

    preferredLanguage: {
      code: "en",
      name: "English",
    },

    service: {
      code: "FINANCIAL_AID",
      name: "Financial Aid",
    },
  };
  
  it("creates a referral and approves the recommendation", async () => {
    recommendationRepository.findByIdWithRelations.mockResolvedValue(
      recommendation,
    );

    const createdAt = new Date();
    
    buildSpy.mockReturnValue(sharedData);

    createReferralSpy.mockResolvedValue({
      id: "referral-1",
      status: ReferralStatus.SENT,
      recommendationId: "recommendation-1",
      caseId: "case-1",
      createdAt,
    } as any);

    updateStatusSpy.mockResolvedValue({
      id: "recommendation-1",
      status: RecommendationStatus.APPROVED,
    } as any);

    const result = await service.execute("recommendation-1", input);

    expect(recommendationRepository.findByIdWithRelations).toHaveBeenCalledWith(
      "recommendation-1",
    );

    expect(buildSpy).toHaveBeenCalledWith(recommendation, input);

    expect(createReferralSpy).toHaveBeenCalledWith(
      "recommendation-1",
      "case-1",
      sharedData,
    );

    expect(updateStatusSpy).toHaveBeenCalledWith(
      "recommendation-1",
      RecommendationStatus.APPROVED,
    );

    expect(buildSpy.mock.invocationCallOrder[0]).toBeLessThan(
      createReferralSpy.mock.invocationCallOrder[0],
    );

    expect(createReferralSpy.mock.invocationCallOrder[0]).toBeLessThan(
      updateStatusSpy.mock.invocationCallOrder[0],
    );

    expect(result).toEqual({
      id: "referral-1",
      status: ReferralStatus.SENT,
      recommendationId: "recommendation-1",
      caseId: "case-1",
      createdAt,
    });
  });

  it("throws when recommendation does not exist", async () => {
    recommendationRepository.findByIdWithRelations.mockResolvedValue(null);

    await expect(service.execute("recommendation-1", input)).rejects.toThrow(
      NotFoundError,
    );

    expect(buildSpy).not.toHaveBeenCalled();

    expect(prisma.$transaction).not.toHaveBeenCalled();

    expect(createReferralSpy).not.toHaveBeenCalled();

    expect(updateStatusSpy).not.toHaveBeenCalled();
  });

  it("throws when a referral already exists", async () => {
    recommendationRepository.findByIdWithRelations.mockResolvedValue({
      ...recommendation,
      referral: {
        id: "referral-1",
      },
    } as any);

    await expect(service.execute("recommendation-1", input)).rejects.toThrow(
      ConflictError,
    );

    expect(buildSpy).not.toHaveBeenCalled();

    expect(prisma.$transaction).not.toHaveBeenCalled();

    expect(createReferralSpy).not.toHaveBeenCalled();

    expect(updateStatusSpy).not.toHaveBeenCalled();
  });

  it("does not approve the recommendation when referral creation fails", async () => {
    recommendationRepository.findByIdWithRelations.mockResolvedValue(
      recommendation,
    );

    buildSpy.mockReturnValue(sharedData as any);

    const error = new Error("Referral creation failed");

    createReferralSpy.mockRejectedValue(error);

    await expect(service.execute("recommendation-1", input)).rejects.toThrow(
      error,
    );

    expect(createReferralSpy).toHaveBeenCalled();

    expect(updateStatusSpy).not.toHaveBeenCalled();
  });

  it("propagates approval errors after creating the referral", async () => {
    recommendationRepository.findByIdWithRelations.mockResolvedValue(
      recommendation,
    );

    buildSpy.mockReturnValue(sharedData as any);

    createReferralSpy.mockResolvedValue({
      id: "referral-1",
    } as any);

    const error = new Error("Approval failed");

    updateStatusSpy.mockRejectedValue(error);

    await expect(service.execute("recommendation-1", input)).rejects.toThrow(
      error,
    );

    expect(createReferralSpy).toHaveBeenCalled();

    expect(updateStatusSpy).toHaveBeenCalled();

    expect(createReferralSpy.mock.invocationCallOrder[0]).toBeLessThan(
      updateStatusSpy.mock.invocationCallOrder[0],
    );
  });

  it("builds shared data before creating the referral", async () => {
    recommendationRepository.findByIdWithRelations.mockResolvedValue(
      recommendation,
    );

    buildSpy.mockReturnValue(sharedData as any);

    createReferralSpy.mockResolvedValue({
      id: "referral-1",
      status: ReferralStatus.SENT,
      recommendationId: "recommendation-1",
      caseId: "case-1",
      createdAt: new Date(),
    } as any);

    updateStatusSpy.mockResolvedValue({
      id: "recommendation-1",
      status: RecommendationStatus.APPROVED,
    } as any);

    await service.execute("recommendation-1", input);

    expect(buildSpy).toHaveBeenCalledWith(recommendation, input);

    expect(buildSpy.mock.invocationCallOrder[0]).toBeLessThan(
      createReferralSpy.mock.invocationCallOrder[0],
    );
  });
});
