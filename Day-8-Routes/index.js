import express from "express";
import AllRoutes from "./routes/index.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working..");
});

app.use("/api/v1", AllRoutes);

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
