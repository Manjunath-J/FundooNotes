import express from 'express';
import * as NoteController from '../controllers/note.controller';
import { NoteAuth, userAuth } from '../middlewares/auth.middleware';
import { newNoteValidator } from '../validators/note.vallidator';
import { isArchieved, isDeleted } from '../services/note.service';

const router = express.Router();

//route to get all Notes
router.get('',userAuth, NoteController.getAllNotes);

//route to create a new Note
router.post('',userAuth,newNoteValidator, NoteController.newNote);

//route to get a single Note by their Note id
router.get('/:_id',userAuth, NoteController.getNote);

//route to update a single Note by their Note id
router.put('/:_id',userAuth, NoteController.updateNote);

//route to delete a single Note by their Note id
router.delete('/:_id',userAuth, NoteController.deleteNote);

//route to archive the Note
router.post('/isarch/:_id',userAuth, NoteController.isArchieved);

//route to move Note to trash
router.post('/isdeleted/:_id',userAuth, NoteController.isDeleted);

export default router;
