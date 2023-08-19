import api from '../../../utils/api'

import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import styles from './MyTasks.module.css'

import useFlashMessage from '../../../hooks/useFlashMessage'

function MyTasksNotDone() {
    const [tasks, setTasks] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/task/mytasksnotdone', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setTasks(response.data.tasks.filter(task => !task.done))
            })
    }, [token])

    async function concludeTask(id) {
        let msgType = 'sucess'
        const data = api.patch(`/task/conclude/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
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
                    tasks.map(task => (
                        <div className={styles.tasks_card} key={task._id}>
                            <div className={styles.tasks_title}>
                                <h1>{task.name}</h1>
                            </div>
                            <h4>{task.description}</h4>
                            <div className={styles.tasks_actions}>
                                <button onClick={() => {
                                    concludeTask(task._id);
                                }} className={styles.task_done_false}>Concluir</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}

export default MyTasksNotDone
