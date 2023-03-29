import { useRouteError, Link } from "react-router-dom";

const NotFound = () => {
    const error = useRouteError()
    console.log(error);
    return (
        <>
            <div className="errorRoot">
                <h1 className="errorTitle">Error 404 not found</h1>
                <p className="errorMessage">Lo siento, la página que estás buscando no existe.</p>
                <p className="errorMessage">{error.statusText || error.message}</p>
                <Link className="errorBack" to={'/'}>Volver a la pagina principal</Link>
            </div>
        </>
    );
}
 
export default NotFound
