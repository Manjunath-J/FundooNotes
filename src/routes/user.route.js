import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to creaye a new User
router.post('/signup', newUserValidator, userController.createUser);

//route to sign-in of User
router.post('/signin', userController.logIn);

export default router;