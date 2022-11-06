const { Router, response } = require("express");
require("dotenv").config();
const secretkey = process.env.SECRET_KEY;
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { authentication } = require("../middleware/authentication");
const { UserdataModel } = require("../models/Userdata.model");
const { usermodel } = require("../models/UserModel");
userRouter.get("/profile", authentication, async (req, res) => {
  const id = req.body?.user_id;
  console.log("id is ", id);
  const userdata = await usermodel.findOne({ _id: id });
  console.log("userdata", userdata);
  res.send({ data: userdata });
  // const token =
  //   req.headers.authorization && req.headers.authorization.split(" ")[1];
  // console.log(req.body);
  // //   res.send(token);
  // if (token) {
  //   jwt.verify(token, secretkey, async (err, decoded) => {
  //     if (decoded) {
  //       console.log(decoded);
  //       return res.send(decoded.userdata._id);
  //     }
  //     res.send("please go first login !");
  //   });
  // } else {
  //   res.send("something went wrong");
  // }
});
userRouter.get("/crud", authentication, async (req, res) => {
  // res.send(req.body);
  let id = req.body?.user_id;
  if (id) {
    let finddata = await UserdataModel.find({ uniqueid: id });
    return res.send({ data: finddata });
  }
  res.send("what do you want");
});
userRouter.post("/crud", authentication, async (req, res) => {
  const { title, user_id } = req?.body;
  console.log("user_id in post", user_id);
  let newdata = await UserdataModel({
    uniqueid: user_id,
    title,
    status: false,
  });
  try {
    await newdata.save();
    return res.send({ msg: "data added successfully" });
  } catch (err) {
    return res.send(err.message);
  }

  // res.send("added successfully!");
});
userRouter.delete("/crud/:id", authentication, async (req, res) => {
  const { id } = req.params;
  try {
    await UserdataModel.findOneAndDelete({ _id: id });
    return res.send({ msg: "deleted" });
  } catch (err) {
    res.status(401).send({ error: err.message });
  }

  res.send(id);
});
module.exports = { userRouter };
