import { useState } from "react";
import { login } from "../router/firebase";
import Swal from "sweetalert2";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { user } = useUserContext()
    useRedirectActiveUser(user, "/proyecto-cotizador/dashboard")

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('logeando');
        
        try {
            const credentialUser = await login({ email, password })

            Swal.fire({
                icon: 'success',
                text: 'Login Success',
              })
           // console.log(credentialUser);
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login fails',
                text: `${error}`
              })
        }
    }


    if (user === false) return <></>
    return (


        <>
            <div className="container">
                <h1 className="mt-5">Login</h1>
                <form className="mt-5" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input className="form-control" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <p id="emailHelp" className="form-text">We'll never share your email with anyone else.</p>
                    </div>
                    
                    <div className="mb-3">
                        <input className="form-control" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    </div>
                    <p className="text-center"><Link to={'/proyecto-cotizador/register'}>if you dont have an account click here</Link><br /></p>

                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>

        </>
    )
};

export default Login;
