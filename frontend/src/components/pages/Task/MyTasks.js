import api from '../../../utils/api'

import { useState, useEffect } from 'react'

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

    return (
        <section>
            <div className={styles.tasks_header}>
                <h1>Minhas Tarefas!</h1>
            </div>
            <div className={styles.tasks_container}>
                {tasks.length > 0 && (
                    tasks.map((task) => {
                        return (
                            <div className={styles.tasks_card} key={task._id}>
                                <div className={styles.tasks_title}>
                                    <h1>{task.name}</h1>
                                </div>
                                {task.description ? (<>
                                    <h4>{task.description}</h4>
                                </>)
                                    : <>
                                        <h4>Essa tarefa não tem descrição!</h4>
                                    </>}
                                <div className={styles.tasks_actions}>
                                    {task.done ? (<>
                                        <button className={styles.task_done_true}>Concluída</button>
                                        <button className={styles.task_remove}>Remover</button>
                                    </>)
                                        : <>
                                            <button className={styles.task_done_false}>Concluir</button>
                                            <button className={styles.task_remove}>Remover</button>
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
