const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    isComplete: {
        type:Boolean
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Task = model('Task', TaskSchema);

module.exports = Task;
