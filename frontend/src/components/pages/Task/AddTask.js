import api from "../../../utils/api";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";
import styles from '../../form/Form.module.css'
import TaskForm from "../../form/TaskForm";

function AddTask() {
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();

    async function registerTask(task) {
        let msgType = 'success';

        const formData = new FormData();

        Object.keys(task).forEach((key) => {
            formData.append(key, task[key])
        })

        try {
            const response = await api.post('task/create', formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = response.data;
            setFlashMessage(data.message, msgType);
            navigate('/task/mytasks');
        } catch (error) {
            msgType = 'error';
            const data = error.response.data;
            setFlashMessage(data.message, msgType);
        }
    }

    return (
        <section>
            <div className={styles.form_container}>
                <h1>Cadastre uma tarefa</h1>
                <p>Depois ela aparecerá nas suas tarefas!</p>
            </div>
            <TaskForm handleSubmit={registerTask} taskData={{}} btnText="Cadastrar Task" />
        </section>
    );
}

export default AddTask;
