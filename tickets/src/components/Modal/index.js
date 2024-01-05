import './modal.css'
import { FiX } from 'react-icons/fi'

export default function Modal({ conteudo, close }) {
    return (
        <div className="modal">
            <div className="container">
                <button className='close' onClick={close}>
                    <FiX size={25} color='#FFF' />
                    Voltar
                </button>

                <main>
                    <h2>Detalhe do chamado</h2>
                    <div className='row'>
                        <span> Cliente: <i>{conteudo.client}</i> </span>
                    </div>
                    <div className="row">
                        <span>
                            Assunto: <i>{conteudo.assunto}</i>
                        </span>
                        <span>
                            Cadastrado em: <i>{conteudo.created}</i>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Status: <i>{conteudo.status}</i>
                        </span>
                    </div>

                    {conteudo.complemento ? (
                        <>
                            <h3>Complemento</h3>
                            <p>
                                {conteudo.complemento}
                            </p>
                        </>
                    ) : (
                        <h3>Sem complemento</h3>
                    )}
                </main>
            </div>
        </div>
    )
}