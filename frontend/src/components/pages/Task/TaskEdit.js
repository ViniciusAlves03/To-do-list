import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";

function editTask(){
    const [task, setTask] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams
    const {setFlashMessa} = useFlashMessage()

    useEffect(() => {
        api.get(`/task/`)
    })
}
