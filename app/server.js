import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use((express.json)());

app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
