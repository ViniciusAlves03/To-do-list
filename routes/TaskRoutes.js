const express = require('express');
const TaskController = require('../controllers/TaskController')

const verifyToken = require('../helpers/verify-token');
const {imageUpload} = require('../helpers/image-upload');

const router = express.Router()

router.post('/create', verifyToken, TaskController.create)

module.exports = router
