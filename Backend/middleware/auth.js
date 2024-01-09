const jwt = require('jsonwebtoken');
const Users = require('../models/userData');

require('dotenv').config();

const authentication = async (req, res, next) => {
  try {
    const token = req.header('authorization');

    const userData = await jwt.verify(token, process.env.JWT_SECRETKEY);

    const userId = userData.userId;

    const user = await Users.findById(userId);

    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({ success: false });
  }
};

const checkUserIdentiy = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const userData = await jwt.verify(userId, process.env.JWT_SECRETKEY);

    const userID = userData.userId;

    // console.log(userID);
    req.body.userId = userID;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  authentication,
  checkUserIdentiy,
};
