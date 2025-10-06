import express from "express";
import userRoutes from "./routes/userRoutes.js"
import tareaRoutes from "./routes/tareaRoutes.js"
import etiquetaRoutes from "./routes/etiquetaRoutes.js"

import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

app.use("/", userRoutes);
app.use("/", tareaRoutes);
app.use("/", etiquetaRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));