import { useState } from "react";
import formStyles from './Form.module.css';
import Input from "./input";

function TaskForm({ handleSubmit, taskData, btnText }) {
  const [task, setTask] = useState(taskData || {});

  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(task);
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <Input
        text="Nome da tarefa"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={task.name || ''}
      />
      <Input
        text="Descrição da tarefa"
        type="text"
        name="description"
        placeholder="Digite a descrição"
        handleOnChange={handleChange}
        value={task.description || ''}
      />
      <input type="submit" value={btnText} />
    </form>
  );
}

export default TaskForm;
