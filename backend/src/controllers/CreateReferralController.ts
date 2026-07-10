import { Request, Response } from "express";

import { CreateReferralService } from "../services/CreateReferralService";

import { CreateReferralInput } from "../validation/createReferral.schema";

export class CreateReferralController {
  constructor(private readonly createReferralService: CreateReferralService) {}

  async handle(
    req: Request,
    res: Response,
  ) {
    const recommendationId = req.params.id;

    if (typeof recommendationId !== "string") {
      throw new Error("Invalid recommendation id.");
    }

    const input = req.body as CreateReferralInput;

    const result = await this.createReferralService.execute(
      recommendationId,
      input,
    );

    return res.status(201).json({
      status: "success",
      data: result,
    });
  }
}
