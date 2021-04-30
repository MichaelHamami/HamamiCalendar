import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({

    name: String,
    description: String,
    creator: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    startDate: {
        // type: String
        type: Date
        // default: new Date()
    },
    startTime:String,
    group:{
        type:Number,
        default:0
    }
});

const task = mongoose.model('task',taskSchema);
export default task;