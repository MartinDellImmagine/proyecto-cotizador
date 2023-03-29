import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Pie from "../components/Pie.jsx";




const LayoutPublic = () => {
    return (
        <>  
            <Nav />
            <main>
                <Outlet />
            </main>
            <Pie />
        </>
    );
}
 
export default LayoutPublic;