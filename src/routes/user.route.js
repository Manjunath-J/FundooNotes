import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator, newNoteValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { authenticateToken } from '../services/user.service';

const router = express.Router();

//route to creaye a new User
router.post('/signup', newUserValidator, userController.createUser);

//route to sign-in of User
router.post('/signin', userController.logIn);

// router.post('/signin/authenticate', userAuth.logIn);
router.get('/signin/authenticate', authenticateToken);

export default router;