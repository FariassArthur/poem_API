"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//config
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT;
//config JSON
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Cors = configura as requisições por fora que são aceitas
const corsOptions = {
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
//routes
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const poemRouter_1 = __importDefault(require("./routes/poemRouter"));
app.use("/users", userRouter_1.default);
app.use("/poems", poemRouter_1.default);
app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
