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
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const AuthJwt_1 = require("../middlewares/AuthJwt");
const router = express_1.default.Router();
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController_1.default.takeAllUsers(req, res);
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController_1.default.userLogin(req, res);
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController_1.default.createUser(req, res);
}));
router.post("/delete", AuthJwt_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController_1.default.userDelete(req, res);
}));
// Use a interface AuthMiddleware para tipar o middleware
router.post("/update", AuthJwt_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController_1.default.userAtt(req, res);
}));
router.get("/id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController_1.default.takeId(req, res);
}));
router.get("/profile", AuthJwt_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController_1.default.takeUser(req, res);
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController_1.default.checkAndCreateTable(req, res);
}));
exports.default = router;
