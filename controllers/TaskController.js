const Task = require('../models/Task')

const getToken = require('../helpers/get-token')
const getUserById = require('../helpers/get-user-by-token')

module.exports = class TaskController {
    static async create(req, res) {

        const { name, description } = req.body

        const done = false

        if (!name) { return sendError(res, "O nome é obrigatório!") }

        const token = getToken(req)
        const user = await getUserById(token)

        const task = new Task({
            name,
            description,
            done,
            user: {
                _id: user.id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            }
        })

        try {
            const newTask = await task.save()

            res.status(201).json({ message: "A tarefa foi criada!", newTask })
        } catch (error) {
            res.status(500).json({ message: "Não foi possível criar a tarefa!" })
        }
    }
}

async function sendError(res, message) {
    res.status(422).json({ message })
}

