import { Link } from 'react-router-dom'
import { useContext } from 'react'

import styles from './Navbar.module.css'

import { Context } from '../../context/UserContext'


function Navbar() {

    const { authenticated, logout } = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <div>
                <h2>To-do list</h2>
            </div>
            <ul>
                {authenticated ? (
                    <>
                        <li><Link to='/task/mytasks'>Minhas Tarefas</Link></li>
                        <li><Link to='/user/profile'>Perfil</Link></li>
                        <li className={styles.navbar_logout}onClick={logout}>Sair</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to={'/login'}>Entrar</Link>
                        </li>
                        <li>
                            <Link to={'/register'}>Cadastrar</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
