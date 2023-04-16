import { useState } from "react";
import { login } from "../router/firebase";

import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { user } = useUserContext()
    useRedirectActiveUser(user, "/dashboard")

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('logenado');

        try {
            const credentialUser = await login({ email, password })
            console.log(credentialUser);
        } catch (error) {
            console.log(error);
        }
    }
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
                    <p className="text-center"><Link to={'/register'}>if you dont have an account click here</Link><br /></p>

                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>

        </>
    )
};

export default Login;
