const express = require("express");
const cors = require("cors");
const { UserRouter } = require("./Routes/userRouter.js");
const { TaskRouter } = require("./Routes/taskRouter.js");

const { dbConnect } = require("./dbConnection.js");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://64cdf1a9a3461a161547e959--splendid-torrone-a3b3c6.netlify.app",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
require("dotenv").config();
app.use(bodyParser.json());

app.use("/user", UserRouter);
app.use("/tasks", TaskRouter);

app.listen(process.env.PORT, async () => {
  await dbConnect();
});
