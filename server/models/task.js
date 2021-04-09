import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({

    name: String,
    description: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    startDate: {
        type: Date,
        default: new Date()
    },
    group:{
        type:Number,
        default:0
    }
});

const task = mongoose.model('task',taskSchema);
export default task;