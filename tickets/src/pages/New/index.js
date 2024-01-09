import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlusCircle } from 'react-icons/fi'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../services/firebaseConnection'
import { AuthContext } from '../../contexts/auth'
import { collection, getDoc, getDocs, doc, addDoc, updateDoc } from 'firebase/firestore'
import './new.css'
import { toast } from 'react-toastify'


export default function New() {

    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const [loadCustomer, setLoadCustomer] = useState(true)
    const listRef = collection(db, "customers")

    const [customers, setCustomers] = useState([])
    const [complemento, setComplemento] = useState('')
    const [assunto, setAssunto] = useState('Suporte Tecnico')
    const [status, setStatus] = useState('Aberto')
    const [customerSelected, setCustomerSelected] = useState(0)
    const [idCustomer, setIdCustomer] = useState(false)

    useEffect(() => {
        async function loadCustomers() {
            const querySnapShot = await getDocs(listRef)
                .then((snapshot) => {

                    let lista = []

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia
                        })

                        setLoadCustomer(false)
                        setCustomers(lista)

                        if (id) {
                            loadId(lista)
                            setIdCustomer(true)
                        }

                    })
                })

                .catch((error) => {
                    console.log(error);
                    toast.error("Falha ao coletar Clientes")
                    setLoadCustomer(false)
                })
        }

        loadCustomers()


    }, [id])

    function handleOptionChanged(e) {
        setStatus(e.target.value)
    }

    async function loadId(lista) {
        const docRef = doc(db, "tickets", id);
        await getDoc(docRef)
            .then((response) => {
                setAssunto(response.data().assunto)
                setComplemento(response.data().complemento)
                setStatus(response.data().status)
                let index = lista.findIndex(item => item.id === response.data().clientId)

                setCustomerSelected(index)
            })

            .catch((error) => {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
                toast.error("Chamado Não Encontrado")
            })
    }

    function handleSelectChange(e) {
        setAssunto(e.target.value)
    }

    function handleClientSelectChange(e) {
        setCustomerSelected(e.target.value);
    }

    async function handleRegister(e) {
        e.preventDefault();

        if (idCustomer) {
            //Atualizando chamado
            const docRef = doc(db, "tickets", id)
            await updateDoc(docRef, {
                client: customers[customerSelected].nomeFantasia,
                clientId: customers[customerSelected].id,
                assunto: assunto,
                complemento: complemento,
                status: status,
                userId: user.uid
            })

            .then(() =>{
                toast.success('Chamado Atualizado com Sucesso!')
            })

            .catch((error) =>{
                toast.error('Falha ao Atualizar o Chamado!')
                console.log(error);
            })

            return
        }

        await addDoc(collection(db, "tickets"), {
            created: new Date(),
            client: customers[customerSelected].nomeFantasia,
            clientId: customers[customerSelected].id,
            assunto: assunto,
            complemento: complemento,
            status: status,
            userId: user.uid
        })
            .then(() => {
                toast.success('Chamado Registrado !');
                setAssunto('');
                setComplemento('');
                setCustomerSelected(0);
            })
            .catch((error) => {
                toast.error("Falha ao Registrar !");
                console.log(error);
            });
    }

    return (
        <div>
            <Header />

            <div className='content'>

                <Title name={id ? "Editando Chamado" : "Novo Chamado"}>
                    <FiPlusCircle size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>

                        <label>Clientes</label>
                        {
                            loadCustomer ? (
                                <input type="text" disabled={true} value="Carregando..." />
                            ) : (
                                <select value={customerSelected} onChange={handleClientSelectChange}>
                                    {customers.map((item, index) => {
                                        return (
                                            <option key={index} value={index}>
                                                {item.nomeFantasia}
                                            </option>
                                        )
                                    })}
                                </select>
                            )
                        }

                        <label>Assunto</label>
                        <select value={assunto} onChange={handleSelectChange}>
                            <option key={1} value={"Suporte Tecnico"}> Suporte Técnico </option>
                            <option key={2} value={"Visita Tecnica"}> Visita Técnica </option>
                            <option key={3} value={"Fincancas"}> Finanças </option>
                        </select>

                        <label> Status </label>
                        <div className='status'>

                            <input
                                type='radio'
                                name='radio'
                                value={'Aberto'}
                                onChange={handleOptionChanged}
                                checked={status === 'Aberto'}
                            />
                            <span> Aberto </span>

                            <input
                                type='radio'
                                name='radio'
                                value={'Progresso'}
                                onChange={handleOptionChanged}
                                checked={status === 'Progresso'}
                            />
                            <span> Progresso </span>

                            <input
                                type='radio'
                                name='radio'
                                value={'Concluido'}
                                onChange={handleOptionChanged}
                                checked={status === 'Concluido'}
                            />
                            <span> Concluído </span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type="textarea"
                            placeholder='Descreva seu problema!'
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button className='save-button' type="submit"> Enviar </button>
                    </form>
                </div>

            </div>
        </div>
    )
}