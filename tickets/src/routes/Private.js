import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth';

export default function Private({ children }){

    const { signed, checkingStatus } = useContext(AuthContext);

    if (checkingStatus) {
        return <div>Carregando...</div>;
      }
    
      if (!signed) {
        return <Navigate to="/" />;
      }
    
      return children;

}