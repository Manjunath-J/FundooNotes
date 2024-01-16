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

//route to get all notes
router.get('/signin/note', userController.getAllNotes);

//route to create a new note
router.post('/signin/note',newNoteValidator, userController.newNote);

//route to get a single note by their note id
router.get('/signin/note/:_id', userController.getNote);

//route to update a single note by their note id
router.put('/signin/note/:_id', userController.updateNote);

//route to delete a single user by their note id
router.delete('/signin/note/:_id', userController.deleteNote);

export default router;