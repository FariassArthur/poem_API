require("dotenv").config();

import express from "express";
import cors from "cors";
import pool from "./db/conn";

const app = express();
const port = process.env.PORT;

app.use(cors());
/* // Cors = configura as requisições por fora que são aceitas
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}; */


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
