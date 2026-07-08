import { Request, Response } from "express";

import { CreateHelpRequestService } from "../services/CreateHelpRequestService";
import { CreateHelpRequestInput } from "../validation/helpRequest.schema";

export class CreateHelpRequestController {
  constructor(
    private readonly createHelpRequestService: CreateHelpRequestService,
  ) {}

  async handle(req: Request, res: Response) {
    const data = req.body as CreateHelpRequestInput;

    const result = await this.createHelpRequestService.execute(data);

    return res.status(201).json({
      status: "success",
      data: result,
    });
  }
}
