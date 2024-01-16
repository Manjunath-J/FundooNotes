import User from '../models/user.model';
import Note from '../models/note.model';
import {hashPassword, verifyPassword} from './hashPassword';


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

const jwt = require('jsonwebtoken');
const secretKey = 'mySecretKey';

//User Sign-In
export const logIn = async (body) => {
  const data = await User.findOne({email:body.email});
  if(!data){
    throw new Error("User not Found");
  }    
  const result = await verifyPassword(body.password, data.password);
  if(!result){
    throw new Error("Password Mismatch.")
  }
  const payload = { email:body.email };
  
  // const expiresIn = "1h";
  const token = jwt.sign(payload, secretKey);
  
  return token;
};


export const authenticateToken = (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  try {
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    res.json({ message: "Token Veification Successfull",decoded });
    return decoded;
  } 
  
  catch (error) {
    throw new Error(error);
  }

};
