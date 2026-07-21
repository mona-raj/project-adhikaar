import { describe, expect, it } from "vitest";

import { ReferralSharedDataBuilder } from "../../../../src/domain/referral/ReferralSharedDataBuilder";

describe("ReferralSharedDataBuilder", () => {
  const recommendation = {
    case: {
      helpRequest: {
        description: "Need financial assistance.",
        preferredLanguage: {
          code: "en",
          name: "English",
        },
      },
    },

    service: {
      code: "FINANCIAL_AID",
      name: "Financial Aid",
    },
  } as any;

  it("builds shared data when preferred language exists", () => {
    const result = ReferralSharedDataBuilder.build(recommendation, {
      contactName: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
    });

    expect(result).toEqual({
      contact: {
        name: "John Doe",
        email: "john@example.com",
        phone: "9876543210",
      },

      helpRequest: {
        description: "Need financial assistance.",
      },

      preferredLanguage: {
        code: "en",
        name: "English",
      },

      service: {
        code: "FINANCIAL_AID",
        name: "Financial Aid",
      },
    });
  });

  it("stores null when email is missing", () => {
    const result = ReferralSharedDataBuilder.build(recommendation, {
      contactName: "John Doe",
      phone: "9876543210",
    });

    expect(result.contact.email).toBeNull();
    expect(result.contact.phone).toBe("9876543210");
  });

  it("stores null when phone is missing", () => {
    const result = ReferralSharedDataBuilder.build(recommendation, {
      contactName: "John Doe",
      email: "john@example.com",
    });

    expect(result.contact.phone).toBeNull();
    expect(result.contact.email).toBe("john@example.com");
  });

  it("stores null when preferred language is absent", () => {
    const recommendationWithoutLanguage = {
      ...recommendation,

      case: {
        helpRequest: {
          description: "Need financial assistance.",
          preferredLanguage: null,
        },
      },
    } as any;

    const result = ReferralSharedDataBuilder.build(
      recommendationWithoutLanguage,
      {
        contactName: "John Doe",
        email: "john@example.com",
      },
    );

    expect(result.preferredLanguage).toBeNull();
  });
});
