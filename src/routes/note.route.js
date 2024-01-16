import express from 'express';
import * as NoteController from '../controllers/note.controller';
import { NoteAuth } from '../middlewares/auth.middleware';
import { newNoteValidator } from '../validators/note.vallidator';

const router = express.Router();

//route to get all Notes
router.get('', NoteController.getAllNotes);

//route to create a new Note
router.post('',newNoteValidator, NoteController.newNote);

//route to get a single Note by their Note id
router.get('/:_id', NoteController.getNote);

//route to update a single Note by their Note id
router.put('/:_id', NoteController.updateNote);

//route to delete a single Note by their Note id
router.delete('/:_id', NoteController.deleteNote);

export default router;
