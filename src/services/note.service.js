import Note from '../models/note.model';

//get all Notes
export const getAllNotes = async () => {
  const data = await Note.find();
  return data;
};

//create new Note
export const newNote = async (body) => {
  const data = await Note.create(body);
  return data;
};

//update single Note
export const updateNote = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single Note
export const deleteNote = async (id) => {
  const data = await Note.findByIdAndDelete(id);
  return '';
};

//get single Note
export const getNote = async (id) => {
  const data = await Note.findById(id);
  return data;
};
