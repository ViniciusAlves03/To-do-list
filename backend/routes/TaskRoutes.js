const express = require('express');
const TaskController = require('../controllers/TaskController')

const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload');

const router = express.Router()

router.post('/create', verifyToken, imageUpload.single("image"), TaskController.create)
router.get('/mytasks', verifyToken, TaskController.getAllUserTasks)
router.get('/mytasksdone', verifyToken, TaskController.getAllUserTasksDone)
router.get('/mytasksnotdone', verifyToken, TaskController.pickUpAllMissingTasks)
router.get('/:id', verifyToken, TaskController.getTaskById)
router.patch('/edit/:id', verifyToken, imageUpload.single("image"), TaskController.updateTask)
router.delete('/remove/:id', verifyToken, TaskController.removeTask)
router.patch('/conclude/:id', verifyToken, TaskController.concludeTask)

module.exports = router
