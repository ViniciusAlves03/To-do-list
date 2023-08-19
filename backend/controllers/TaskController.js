const Task = require('../models/Task')

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

const ObjectId = require('mongoose').Types.ObjectId

module.exports = class TaskController {
    static async create(req, res) {
        const { name, description } = req.body;
        const done = false;

        if (!name) {
            return sendError(res, "O nome é obrigatório!");
        }

        let updatedDescription = description;

        if (!description) {
            updatedDescription = 'Essa tarefa não tem descrição!';
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        const task = new Task({
            name,
            description: updatedDescription,
            done,
            user: {
                _id: user.id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            },
        });

        try {
            const newTask = await task.save();
            res.status(200).json({ message: "A tarefa foi criada!", newTask });
        } catch (error) {
            res.status(500).json({ message: "Não foi possível criar a tarefa!" });
        }
    }

    static async getAllUserTasks(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)

        const tasks = await Task.find({ 'user._id': user.id }).sort('-createdAt')

        if (!tasks) { return sendSearchError(res, "Tarefas não localizadas!") }

        res.status(200).json({ tasks })
    }

    static async getAllUserTasksDone(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)

        const tasks = await Task.find({ 'user._id': user.id, "done": true }).sort('-createdAt')

        if (!tasks) { return sendSearchError(res, "Tarefas não localizadas!") }

        res.status(200).json({ tasks })
    }

    static async getAllUserTasksDone(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)

        const tasks = await Task.find({ 'user._id': user.id, "done": true }).sort('-createdAt')

        if (!tasks) { return sendSearchError(res, "Tarefas não localizadas!") }

        res.status(200).json({ tasks })
    }

    static async pickUpAllMissingTasks(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)

        const tasks = await Task.find({ 'user._id': user.id, "done": false }).sort('-createdAt')

        res.status(200).json({ tasks })
    }

    static async updateTask(req, res) {

        const id = req.params.id

        const { name, description } = req.body

        const updateData = {}

        const task = await Task.findOne({ _id: id })

        if (!task) { return sendSearchError(res, "Tarefa não localizada!") }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (task.user._id.toString() !== user._id.toString()) {
            return sendError(res, 'Ocorreu um problema ao localizar sua tarefa!')
        }

        if (!name) { return sendError(res, "O nome é obrigatório!") } else { updateData.name = name }
        if (!description) { updateData.description = 'Essa tarefa não tem descrição!' } else { updateData.description = description }

        await Task.findByIdAndUpdate(id, updateData)

        sendSucess(res, 'Tarefa atualizada com sucesso!')
    }

    static async removeTask(req, res) {

        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            return sendError(res, 'ID inválido!')
        }

        const task = await Task.findOne({ _id: id })

        if (!task) { return sendSearchError(res, "Tarefa não localizada!") }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (task.user._id.toString() !== user._id.toString()) {
            return sendError(res, 'Ocorreu um problema ao localizar sua tarefa!')
        }

        await Task.findByIdAndRemove(id)

        sendSucess(res, 'Tarefa removida com sucesso!')
    }

    static async concludeTask(req, res) {

        const id = req.params.id

        const task = await Task.findOne({ _id: id })

        if (!task) { return sendSearchError(res, "Tarefa não localizada!") }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (task.user._id.toString() !== user._id.toString()) {
            return sendError(res, 'Ocorreu um problema ao localizar sua tarefa!')
        }

        task.done = true

        await Task.findByIdAndUpdate(id, task)

        sendSucess(res, "Tarefa concluída com sucesso!")
    }
}

async function sendSucess(res, message) {
    res.status(200).json({ message })
}
async function sendError(res, message) {
    res.status(422).json({ message })
}

async function sendSearchError(res, message) {
    res.status(422).json({ message })
}

