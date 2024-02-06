import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    Title: {
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    color: {
        type: String, default: ''
    },
    isArchieved: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    UserID: {
        type: String
    }
  },
  // {
  //   timestamps: true
  // }
);

export default model('Note', noteSchema);
