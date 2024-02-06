import { use } from 'chai';
import Note from '../models/note.model';
import User from '../models/user.model';
import { client } from '../config/redis';
import { json } from 'express';

//get all Notes
export const getAllNotes = async (userId) => {
  try {
    const data = await Note.find({ UserID: userId });
    if (!data) throw new Error("User doesn't have Access.");

    // const key = userId;
    // client.set(key, JSON.stringify(data));
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

//create new Note
export const newNote = async (body) => {
  try {
    console.log(body)
    let data = await Note.create(body);
    // const userId = body.UserID;
    // client.del(userId);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

//update single Note
export const updateNote = async (_id, userId, body) => {
  try {
    const data = await Note.findOneAndUpdate(
      {
        _id: _id,
        UserID: userId
      },
      body,
      {
        new: true
      }
    );

    if (!data) throw new Error("User doesn't have Access.");
    // client.del(userId);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

//delete single Note
export const deleteNote = async (id, userId) => {
  try {
    const data = await Note.findOneAndDelete({ _id: id, UserID: userId });
    if (!data) throw new Error("User doesn't have Access.");
    // client.del(userId);
    return '';
  } catch (err) {
    throw new Error(err);
  }
};

//get single Note
export const getNote = async (id, userId) => {
  try {
    const data = await Note.findOne({ _id: id, UserID: userId });
    if (!data) throw new Error("User doesn't have Access.");
    // client.del(userId);
    // const key = id;
    // client.set(key, JSON.stringify(data));
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const isArchieved = async (_id, userId) => {
  try {
    let data = await Note.findById(_id);
    let body = { isArchieved: !data.isArchieved };
    data = await Note.findOneAndUpdate(
      {
        _id: _id,
        UserID: userId
      },
      body,
      {
        new: true
      }
    );
    if (!data) throw new Error("User doesn't have Access.");
    // client.del(userId);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const isDeleted = async (_id, userId) => {
  try {
    let data = await Note.findById(_id);
    let body = { isDeleted: !data.isDeleted };
    data = await Note.findOneAndUpdate(
      {
        UserID: userId,
        _id: _id
      },
      body,
      {
        new: true
      }
    );
    if (!data) throw new Error("User doesn't have Access.");
    // client.del(userId);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
