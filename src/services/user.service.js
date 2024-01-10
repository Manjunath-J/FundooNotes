import User from '../models/user.model';


//create new user
export const createUser = async (body) => {
  let data = await User.findOne({email:body.email});
  if(data){
    throw new Error("User already Exists")
  }
  data = await User.create(body);
  return data;
};
