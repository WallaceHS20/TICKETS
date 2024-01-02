import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import './signin.css'
import logo from '../../assets/logo.png'

import { AuthContext } from '../../contexts/auth'

export default function SignIn() {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn, loadingAuth, signed } = useContext(AuthContext);

    console.log('olha essa poha ', signed);

    async function handleSignIn(e) {
        e.preventDefault();
        await signIn(email, password)
    }

    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="GLPI" title='GLPI' />
                </div>

                <form onSubmit={handleSignIn}>
                    <h1>Entrar</h1>
                    <input
                        type="text"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Insira sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='submit'>
                        {loadingAuth ? 'Carregando...' : 'Cadastrar'}
                    </button>

                </form>

                <Link to={'/register'}> Criar uma conta </Link>
            </div>
        </div>
    )
}