import { ServiceRepository } from "../repositories/ServiceRepository";

import { GetServicesResponse } from "../contracts/service/getServices.contract";

export class GetServicesService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(): Promise<GetServicesResponse> {
    const services = await this.serviceRepository.findAll();

    return services.map((service) => ({
      id: service.id,
      code: service.code,
      name: service.name,
      description: service.description,
    }));
  }
}
