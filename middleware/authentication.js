const jwt = require("jsonwebtoken");
require("dotenv").config();
const authentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    console.log("token is not available");
    res.send({ msg: "please login !" });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        console.log(decoded);
        const user_id = decoded.userdata._id;
        req.body.user_id = user_id;
        return next();
      } else {
        // res.send({ msg: "Please login again" });
        res.status(401).send("Please login first");
        // throw new Error("Please login again");
      }
    });
  }
};
module.exports = { authentication };
