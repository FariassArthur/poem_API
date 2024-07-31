"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.ts
const express_1 = __importDefault(require("express"));
const poemController_1 = __importDefault(require("../controllers/poemController"));
const AuthJwt_1 = require("../middlewares/AuthJwt");
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield poemController_1.default.checkAndCreateTablePoem(req, res);
}));
router.post("/likes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield poemController_1.default.checkAndCreateTableLikes(req, res);
}));
router.post("/create", AuthJwt_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield poemController_1.default.poemCreate(req, res);
}));
router.get("/takepoems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield poemController_1.default.takePoems(req, res);
}));
router.get("/poemuser", AuthJwt_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield poemController_1.default.takeUserPoems(req, res);
}));
router.delete("/delete/:id", AuthJwt_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield poemController_1.default.deletePoem(req, res);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield poemController_1.default.takePoemId(req, res);
})); //pegar poema por id
router.patch("/update/:id", AuthJwt_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield poemController_1.default.updatePoem(req, res);
}));
router.post("/like/:id", AuthJwt_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield poemController_1.default.likePoem(req, res);
}));
router.get("/likes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield poemController_1.default.numberOfLikes(req, res);
}));
exports.default = router;
