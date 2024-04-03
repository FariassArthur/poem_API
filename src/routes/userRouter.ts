// router.ts
import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

router.get("/", async (req, res) => {
  await UserController.checkAndCreateTable(req, res);
});

export default router;
