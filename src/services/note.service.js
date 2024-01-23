import { use } from 'chai';
import Note from '../models/note.model';
import User from '../models/user.model';

//get all Notes
export const getAllNotes = async (userId) => {
  const data = await Note.find({UserID:userId});
  if(!data)
    throw new Error("User doesn't have Access.")
  return data;
};

//create new Note
export const newNote = async (body) => {
  let data = await Note.create(body);
  return data;
};

//update single Note
export const updateNote = async (_id,userId,body) => {
  console.log(body,userId,_id)
    const data = await Note.findOneAndUpdate(
    {
      _id: _id,
      UserID:userId
    },
    body,
    {
      new: true
    }
  );

  console.log(data)

  if(!data)
    throw new Error("User doesn't have Access.")
  return data;
};

//delete single Note
export const deleteNote = async (id,userId) => {
  const data = await Note.findOneAndDelete({_id:id, UserID:userId });
  if(!data)
    throw new Error("User doesn't have Access.")
  return '';
};

//get single Note
export const getNote = async (id,userId) => {
  const data = await Note.findOne({_id:id, UserID:userId });
  if(!data)
    throw new Error("User doesn't have Access.")
  return data;
};

export const isArchieved = async (_id,userId) =>{
  let data = await Note.findById(_id);
  let body = { isArchieved: !data.isArchieved };
  data = await Note.findOneAndUpdate(
    {
      _id: _id,
      UserID:userId
    },
    body,
    {
      new: true
    }
  );
  if(!data)
    throw new Error("User doesn't have Access.")
  return data;
}

export const isDeleted = async (_id,userId) =>{
  let data = await Note.findById(_id);
  let body = { isDeleted: !data.isDeleted };
  data = await Note.findOneAndUpdate(
    {
      UserID:userId,
      _id: _id
    },
    body,
    {
      new: true
    }
  );
  if(!data)
    throw new Error("User doesn't have Access.")
  return data;
}
