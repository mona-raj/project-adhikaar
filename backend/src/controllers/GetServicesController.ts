import { Request, Response } from "express";

import { GetServicesService } from "../services/GetServicesService";

export class GetServicesController {
  constructor(private readonly getServicesService: GetServicesService) {}

  async handle(_req: Request, res: Response) {
    const result = await this.getServicesService.execute();

    return res.status(200).json({
      status: "success",
      data: result,
    });
  }
}
