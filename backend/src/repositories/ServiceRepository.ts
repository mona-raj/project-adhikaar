import { PrismaClient } from "../generated/prisma/client";

export class ServiceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByCode(code: string) {
    return this.prisma.service.findUnique({
      where: {
        code,
      },
    });
  }

  async findManyByCodes(codes: string[]) {
    return this.prisma.service.findMany({
      where: {
        code: {
          in: codes,
        },
      },
    });
  }

  async findAll() {
    return this.prisma.service.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async findManyByIds(ids: string[]) {
    return this.prisma.service.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
