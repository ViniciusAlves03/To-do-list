const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmPassword } = req.body

        if (!name) { return sendError(res, "o nome é obrigatório!") }
        if (!phone) { return sendError(res, "o número de telefone é obrigatório!") }
        if (!password) { return sendError(res, "a senha é obrigatória!") }
        if (!confirmPassword) { return sendError(res, "a confirmação de senha é obrigatória!") }
        if (!email) {
            return sendError(res, "o e-mail é obrigatório!")
        } else {

            const validEmail = await validator.isEmail(email)

            if (!validEmail) {
                return sendError(res, "O e-mail informado é inválido!")
            }
        }

        if (password !== confirmPassword) {
            return sendError(res, "A senha e a confimação de senha precisam ser iguais!")
        }

        const userExists = await User.findOne({ email: email })

        if (userExists) {
            return sendError(res, "E-mail já cadastrado, utilize um outro e-mail!")
        }

        const passswordHash = await hashPassword(password)

        const user = new User({ name, email, phone, password: passswordHash })

        try {
            const newUser = await user.save()

            await createUserToken(newUser, req, res)
        } catch (error) {
            return sendError(res, error)
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        if (!email) { return sendError(res, "o e-mail é obrigatório!") }
        if (!password) { return sendError(res, "a senha é obrigatória!") }

        const user = await User.findOne({ email: email })

        if (!user) {
            return sendError(res, "Não há usuário cadastrado com esse e-mail!")
        }

        const checkPassword = await comparePassword(password, user.password)

        if (!checkPassword) {
            return sendError(res, "Senha inválida!")
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {
          const token = getToken(req)
          const decoded = jwt.verify(token, 'usersecret')

          currentUser = await User.findById(decoded.id)

          currentUser.password = undefined
        } else {
          currentUser = null
        }

        res.status(200).send(currentUser)
      }

    static async getUserById(req, res) {
        const id = req.params.id

        const token = getToken(req)
        const user = await User.findById(id).select('-password')

        if (!user) {
            return sendError(res, "Usuário não foi localizado!")
        }

        res.status(200).json({ user })
    }

    static async editUser(req, res) {
        const id = req.params.id;

        const token = getToken(req)
        const user = await getUserByToken(token)

        const { name, email, phone, password, confirmPassword } = req.body

        let image = ''

        if (req.file) {
            user.image = req.file.filename
        }

        if (!name) { return sendError(res, "o nome é obrigatório!") }
        user.name = name;

        if (!email) { return sendError(res, "o e-mail é obrigatório!") }
        const userExists = await User.findOne({ email: email })

        if (user.email !== email) { return sendError(res, "Por favor, use outro e-mail!") }
        user.email = email

        if (!phone) { return sendError(res, "o número de telefone é obrigatório!") }
        user.phone = phone

        if (password !== confirmPassword) {
            return sendError(res, "As senhas não são iguais!")
        } else if (password === confirmPassword && password != null) {
            const passswordHash = await hashPassword(password)
            user.password = passswordHash
        }

        try {
            await User.findOneAndUpdate(
                { _id: user.id },
                { $set: user },
                { new: true }
            );

            res.status(200).json({ message: "Usuário atualizado com sucesso!" })
        } catch (error) {
            return sendError(res, error)
        }
    }
}

async function sendError(res, message) {
    res.status(422).json({ message })
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(password, salt)
}

async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}
