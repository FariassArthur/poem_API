//config
require("dotenv").config();

import express from "express";
import cors from "cors";
import pool from "./db/conn";

const app = express();
const port = process.env.PORT;

//config JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors = configura as requisições por fora que são aceitas
const corsOptions = {
  origin: "http://localhost:5173", // Permitir requisições apenas do frontend em http://localhost:5173
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

//routes
import userRoutes from "./routes/userRouter";
import poemRoutes from "./routes/poemRouter"

app.use("/users", userRoutes);
app.use("/poems", poemRoutes)

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
