import './profile.css'

import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiSettings, FiUpload } from 'react-icons/fi'
import { useContext, useState } from 'react'

import avatar from '../../assets/avatar.png'
import { AuthContext } from '../../contexts/auth'

export default function Profile() {

    const { user } = useContext(AuthContext)

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name={"Minha Conta"}>
                    <FiSettings size={25} />
                </Title>
            </div>

            <div className='conteiner'>
                <form className='form-profile'>
                    <label className='label-avatar'>
                        <label>
                            <FiUpload size={25} color='#FFF' />
                        </label>

                        <input
                            type='file'
                            accept='image/*'
                        />
                        <br/>
                        {avatarUrl === null?(
                            <img src={avatar} title='Foto de perfil'/>
                        ) : (
                            <img src={avatar} title='Foto de perfil'/>
                        )}
                    </label>
                </form>
            </div>
        </div>
    )
}