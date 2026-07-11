import { describe, expect, it } from "vitest";

import { RecommendationEngine } from "../../../../src/domain/recommendation/RecommendationEngine";
import { RecommendationInput } from "../../../../src/domain/recommendation/RecommendationInput";

describe("RecommendationEngine", () => {
  const engine = new RecommendationEngine();

  it("generates one recommendation for each input", () => {
    // Arrange
    const inputs = [
      {
        organizationServiceId: "org-service-1",
        serviceId: "service-1",
      },
      {
        organizationServiceId: "org-service-2",
        serviceId: "service-2",
      },
    ];

    // Act
    const recommendations = engine.generate(inputs);

    // Assert
    expect(recommendations).toHaveLength(inputs.length);
  });

  it("preserves the organization service identifier", () => {
    // Arrange
    const inputs = [
      {
        organizationServiceId: "organization-service-123",
        serviceId: "service-456",
      },
    ];

    // Act
    const recommendations = engine.generate(inputs);

    // Assert
    expect(recommendations[0].organizationServiceId).toBe(
      inputs[0].organizationServiceId,
    );
  });

  it("preserves the service identifier", () => {
    // Arrange
    const inputs = [
      {
        organizationServiceId: "organization-service-123",
        serviceId: "service-456",
      },
    ];

    // Act
    const recommendations = engine.generate(inputs);

    // Assert
    expect(recommendations[0].serviceId).toBe(inputs[0].serviceId);
  });

  it("assigns the default recommendation score", () => {
    // Arrange
    const inputs = [
      {
        organizationServiceId: "organization-service-123",
        serviceId: "service-456",
      },
    ];

    // Act
    const recommendations = engine.generate(inputs);

    // Assert
    expect(recommendations[0].score).toBe(1);
  });

  it("assigns the default recommendation reason", () => {
    // Arrange
    const inputs = [
      {
        organizationServiceId: "organization-service-123",
        serviceId: "service-456",
      },
    ];

    // Act
    const recommendations = engine.generate(inputs);

    // Assert
    expect(recommendations[0].reason).toBe("Service available");
  });

  it("returns an empty array when no inputs are provided", () => {
    // Arrange
    const inputs: RecommendationInput[] = [];

    // Act
    const recommendations = engine.generate(inputs);

    // Assert
    expect(recommendations).toEqual([]);
  });
});
