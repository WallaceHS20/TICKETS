import { useContext, useState, useEffect  } from "react"
import { AuthContext } from "../../contexts/auth"
import './dashboard.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiHome, FiPlus, FiSearch, FiEdit2, FiMessageSquare } from 'react-icons/fi'
import { Link } from "react-router-dom"

export default function Dashboard(){
  const { logOut } = useContext(AuthContext);
  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState([])

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
          {chamados.length === 0 ? (
            <div className="container dashboard">
              <span>Nenhum chamado encontrado...</span>
              <Link to="/new" className="new">
                <FiPlus color="#FFF" size={25} />
                Novo chamado
              </Link>  
            </div>
          ) : (
            <>
              <Link to="/new" className="new">
                <FiPlus color="#FFF" size={25} />
                Novo chamado
              </Link>  

              <table>
                <thead>
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Assunto</th>
                    <th scope="col">Status</th>
                    <th scope="col">Cadastrando em</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Cliente">Mercado Esquina</td>
                    <td data-label="Assunto">Suporte</td>
                    <td data-label="Status">
                      <span className="badge" style={{ backgroundColor: '#999' }}>
                        Em aberto
                      </span>
                    </td>
                    <td data-label="Cadastrado">12/05/2022</td>
                    <td data-label="#">
                      <button className="action" style={{ backgroundColor: '#3583f6' }}>
                        <FiSearch color='#FFF' size={17}/>
                      </button>
                      <button className="action" style={{ backgroundColor: '#f6a935' }}>
                        <FiEdit2 color='#FFF' size={17}/>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>              
            </>
          )}
        </>

        </div>
        
      </div>
    )
}