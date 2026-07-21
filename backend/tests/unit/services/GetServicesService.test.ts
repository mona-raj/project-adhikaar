import { beforeEach, describe, expect, it, vi } from "vitest";

import { GetServicesService } from "../../../src/services/GetServicesService";
import { ServiceRepository } from "../../../src/repositories/ServiceRepository";

describe("GetServicesService", () => {
  let serviceRepository: {
    findAll: ReturnType<typeof vi.fn>;
  };

  let service: GetServicesService;

  beforeEach(() => {
    serviceRepository = {
      findAll: vi.fn(),
    };

    service = new GetServicesService(
      serviceRepository as unknown as ServiceRepository,
    );
  });

  it("returns all services", async () => {
    serviceRepository.findAll.mockResolvedValue([
      {
        id: "service-1",
        code: "FOOD",
        name: "Food Assistance",
        description: "Food support",
      },
      {
        id: "service-2",
        code: "SHELTER",
        name: "Shelter",
        description: "Temporary housing",
      },
    ]);

    const result = await service.execute();

    expect(serviceRepository.findAll).toHaveBeenCalledTimes(1);

    expect(result).toEqual([
      {
        id: "service-1",
        code: "FOOD",
        name: "Food Assistance",
        description: "Food support",
      },
      {
        id: "service-2",
        code: "SHELTER",
        name: "Shelter",
        description: "Temporary housing",
      },
    ]);
  });
});
