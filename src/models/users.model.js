import mongoose from 'mongoose';

const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 255
  },
  deleted_at: {
    type: Date,
    default: null
  },
},
  { timestamps: true }
);


export default mongoose.model('users', UsersSchema);
