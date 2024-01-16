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
export const updateNote = async (title, body) => {
  const data = await Note.findOneAndUpdate(
    {
      title
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single Note
export const deleteNote = async (title) => {
  await Note.findByIdAndDelete(title);
  return '';
};

//get single Note
export const getNote = async (title) => {
  const data = await Note.findOne({Title:title});
  return data;
};
