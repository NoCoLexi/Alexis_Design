import { Router, type IRouter } from "express";
import healthRouter from "./health";
import appRouter from "./routes";
import scoresRouter from "./scores";

const router: IRouter = Router();

router.use(healthRouter);
router.use(appRouter);
router.use(scoresRouter);

export default router;
