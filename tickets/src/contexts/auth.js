import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(null)
  const navigate = useNavigate();

  function storageUser(data) {
    localStorage.setItem('@ticketsPRO', JSON.stringify(data))
  }

  async function signIn(email, password) {
    setLoadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)

      .then(async (value) => {
        let uid = value.user.uid

        const docRef = doc(db, "users", uid)

        const docSnap = await getDoc(docRef)

        let data = {
          uid: uid,
          nome: docSnap.data().nome,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl
        }

        setUser(data)
        storageUser(data)
        setLoadingAuth(false)
        toast.success("Bem vindo(a) de volta!")
        navigate("/dashboard")
      })

      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
        toast.error(error.message);
      }) 

  }

  async function signUp(name, email, password) {

    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {

        let uid = value.user.uid

        await setDoc(doc(db, "users", uid), {
          nome: name,
          avatarUrl: null
        })

          .then(() => {
            toast.success('Cadastrado com Sucesso!')
            let data = {
              uid: uid,
              nome: name,
              email: value.user.email,
              avatarUrl: null
            }

            setUser(data);
            setLoadingAuth(false)
            storageUser(data)
            navigate("/dashboard")

          })
      })

      .catch((error) => {
        toast.error(error.message)
        setLoadingAuth(false)
      })

  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        loadingAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;