import express from "express";
import SearchController, {
  validate as SearchControllerValidator,
} from "@gsc/server/controllers/search_controller";

const router = express.Router();

router.get("/report", SearchController.getKeywordReports);

router.get(
  "/report/:reportId",
  SearchControllerValidator("getKeywordDetail"),
  SearchController.getKeywordDetail
);

router.post(
  "/google",
  SearchControllerValidator("searchForKeyword"),
  SearchController.searchForKeyword
);

export default router;
