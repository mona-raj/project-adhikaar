import { Request, Response } from "express";

import { GetReferralService } from "../services/GetReferralService";

export class GetReferralController {
  constructor(private readonly getReferralService: GetReferralService) {}

  async handle(req: Request, res: Response) {
    const referralId = req.params.id;

    if (typeof referralId !== "string") {
      throw new Error("Invalid referral id.");
    }

    const result = await this.getReferralService.execute(referralId);

    return res.status(200).json({
      status: "success",
      data: result,
    });
  }
}
