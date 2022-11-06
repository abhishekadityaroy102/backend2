const { response } = require("express");
const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { loginrouter } = require("./routers/login.router");
const { signuprouter } = require("./routers/signup.router");
const { userRouter } = require("./routers/user.router");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/login", loginrouter);
app.use("/signup", signuprouter);
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("WELCOME");
});
app.listen(8080, async () => {
  try {
    await connection;
    console.log("database connected successfully");
  } catch {
    console.log("DATABASE NOT CONNECTED");
  }
  console.log("porting on 8080");
});
