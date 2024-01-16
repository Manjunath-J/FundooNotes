import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';


export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().min(5).required(),
    Description: Joi.string().min(6).required(),
    color: Joi.string().min(3),
    isArchieved: Joi.boolean(),
    isDeleted: Joi.boolean(),
    UserID: Joi.string(),
  });                                                          
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    req.validatedBody = value;
    next();
  }
};

