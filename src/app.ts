//config
require("dotenv").config();

import express from "express";
import cors from "cors";
import getClient from './db/conn';

const app = express();
const port = process.env.PORT

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
import router from './routes/router';

app.use(router)

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});