// router.ts
import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

router.get("/", UserController.checkAndCreateTable);

export default router;
