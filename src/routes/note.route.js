import express from 'express';
import * as NoteController from '../controllers/note.controller';
import { NoteAuth, userAuth } from '../middlewares/auth.middleware';
import { newNoteValidator } from '../validators/note.vallidator';

const router = express.Router();

//route to get all Notes
router.get('',userAuth, NoteController.getAllNotes);

//route to create a new Note
router.post('',userAuth,newNoteValidator, NoteController.newNote);

//route to get a single Note by their Note id
router.get('/:Title',userAuth, NoteController.getNote);

//route to update a single Note by their Note id
router.put('/:Title',userAuth, NoteController.updateNote);

//route to delete a single Note by their Note id
router.delete('/:Title',userAuth, NoteController.deleteNote);

export default router;
