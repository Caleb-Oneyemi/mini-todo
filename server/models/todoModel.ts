import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    todo: {
        type: String
    },
    time: {
        type: String
    }
})

export default mongoose.model('Todo', todoSchema);