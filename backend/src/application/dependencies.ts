import { prisma } from "../database/prisma";

import { ServiceRepository } from "../repositories/ServiceRepository";

import { GetServicesService } from "../services/GetServicesService";

import { GetServicesController } from "../controllers/GetServicesController";

const serviceRepository = new ServiceRepository(prisma);

const getServicesService = new GetServicesService(serviceRepository);

const getServicesController = new GetServicesController(getServicesService);

export const dependencies = {
  controllers: {
    getServicesController,
  },
};
