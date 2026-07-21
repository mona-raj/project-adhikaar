import { beforeEach, describe, expect, it, vi } from "vitest";

import { GetReferralService } from "../../../src/services/GetReferralService";

import { ReferralRepository } from "../../../src/repositories/ReferralRepository";

import { NotFoundError } from "../../../src/errors/NotFoundError";

import {
  RecommendationStatus,
  ReferralStatus,
} from "../../../src/generated/prisma/enums";

describe("GetReferralService", () => {
  let referralRepository: {
    findById: ReturnType<typeof vi.fn>;
  };

  let service: GetReferralService;

  beforeEach(() => {
    referralRepository = {
      findById: vi.fn(),
    };

    service = new GetReferralService(
      referralRepository as unknown as ReferralRepository,
    );
  });

  it("maps the referral aggregate into the response", async () => {
    const createdAt = new Date();

    referralRepository.findById.mockResolvedValue({
      id: "referral-1",
      status: ReferralStatus.SENT,
      createdAt,

      recommendation: {
        id: "recommendation-1",
        status: RecommendationStatus.APPROVED,
        score: 1,
        reason: "Service available",

        service: {
          id: "service-1",
          code: "FOOD",
          name: "Food Assistance",
        },

        organizationService: {
          organization: {
            id: "org-1",
            name: "Helping Hands",
            website: "https://example.com",
            email: "help@example.com",
            phone: "9999999999",
          },
        },
      },

      sharedData: {
        contact: {
          name: "John",
          email: "john@example.com",
          phone: null,
        },
      },
    });

    const result = await service.execute("referral-1");

    expect(referralRepository.findById).toHaveBeenCalledWith("referral-1");

    expect(result).toEqual({
      id: "referral-1",
      status: ReferralStatus.SENT,
      createdAt,

      recommendation: {
        id: "recommendation-1",
        status: RecommendationStatus.APPROVED,
        score: 1,
        reason: "Service available",
      },

      service: {
        id: "service-1",
        code: "FOOD",
        name: "Food Assistance",
      },

      organization: {
        id: "org-1",
        name: "Helping Hands",
        website: "https://example.com",
        email: "help@example.com",
        phone: "9999999999",
      },

      sharedData: {
        contact: {
          name: "John",
          email: "john@example.com",
          phone: null,
        },
      },
    });
  });

  it("throws when the referral does not exist", async () => {
    referralRepository.findById.mockResolvedValue(null);

    await expect(service.execute("referral-1")).rejects.toThrow(NotFoundError);
  });
});
