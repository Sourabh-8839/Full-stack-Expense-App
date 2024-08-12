const bcrypt = require('bcrypt');
const User = require('../models/userData');

const jwt = require('jsonwebtoken');

require('dotenv').config();

function isStringVaild(string) {
  if (string == undefined || string.length == 0) {
    return true;
  } else {
    return false;
  }
}

function generateAccessToken(id, isPremiumUser) {
  return jwt.sign(
    {
      _id: id,
      isPremiumUser: isPremiumUser,
    },
    process.env.ACCESS_TOKEN_SECRETKEY,

    { expiresIn: process.env.ACCESS_TOKEN_TIME_DURATION }
  );
}

const addUser = async (req, res) => {
  try {
    const { Name, email, password } = req.body;

    // console.log(Name, email, password);

    const check = await User.find({ email: email });

    console.log(check);

    if (check.length === 1) {
      return res.status(409).json({ msg: 'User is already Exist ' });
    }

    if (
      isStringVaild(Name) ||
      isStringVaild(email) ||
      isStringVaild(password)
    ) {
      return res
        .status(400)
        .json({ error: 'Bad Request , Something is missing' });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      const p = await User.create({
        Name: Name,
        email: email,
        password: hash,
      });

      res.status(200).json({ message: 'Successfully Registerd' });
    });
  } catch (error) {
    res.status(403).json({ success: false, msg: error.message });
  }
};

const loginUser = async (req, res) => {
  // console.log(req.body);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
          throw new Error('Something Went Wrong');
        }

        if (result === true) {
          // console.log(user[0].isPremiumUser);

          const token = generateAccessToken(user._id, user.isPremiumUser);

          const loginUser = await User.findById(user._id).select('-password');

          return res.status(200).json({
            msg: 'succesfully Login',
            user: loginUser,
            token: token,
          });
        } else {
          return res.status(401).json({ msg: 'Incorrect Password' });
        }
      });
    } else {
      return res.status(404).json({ msg: 'User does not exist' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message, success: false });
  }
};

module.exports = {
  loginUser,
  addUser,
};
