import express from "express";
import AuthRoutes from "@gsc/server/routes/auth_routes";
import SearchRoutes from "@gsc/server/routes/search_routes";
import { jwtVerifyMiddleware } from "@gsc/server/routes/auth_middleware";

const router = express.Router();

router.use("/auth", AuthRoutes);

router.use("/search", jwtVerifyMiddleware, SearchRoutes);

export default router;
