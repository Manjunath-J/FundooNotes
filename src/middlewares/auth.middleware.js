import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';


export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    
    req.user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    if(!req.user){
      throw new Error("Invalid Token...");
    }

    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
