const { Router, json } = require("express");
const loginrouter = Router();
require("dotenv").config();
const secretkey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { usermodel } = require("../models/UserModel");

loginrouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const userdata = await usermodel.findOne({ email });
  const hash_password = userdata && userdata.password;
  // res.send(hash_password);
  // console.log(hash_password, password);
  bcrypt.compare(password, hash_password, async (err, result) => {
    if (result) {
      let token = await jwt.sign({ userdata }, secretkey, { expiresIn: "5m" });
      console.log(userdata);
      console.log(token);
      return res.send({ token: token });
    }
    // res.send({ msg: "please enter correct email and password" });
    res.status(401).send("please enter correct password");
    // throw new Error("Plase enter correct password or email");
  });
});
module.exports = { loginrouter };
