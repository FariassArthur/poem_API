// router.ts
import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

router.get("/", async (req, res) => {
  await UserController.checkAndCreateTable(req, res);
});
router.get("/all", async (req, res) => {
  await UserController.takeAllUsers(req, res);
});
router.post("/create", async (req, res) => {
  await UserController.createUser(req, res);
});
router.get("/:id", async(req, res) => {
})

export default router;
