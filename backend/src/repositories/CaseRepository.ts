import { Prisma, PrismaClient } from "../generated/prisma/client";

export class CaseRepository {
  constructor(
    private readonly prisma: PrismaClient | Prisma.TransactionClient,
  ) {}

  async create(helpRequestId: string) {
    return this.prisma.case.create({
      data: {
        helpRequest: {
          connect: {
            id: helpRequestId,
          },
        },
      },
    });
  }
}
