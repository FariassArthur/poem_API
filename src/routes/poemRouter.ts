// router.ts
import express from "express";
import PoemController from "../controllers/poemController";
import { authenticateJWT } from "../middlewares/AuthJwt";

const router = express.Router();

router.get("/", async (req, res) => {
  await PoemController.checkAndCreateTablePoem(req, res);
});

router.post("/create", authenticateJWT, async (req, res) => {
  await PoemController.poemCreate(req, res);
});

router.get("/poemuser", authenticateJWT, async (req, res) => {
  await PoemController.takeUserPoems(req, res);
})

export default router;
