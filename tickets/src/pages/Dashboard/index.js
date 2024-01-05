import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../contexts/auth"
import './dashboard.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiHome, FiPlus, FiSearch, FiEdit2, FiMessageSquare } from 'react-icons/fi'
import { Link } from "react-router-dom"
import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { format } from 'date-fns'
import Modal from "../../components/Modal"

export default function Dashboard() {
  const { logOut } = useContext(AuthContext);
  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState(true)
  const listRef = collection(db, "tickets")
  const [isEmpty, setIsEmpty] = useState(false)
  const [lastDocs, setLastDocs] = useState()
  const [loadMore, setLoadMore] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [detail, setDetail] = useState()

  async function handleLogout() {
    await logOut()
  }

  async function updateState(query) {
    const isColletEmpty = query.size === 0
    const numberOfDocs = query.docs.length;
    const limitOfDocs = 1;

    if (!isColletEmpty) {
      let lista = []

      query.forEach((doc) => {
        lista.push({
          id: doc.id,
          created: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          client: doc.data().client,
          clientId: doc.data().clientId,
          assunto: doc.data().assunto,
          complemento: doc.data().complemento,
          status: doc.data().status,
          userId: doc.data().userId,
        })
      });


      const lastDoc = query.docs[query.docs.length - 1]
      setLastDocs(lastDoc)
      setLoadMore(false)

      setChamados(chamados => [...chamados, ...lista])

      setIsEmpty(numberOfDocs < limitOfDocs);


    }
    else{
      setIsEmpty(true)
    }

    setLoadMore(false)

  }

  async function handleMore(){
    setLoadMore(true);

    const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs),  limit(5));
    const querySnapshot = await getDocs(q);
    await updateState(querySnapshot);

  }

  function showPostModal(item){
    setShowModal(!showModal)
    setDetail(item)
  }

  useEffect(() => {
    async function loadChamados() {
      const q = query(listRef, orderBy('created', 'desc'), limit(5));

      const querySnaphot = await getDocs(q)
      await updateState(querySnaphot)

      setLoading(false)
    }

    loadChamados();

    return () => { }
  }, [])

  if (loading) {
    return (
      <div>
        <Header />

        <div className="content">
          <Title name={"Chamados"}>
            <FiMessageSquare size={25} />
          </Title>
          <div className="container dashboard">
            <h1>Buscando chamados...</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />

      <div className="content">

        <Title name={"Chamados"}>
          <FiMessageSquare size={25} />
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
                    <th scope="col">Abertura</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {chamados.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="Cliente">{item.client}</td>
                        <td data-label="Assunto">{item.assunto}</td>
                        <td data-label="Status">
                          {item.status === 'Aberto' && 
                          <span className="badge" style={{ backgroundColor: '#bf5d02' }}>
                          {item.status}
                        </span>}
                        {item.status === 'Progresso' && 
                          <span className="badge" style={{ backgroundColor: '#166cbd' }}>
                          {item.status}
                        </span>}
                        {item.status === 'Concluido' && 
                          <span className="badge" style={{ backgroundColor: '#5cb85c' }}>
                          {item.status}
                        </span>}
                        </td>
                        <td data-label="Cadastrado">{item.created}</td>
                        <td data-label="#">
                          <button className="action" style={{ backgroundColor: '#3583f6' }} onClick={() => showPostModal(item)}>
                            <FiSearch color='#FFF' size={17} />
                          </button>
                          <Link to={`/new/${item.id}`} className="action" style={{ backgroundColor: '#f6a935' }}>
                            <FiEdit2 color='#FFF' size={17} />
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {loadMore && <h3>Buscando mais chamados...</h3>}
              {!loadMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais</button>  }
            </>
          )}
        </>
        {showModal && 
        <Modal
        conteudo={detail}
        close={() => setShowModal(!showModal)}
        />
        }
      </div>

    </div>
  )
}