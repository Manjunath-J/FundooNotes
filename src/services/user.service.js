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

