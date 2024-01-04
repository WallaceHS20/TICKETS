import { useContext  } from "react"
import { AuthContext } from "../../contexts/auth"
import './dashboard.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiHome, FiPlus } from 'react-icons/fi'
import { Link } from "react-router-dom"

export default function Dashboard(){
  const { logOut } = useContext(AuthContext);

  async function handleLogout(){
    await logOut()
  }
    return(
      <div>
        <Header/>

        <div className="content">

          <Title name={"Chamados"}>
            <FiHome size={25}/>
          </Title>

          <>
          <Link className="new" to={"/new"}>
            <FiPlus color="FFF" size={25}/>
            Novo Chamado
          </Link>

          <div className="container">
            <h1>Teste</h1>
          </div>

          </>

        <h1>Pagina Dashboard</h1>
        <button onClick={handleLogout}>Sair</button>

        </div>
        
      </div>
    )
}