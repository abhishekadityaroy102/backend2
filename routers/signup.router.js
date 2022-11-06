const { Router } = require("express");
const bcrypt = require("bcrypt");
const { usermodel } = require("../models/UserModel");
const signuprouter = Router();

signuprouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const isuser = await usermodel.findOne({ email });
  if (isuser) {
    return res.status(401).send({ msg: "user exist please try another gmail" });
    // console.log(isuser);
    // return res.send({ msg: "user exist please try again with new email" });
  }
  //   console.log(isuser);
  //   res.send(isuser);
  bcrypt.hash(password, 4, async (err, hash) => {
    if (err) {
      res.status(401).send({ msg: "something went wrong" });
    }
    const newuser = await usermodel({
      name,
      email,
      password: hash,
    });

    try {
      await newuser.save();
      res.send({ msg: "signup successful! " });
    } catch (err) {
      res.status(401).send({ msg: "something went wrong,please login again" });
    }
  });
});
module.exports = { signuprouter };
