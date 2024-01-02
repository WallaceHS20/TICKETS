import { useContext  } from "react"
import { AuthContext } from "../../contexts/auth"

export default function Dashboard(){
  const { logOut } = useContext(AuthContext);

  async function handleLogout(){
    await logOut()
  }
    return(
      <div>
        <h1>Pagina Dashboard</h1>
        <button onClick={handleLogout}>Sair</button>
      </div>
    )
  }