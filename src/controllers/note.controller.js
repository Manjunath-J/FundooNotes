import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';


export const getAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNotes(req.body.UserID);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All Notes fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
    code: HttpStatus.BAD_REQUEST,
    message: `${error}`
  });
  }
};


export const getNote = async (req, res, next) => {
  try {
    const data = await NoteService.getNote(req.params._id,req.body.UserID);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
    code: HttpStatus.BAD_REQUEST,
    message: `${error}`
  });
  }
};


export const newNote = async (req, res, next) => {
  try {
    const data = await NoteService.newNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
    code: HttpStatus.BAD_REQUEST,
    message: `${error}`
  });
  }
};


export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req.params._id,req.body.UserID);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
    code: HttpStatus.BAD_REQUEST,
    message: `${error}`
  });
  }
};


export const deleteNote = async (req, res, next) => {
  try {
    await NoteService.deleteNote(req.params._id,req.body.UserID);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Note deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
    code: HttpStatus.BAD_REQUEST,
    message: `${error}`
  });
  }
};


export const isArchieved = async (req, res, next) => {
  try {
    const data = await NoteService.isArchieved(req.params._id,req.body.UserID);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note Archieved successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
    code: HttpStatus.BAD_REQUEST,
    message: `${error}`
  });
  }
};


export const isDeleted = async (req, res, next) => {
  try {
    const data = await NoteService.isDeleted(req.params._id,req.body.UserID);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note moved to trash successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
    code: HttpStatus.BAD_REQUEST,
    message: `${error}`
  });
  }
};
