import express from "express";
import SearchController from "@gsc/server/controllers/search_controller";
import AuthRoutes from "@gsc/server/routes/auth_routes";

const router = express.Router();

router.get("/google", SearchController.searchForKeyword);
router.use("/auth", AuthRoutes);

export default router;
