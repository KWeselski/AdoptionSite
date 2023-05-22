import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

dotenv.config();
const TOKEN_EXPIRATION = 60 * 60;

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const createUser = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      isSuperUser: req.body.isSuperUser,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT_KEY);

    res.send({ token });
  } catch (err) {
    res.status(400).json({ error: 'Unable to create user' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT_KEY, {
      expiresIn: TOKEN_EXPIRATION,
    });

    res.status(201).json({
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};

const checkRole = (req, res) => {
  const { isSuperUser } = req.user;
  return res.status(200).json({ isSuperUser: isSuperUser });
};

export { checkRole, createUser, loginUser };
