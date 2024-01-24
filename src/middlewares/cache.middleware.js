import HttpStatus from 'http-status-codes';
import {client} from '../config/redis';

export const cacheMiddleware = async (req, res, next) => {
  try {
    const key = req.body.UserID;
    const cache = await client.get(key);
    if(cache){
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: cache, 
            message: "Data retrieved from cache"
          });
    }else
        next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
