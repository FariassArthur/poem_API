// router.ts
import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

router.get("/all", async (req, res) => {
  await UserController.takeAllUsers(req, res);
});
router.get("/login", async (req, res) => {
  await  UserController.userLogin(req, res)
})
router.post("/create", async (req, res) => {
  await UserController.createUser(req, res);
});
router.post("/update", async (req, res) => {
  await UserController.userAtt(req, res)
});
router.get("/id", async (req, res) => {
  await UserController.takeId(req, res);
});
router.get("/:id", async (req, res) => {
  await UserController.takeUser(req, res);
});
router.get("/", async (req, res) => {
  await UserController.checkAndCreateTable(req, res);
});

export default router;
