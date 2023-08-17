import api from "../../../utils/api";

import { useState, useEffect } from "react";

import styles from './Profile.module.css'
import formStyles from '../../form/Form.module.css'

import RoundedImage from "../../layouts/RoundedImage";
import Input from '../../form/input'

import useFlashMessage from "../../../hooks/useFlashMessage";

function Profile() {

    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {

        api.get('/user/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])

    function onFileChange(e) {
        setPreview(e.target.files[0])
        setUser({ ...user, [e.target.name]: e.target.files[0] })
    }

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let msgType = 'sucess'

        const formData = new FormData()

        Object.keys(user).forEach((key) => {
            formData.append(key, user[key])
        })

        const data = await api.patch(`user/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`, 'Content-Type': 'multipart/form-data'
            }


        }).then((response) => {
            return response.data
        }).catch((error) => {
            msgType = 'error'
            return error.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <RoundedImage
                        src={
                            preview
                                ? URL.createObjectURL(preview)
                                : `http://localhost:5000/images/${user.image}`
                        }
                        alt={user.name}
                        width="px75" />
                )}
            </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input text="image" type="file" name="image" handleOnChange={onFileChange} />
                <Input text="E-mail" type="email" name="email" placeholder="Digite seu E-mail" handleOnChange={handleChange} value={user.email || ''} />
                <Input text="Nome" type="text" name="name" placeholder="Digite seu Nome" handleOnChange={handleChange} value={user.name || ''} />
                <Input text="Telefone" type="text" name="phone" placeholder="Digite seu Telefone" handleOnChange={handleChange} value={user.phone || ''} />
                <Input text="Senha" type="password" name="password" placeholder="Digite sua Senha" handleOnChange={handleChange} />
                <Input text="Confirmação de senha" type="password" name="confirmPassword" placeholder="Confirme sua Senha" handleOnChange={handleChange} />
                <input type='submit' value="Atualizar" />
            </form>
        </section>
    )
}

export default Profile
