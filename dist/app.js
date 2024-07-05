"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT;
// Cors = configura as requisições por fora que são aceitas
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)());
/* // Middleware para adicionar cabeçalhos CORS a todas as respostas
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
}); */
//config JSON
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//routes
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const poemRouter_1 = __importDefault(require("./routes/poemRouter"));
app.use("/users", userRouter_1.default);
app.use("/poems", poemRouter_1.default);
app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
