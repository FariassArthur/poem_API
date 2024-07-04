require("dotenv").config();

import express from "express";
import cors from "cors";
import pool from "./db/conn";

const app = express();
const port = process.env.PORT;

// Cors = configura as requisições por fora que são aceitas
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
import userRoutes from "./routes/userRouter";
import poemRoutes from "./routes/poemRouter";

app.use("/users", userRoutes);
app.use("/poems", poemRoutes);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
