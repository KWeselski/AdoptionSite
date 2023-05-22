import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_EXPIRATION = 60 * 60;

const createUser = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT_KEY);

    res.send({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
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

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_JWT_KEY, {
      expiresIn: TOKEN_EXPIRATION,
    });

    req.session.userId = user._id;

    res.status(201).json({
      token,
      isSuperUser: user.isSuperUser,
      expiresIn: TOKEN_EXPIRATION,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to login user' });
  }
};

export { createUser, loginUser };
