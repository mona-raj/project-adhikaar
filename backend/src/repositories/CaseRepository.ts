import { Prisma, PrismaClient } from "../generated/prisma/client";
import { SafetyStatus } from "../generated/prisma/enums";

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

  async findById(id: string) {
    return this.prisma.case.findUnique({
      where: {
        id,
      },
    });
  }

  async findByIdWithRelations(id: string) {
    return this.prisma.case.findUnique({
      where: {
        id,
      },
      include: {
        helpRequest: {
          include: {
            preferredLanguage: true,
          },
        },
        services: {
          orderBy: {
            name: "asc",
          },
        },
        recommendations: {
          orderBy: {
            score: "desc",
          },
          include: {
            service: true,
            organizationService: {
              include: {
                organization: true,
              },
            },
          },
        },
      },
    });
  }

  async updateEvaluatedSafetyStatus(id: string, status: SafetyStatus) {
    return this.prisma.case.update({
      where: {
        id,
      },
      data: {
        evaluatedSafetyStatus: status,
        evaluatedAt: new Date(),
      },
    });
  }

  async updateServices(caseId: string, serviceIds: string[]) {
    return this.prisma.case.update({
      where: {
        id: caseId,
      },
      data: {
        services: {
          set: [],
          connect: serviceIds.map((id) => ({ id })),
        },
      },
    });
  }
}
