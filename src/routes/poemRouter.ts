// router.ts
import express from "express";
import PoemController from "../controllers/poemController";

const router = express.Router();

router.get("/", async (req, res) => {
  await PoemController.checkAndCreateTablePoem(req, res);
});

router.post("/create", async (req, res) => {
  await PoemController.poemCreate(req, res)
})

export default router;
