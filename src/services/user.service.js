import User from '../models/user.model';
import { hashPassword, verifyPassword } from './hashPassword';
import { sendResetMail } from '../utils/user.util';

//create new user
export const createUser = async (body) => {
  let data = await User.findOne({ email: body.email });
  if (data) {
    throw new Error('User already Exists');
  }
  const hashedPassword = await hashPassword(body.password);
  body.password = hashedPassword;
  data = await User.create(body);
  return data;
};

const jwt = require('jsonwebtoken');

//User Sign-In
export const logIn = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (!data) {
    throw new Error('User not Found');
  }
  const result = await verifyPassword(body.password, data.password);
  if (!result) {
    throw new Error('Password Mismatch.');
  }
  const payload = { UserID: data._id };

  // const expiresIn = "1h";
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
};

export const forgotPassword = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (!data) {
    throw new Error('User not Found');
  }
  const token = jwt.sign(
    { email: body.email },
    process.env.FORGOT_PASSWORD_KEY
  );
  sendResetMail(body.email, token);
  return token;
};

export const resetPassword = async (body) => {
  const hashedPassword = await hashPassword(body.password);
  body.password = hashedPassword;
  const pwd = await User.findOneAndUpdate(
    {
      email: body.email
    },
    body,
    {
      new: true
    }
  );
  return pwd;
};

export const authenticateToken = (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  try {
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    res.json({ message: 'Token Veification Successfull', decoded });
    return decoded;
  } catch (error) {
    throw new Error(error);
  }
};
