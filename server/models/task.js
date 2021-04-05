import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({

    name: String,
    comments: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date()
    },

    
});

const task = mongoose.model('task',taskSchema);
export default task;