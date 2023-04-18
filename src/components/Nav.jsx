
import { useUserContext } from "../context/UserContext";
import { logOut } from "../router/firebase";



const Nav = () => {
  const { user } = useUserContext();
  const handleLogout =  async ()=> {
    try {
      
      logOut()
      
    } catch (error) {
      console.log(error);
    }
  }
  
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/proyecto-cotizador">Cotizador</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="/proyecto-cotizador/login">Historial</a>
            </div>
            {
              user && <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            }
          </div>
        
        </div>
      </nav>

    );
}
 
export default Nav;