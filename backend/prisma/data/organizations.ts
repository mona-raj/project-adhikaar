import { GenderEligibility } from "../../src/generated/prisma/enums";

export const organizations = [
  {
    name: "Sakhi Women's Support Centre",
    description: "Emergency shelter and crisis support for women.",
    website: "https://example.org",
    email: "contact@example.org",
    phone: "+91-9876543210",

    services: [
      {
        serviceCode: "EMERGENCY_SHELTER",
        isActive: true,
        genderEligibility: GenderEligibility.ANY,
        languages: ["en"],
      },
    ],
  },
  {
    name: "Legal Centre",
    description: "Emergency shelter and crisis support for women.",
    website: "https://example.org",
    email: "contact@example.org",
    phone: "+91-9876543210",

    services: [
      {
        serviceCode: "LEGAL_ASSISTANCE",
        isActive: true,
        genderEligibility: GenderEligibility.ANY,
        languages: ["en"],
      },
    ],
  },
];
