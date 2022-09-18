import express from "express";
import AuthController, {
  validate as AuthControllerValidate,
} from "@gsc/server/controllers/auth_controller";

const router = express.Router();

router.post("/signin", AuthControllerValidate("signin"), AuthController.signin);
router.post("/signup", AuthControllerValidate("signup"), AuthController.signup);

export default router;
