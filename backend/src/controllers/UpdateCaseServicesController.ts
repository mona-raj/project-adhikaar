import { Request, Response } from "express";

import { UpdateCaseServicesService } from "../services/UpdateCaseServicesService";
import { UpdateCaseServicesInput } from "../validation/updateCaseServices.schema";

export class UpdateCaseServicesController {
  constructor(
    private readonly updateCaseServicesService: UpdateCaseServicesService,
  ) {}

  async handle(req: Request, res: Response) {
    const caseId = req.params.id;

    if (typeof caseId !== "string") {
      throw new Error("Invalid case id.");
    }

    const input = req.body as UpdateCaseServicesInput;

    const result = await this.updateCaseServicesService.execute(caseId, input);

    return res.status(200).json({
      status: "success",
      data: result,
    });
  }
}
