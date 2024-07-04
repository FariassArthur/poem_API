// router.ts
import express from "express";
import PoemController from "../controllers/poemController";
import { authenticateJWT } from "../middlewares/AuthJwt";

const router = express.Router();

router.post("/", async (req, res) => {
  await PoemController.checkAndCreateTablePoem(req, res);
});

router.post("/likes", async (req, res) => {
  await PoemController.checkAndCreateTableLikes(req, res)
})

router.post("/create", authenticateJWT, async (req, res) => {
  await PoemController.poemCreate(req, res);
});

router.get("/takepoems", async (req, res) => {
  await PoemController.takePoems(req, res)
})

router.get("/poemuser", authenticateJWT, async (req, res) => {
  await PoemController.takeUserPoems(req, res);
});

router.get("/delete/:id", authenticateJWT, async (req, res) => {
  await PoemController.deletePoem(req, res);
});

router.get("/:id", async (req, res) => {
  await PoemController.takePoemId(req, res);
}); //pegar poema por id

router.post("/update/:id", authenticateJWT, async (req, res) => {
  await PoemController.updatePoem(req, res);
});

router.post("/like/:id", authenticateJWT, async (req, res) => {
  await PoemController.likePoem(req, res);
});

router.get("/likes/:id", async (req, res) => {
  await PoemController.numberOfLikes(req, res);
});

export default router;
