import { Router } from "express";

import healthRoutes from "./health.routes";
import helpRequestRoutes from "./helpRequest.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/help-requests", helpRequestRoutes);

export default router;
