import express from 'express';
import * as userController from '../controllers/user.controller';
import { emailValidator, newUserValidator, passwordValidator, siginValidator } from '../validators/user.validator';
import { resetAuth, userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to creaye a new User
router.post('/signup', newUserValidator, userController.createUser);

//route to sign-in of User
router.post('/signin',siginValidator, userController.logIn);

router.post('/forgotPassword', emailValidator, userController.forgotPassword);

router.put('/resetPassword', passwordValidator, resetAuth, userController.resetPassword);

export default router;