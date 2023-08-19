import api from '../../../utils/api'

import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import styles from './MyTasks.module.css'

import useFlashMessage from '../../../hooks/useFlashMessage'

function MyTasksDone() {
    const [tasks, setTasks] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/task/mytasksdone', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setTasks(response.data.tasks)
            })
    }, [token])

    async function removeTask(id) {
        let msgType = 'success'

        const data = await api.delete(`/task/remove/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                const updateTask = tasks.filter((task) => task._id !== id)
                setTasks(updateTask)
                return response.data
            })
            .catch((error) => {
                msgType = 'error'
                return error.response.data
            })

        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
            <div className={styles.tasks_header}>
                <h1>Minhas Tarefas!</h1>
                <ul>
                    <li>
                        <Link to={'/task/mytasks'}>Tarefas</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.tasks_container}>
                {tasks.length > 0 && (
                    tasks
                        .filter(task => task.done)
                        .map(task => (
                            <div className={styles.tasks_card} key={task._id}>
                                <div className={styles.tasks_title}>
                                    <h1>{task.name}</h1>
                                </div>
                                <h4>{task.description}</h4>
                                <div className={styles.tasks_actions}>
                                    <button onClick={() => {
                                        removeTask(task._id)
                                    }} className={styles.task_remove}>Remover</button>
                                </div>
                            </div>
                        ))
                )}
            </div>
        </section>
    )

}

export default MyTasksDone
