import api from '../../../utils/api'

import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import styles from './MyTasks.module.css'

import useFlashMessage from '../../../hooks/useFlashMessage'

function MyTasks() {
    const [tasks, setTasks] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/task/mytasks', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setTasks(response.data.tasks)
                console.log(tasks)
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
                        <Link to={'/task/create'}>Criar Tarefa</Link>
                    </li>
                    <li>
                        <Link to={'/task/mytasksdone'}>Tarefas Concluídas</Link>
                    </li>
                    <li>
                        <Link to={'/task/mytasksnotdone'}>Tarefas Restantes</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.tasks_container}>
                {tasks.length > 0 && (
                    tasks.map((task) => {
                        return (
                            <div className={styles.tasks_card} key={task._id}>
                                <div className={styles.tasks_title}>
                                    <h1>{task.name}</h1>
                                </div>
                                <h4>{task.description}</h4>
                                <div className={styles.tasks_actions}>
                                    {task.done ? (<>
                                        <button className={styles.task_done_true}>Concluída</button>
                                        <button onClick={() => {
                                            removeTask(task._id)
                                        }} className={styles.task_remove}>Remover</button>
                                    </>)
                                        : <>
                                            <Link to={'task/edit'}><button className={styles.task_edit}>Alterar</button></Link>
                                            <button onClick={() => {
                                                concludeTask(task._id)
                                            }} className={styles.task_done_false}>Concluir</button>
                                            <button onClick={() => {
                                                removeTask(task._id)
                                            }} className={styles.task_remove}>Remover</button>
                                        </>}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </section>
    )

}

export default MyTasks
