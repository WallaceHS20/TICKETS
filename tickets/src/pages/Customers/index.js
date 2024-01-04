import Header from '../../components/Header/index'
import Title from '../../components/Title'
import { FiUser } from 'react-icons/fi'
import { useState } from 'react'

import {db} from '../../services/firebaseConnection'
import { doc, collection, addDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

export default function Customers() {

    const [nome, setNome] = useState();
    const [cnpj, setCnpj] = useState();
    const [endereco, setEndereco] = useState();

   async function handleSubmit(e){
        e.preventDefault()

        if (nome != '' && cnpj != '' && endereco != ''){
            await addDoc(collection(db, "customers"),{
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            })

            .then(() =>{
                toast.success('Cadastro Realizado com Sucesso!')
                setCnpj('')
                setNome('')
                setEndereco('')
            })

            .catch(() =>{
                toast.error('Falha no Cadastro do Cliente!')
            })
        }
        else{
            toast.error('Preencha Todos os Campos!')
        }
    }

    return (
        <div>
            <Header />
            <div className='content'>

                <Title name={"Clientes"}>
                    <FiUser size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleSubmit}>

                        <label> Nome Fantasia </label>
                        <input
                            type='text'
                            placeholder='Nome da Empresa'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <label> CNPJ </label>
                        <input
                            type='text'
                            placeholder='Digite o CNPJ'
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                        />

                        <label> Endereço </label>
                        <input
                            type='text'
                            placeholder='Digite o endereço'
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />

                        <button className='save-button' type='submit'> Cadastrar </button>

                    </form>
                </div>
            </div>
        </div>
    )
}