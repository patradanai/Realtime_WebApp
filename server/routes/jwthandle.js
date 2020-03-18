const jwt = require("jsonwebtoken");

const secretKey = "PRODUCTIONREALTIME";

// Set Expiration Date
const getToKen = json => {
  // Need to put object
  return (token = jwt.sign({ uid: json }, secretKey, {
    expiresIn: 8640000
  }));
};

const verifyToken = token => {
  let message;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      message = err;
    } else {
      message = decoded;
    }
  });
  return message;
};

module.exports = { verifyToken, getToKen };

// const verifyToken = (req, res, next) => {
//   console.log("Verify Token :" + JSON.stringify(req.headers));
//   const token = req.headers["x-access-token"];

//   if (!token) {
//     return res.status(401).send({ auth: false, message: "No TOken Provided" });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res
//         .status(401)
//         .send({ auth: true, message: "Failed to Authenicated" });
//     }

//     req.userId = decoded.id;
//     next();
//   });
// };
