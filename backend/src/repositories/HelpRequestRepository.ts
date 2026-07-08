import { Prisma, PrismaClient } from "../generated/prisma/client";
import { CreateHelpRequestInput } from "../validation/helpRequest.schema";

export class HelpRequestRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateHelpRequestInput) {
    const { preferredLanguageCode, ...helpRequestData } = data;

    const createData: Prisma.HelpRequestCreateInput = {
      ...helpRequestData,

      ...(preferredLanguageCode
        ? {
            preferredLanguage: {
              connect: {
                code: preferredLanguageCode,
              },
            },
          }
        : {}),
    };

    return this.prisma.helpRequest.create({
      data: createData,
    });
  }

  async findById(id: string) {
    return this.prisma.helpRequest.findUnique({
      where: {
        id,
      },
    });
  }

  async findWithCase(id: string) {
    return this.prisma.helpRequest.findUnique({
      where: {
        id,
      },
      include: {
        case: true,
      },
    });
  }
}
