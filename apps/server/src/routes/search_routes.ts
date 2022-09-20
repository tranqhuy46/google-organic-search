import express from "express";
import SearchController from "@gsc/server/controllers/search_controller";

const router = express.Router();

router.post("/google", SearchController.searchForKeyword);

export default router;