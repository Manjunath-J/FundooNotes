import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

//Create User
export const createUser = async (req, res, next) => {
  try {
    const data = await UserService.createUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }              
};


