import { PrismaClient } from "../generated/prisma/client";

import { HelpRequestRepository } from "../repositories/HelpRequestRepository";
import { CaseRepository } from "../repositories/CaseRepository";

import { CreateHelpRequestInput } from "../validation/helpRequest.schema";

export class CreateHelpRequestService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(data: CreateHelpRequestInput) {
    return this.prisma.$transaction(async (tx) => {
      const helpRequestRepository = new HelpRequestRepository(tx);
      const caseRepository = new CaseRepository(tx);

      const helpRequest = await helpRequestRepository.create(data);

      const caseEntity = await caseRepository.create(helpRequest.id);

      return {
        helpRequestId: helpRequest.id,
        caseId: caseEntity.id,
        status: caseEntity.status,
      };
    });
  }
}
