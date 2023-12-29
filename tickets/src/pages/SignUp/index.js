import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import logo from '../../assets/logo.png'


export default function SignUp() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nome, setNome] = useState('')
    const { signUp, loadingAuth } = useContext(AuthContext);

  async function handleSubmit(e){
        e.preventDefault();

        if (nome !== '' && email !== '' && password !== ''){
          await signUp(nome, email, password)
        }
    }

    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="GLPI" title='GLPI'/>
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar Nova Conta</h1>

                    <input
                        type="text"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

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

                <Link to={'/'}> Já possui uma conta? </Link>
            </div>
        </div>
    )
}