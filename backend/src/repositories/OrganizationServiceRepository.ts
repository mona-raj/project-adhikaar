import { Prisma, PrismaClient } from "../generated/prisma/client";

export class OrganizationServiceRepository {
  constructor(
    private readonly prisma: PrismaClient | Prisma.TransactionClient,
  ) {}

  async findActiveByServiceIds(serviceIds: string[]) {
    return this.prisma.organizationService.findMany({
      where: {
        isActive: true,
        serviceId: {
          in: serviceIds,
        },
      },
      include: {
        organization: true,
        service: true,
        languages: true,
      },
    });
  }
}
