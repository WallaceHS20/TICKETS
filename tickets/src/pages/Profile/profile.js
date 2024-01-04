import Header from '../../components/Header'
import Title from '../../components/Title'
import avatar from '../../assets/avatar.png'

import { useContext, useState } from 'react'
import { FiSettings, FiUpload } from 'react-icons/fi'
import {AuthContext} from '../../contexts/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../services/firebaseConnection'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import './profile.css';
import { toast } from 'react-toastify'

export default function Profile(){

  const { user, storageUser, setUser, logOut } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
  const [nome, setNome] = useState(user && user.nome)
  const [email, setEmail] = useState(user && user.email)
  const [imageAvatar, setImageAvatar] = useState(null)

  function handleFile(e){
    if(e.target.files[0]){
        const image = e.target.files[0];

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(image))
        }
        else{
            toast.error('Arquivo Não Compatível !')
            setImageAvatar(null)
            return
        }
    }
  }

  async function handleUpload(){
    const currentId = user.uid

    const uploadRef = ref(storage, `images/${currentId}/${imageAvatar.name}`)

    const uploadTask = uploadBytes(uploadRef, imageAvatar)
    .then((response) =>{
        getDownloadURL(response.ref).then( async (downloadUrl) => {
            let urlFoto = downloadUrl

            const docRef = doc(db, "users", user.uid)
            await updateDoc(docRef, {
                avatarUrl: urlFoto,
                nome: nome
            })

            .then(() =>{
                let data = {
                    ...user,
                    nome: nome,
                    avatarUrl: urlFoto
                }
    
                setUser(data)
                storageUser(data)
    
                toast.success("Perfil Atualizado Com Sucesso !")
            })
        })
    })
  }

  async function handleSubmit(e){
    e.preventDefault();

    if(imageAvatar === null && nome != ''){
        //atualizar apenas nome
        const docRef = doc(db, "users", user.uid)
        await updateDoc(docRef, {
            nome: nome
        })

        .then(() => {
            let data = {
                ...user,
                nome: nome,
            }

            setUser(data)
            storageUser(data)

            toast.success("Perfil Atualizado Com Sucesso !")
        })
    }

    else if (nome !== '' && imageAvatar !== null){
        handleUpload()
    }
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Minha conta">
          <FiSettings size={25} />
        </Title>

       <div className="container">

        <form className="form-profile" onSubmit={handleSubmit}>
          <label className="label-avatar">
            <span>
              <FiUpload color="#FFF" size={25} />
            </span>

            <input type="file" accept="image/*" onChange={handleFile} /> <br/>
            {avatarUrl === null ? (
              <img src={avatar} alt="Foto de perfil" width={250} height={250} />
            ) : (
              <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
            )}

          </label>

          <label>Nome</label>
          <input
          type="text"
          value={nome}
          placeholder="Seu nome"
          onChange={(e) => setNome(e.target.value)}
          />

          <label>Email</label>
          <input type="text" value={email} disabled={true} />
          
          <button className='save-button' type="submit">Salvar</button>
        </form>

       </div>

       <div className="container">
         <button onClick={logOut} className="logout-btn">Sair</button>
       </div>

      </div>

    </div>
  )
}