import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const user = await User.findOne({
      _id: decoded.id,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Incorrect authorization' });
  }
};

export const adminAuthMiddleware = async (req, res, next) => {
  try {
    await authMiddleware(req, res, async () => {
      if (req.user.isSuperUser) {
        next();
      } else {
        res.status(401).send({ error: 'Incorrect authorization' });
      }
    });
  } catch (e) {
    res.status(401).send({ error: 'Incorrect authorization' });
  }
};
