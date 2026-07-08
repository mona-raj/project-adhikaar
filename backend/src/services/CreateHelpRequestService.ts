import { PrismaClient } from "../generated/prisma/client";

import { HelpRequestRepository } from "../repositories/HelpRequestRepository";
import { CaseRepository } from "../repositories/CaseRepository";

import { CreateHelpRequestInput } from "../validation/helpRequest.schema";
import { ProcessCaseService } from "./ProcessCaseService";

export class CreateHelpRequestService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly processCaseService: ProcessCaseService,
  ) {}

  async execute(data: CreateHelpRequestInput) {
    const result = await this.prisma.$transaction(async (tx) => {
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

    await this.processCaseService.execute(result.caseId);

    return result;
  }
}
