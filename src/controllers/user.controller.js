import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

//Log In
export const logIn = async (req, res, next) => {
  try {
    const data = await UserService.logIn(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User Logged-In successfully'
    });
  } catch (error) {
    next(error);
  }
};
