import User from '../models/user.model';


//User Sign-In
export const logIn = async (body) => {
  const data = await User.findOne({email:body.email});
  if(!data){
    throw new Error("User not Found");
  }
  else if(body.password!=data.password){
    throw new Error("Password Mismatch.")
  }
  return data;
};

//create new user
export const createUser = async (body) => {
  let data = await User.findOne({email:body.email});
  if(data){
    throw new Error("User already Exists")
  }
  data = await User.create(body);
  return data;
};
