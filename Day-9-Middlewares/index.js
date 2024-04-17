import express from "express";
import morgan from "morgan";
import allRoutes from "./routes/index.js";
import { isValidToken } from "./middlewares/user.middlewares.js";
const app = express();

app.use(express.json());

app.use(morgan("combined"));

// app.use(isValidToken);

// app.use((req, res, next) => {
//   const { isCompletedAssignment } = req.body;
// //   console.log(isCompletedAssignment, "isCompletedAssignment");
//   if (isCompletedAssignment === "true") {
//     next();
//   } else {
//     res.send("Please complete the assignment.");
//   }
// });

app.use((error, req, res, next) => {
  if (error) {
    res.send(error);
  } else {
    next();
  }
});

app.post("/", isValidToken, (req, res) => {
  res.send("Working..");
});

app.post("/hello", (req, res) => {
  res.send("Heello.");
});

app.use("/api/v1", allRoutes);

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
