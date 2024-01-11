import User from '../models/user.model';
import {hashPassword, verifyPassword} from './hashPassword';

const jwt = require('jsonwebtoken');
const secretKey = 'secretKey';


//User Sign-In
export const logIn = async (body) => {
  const data = await User.findOne({email:body.email});
  if(!data){
    throw new Error("User not Found");
  }    const result = await verifyPassword(body.password, data.password);
  if(!result){
    throw new Error("Password Mismatch.")
  }
  const payload = { email:body.email };
  return jwt.sign(payload, secretKey);
  // return data;
};


//create new user
export const createUser = async (body) => {
  let data = await User.findOne({email:body.email});
  if(data){
    throw new Error("User already Exists")
  }
  const hashedPassword = await hashPassword(body.password);
  body.password = hashedPassword;
  data = await User.create(body);
  return data;
};