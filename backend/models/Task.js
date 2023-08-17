const moongose = require('../db/conn')
const {Schema} = moongose

const Task = moongose.model(
    'Task',
    new Schema({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        done: {
            type: Boolean,
        },
        user: Object
    })
)

module.exports = Task
