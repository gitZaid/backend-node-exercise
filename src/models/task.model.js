import mongoose from 'mongoose';

const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String
  },
  deleted_at: {
    type: Date,
    default: null
  },
},
  { timestamps: true }
);


export default mongoose.model('tasks', TaskSchema);
