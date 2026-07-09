import { Request, Response } from "express";

import { GetCaseService } from "../services/GetCaseService";

export class GetCaseController {
  constructor(private readonly getCaseService: GetCaseService) {}

  async handle(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      throw new Error("Missing case id.");
    }

    if (typeof id !== "string") {
      throw new Error("Invalid case id.");
    }

    const result = await this.getCaseService.execute(id);

    return res.status(200).json({
      status: "success",
      data: result,
    });
  }
}
