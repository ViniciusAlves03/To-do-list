import api from "../../../utils/api"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import styles from '../../form/Form.module.css'

import TaskForm from '../../form/TaskForm'

import useFlashMessage from "../../../hooks/useFlashMessage"

function EditTask(){

    const [task, setTask] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/task/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        })
        .then((response) => {
            setTask(response.data.task)
        })
    },[token, id])

    async function updateTask(task){

        let msgType = 'sucess'

        const formData = new FormData()

        Object.keys(task).forEach((key) => {
            formData.append(key, task[key])
        })

        const data = await api.patch(`task/edit/${task._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            msgType = 'error'
            return error.response.data
        })

        setFlashMessage(data.message, msgType)
        navigate('/task/mytasks')
    }

    return (
        <section>
            <div className={styles.form_container}>
            <h1>{task.name}</h1>
            <p>Depois da edição os dados serão atualizados no sistema!</p>
            </div>
            {task.name && <TaskForm handleSubmit={updateTask} btnText="Atualizar" taskData={task}/>}
        </section>
    )
}

export default EditTask
