import { Request, Response } from "express";

import { CreateHelpRequestService } from "../services/CreateHelpRequestService";

export class CreateHelpRequestController {
  constructor(
    private readonly createHelpRequestService: CreateHelpRequestService,
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const helpRequest = await this.createHelpRequestService.execute(req.body);

    res.status(201).json({
      status: "success",
      data: {
        id: helpRequest.id,
      },
    });
  }
}
