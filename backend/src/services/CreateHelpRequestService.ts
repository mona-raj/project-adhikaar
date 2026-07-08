import { HelpRequestRepository } from "../repositories/HelpRequestRepository";
import { CreateHelpRequestInput } from "../validation/helpRequest.schema";

export class CreateHelpRequestService {
  constructor(private readonly helpRequestRepository: HelpRequestRepository) {}

  async execute(input: CreateHelpRequestInput) {
    return this.helpRequestRepository.create(input);
  }
}
