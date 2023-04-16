import { useState } from "react";
import { register } from "../router/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { user } = useUserContext()
    useRedirectActiveUser(user, "/dashboard")

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Registrando');

        try {
            const credentialUser = await register({ email, password })
            Swal.fire({
                icon: 'success',
                text: 'User Register Successfully',
              })
            console.log(credentialUser);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login fails',
                text: `${error}`
              })
        }
    }
    return (


        <>
            <div className="container">
                <h1 className="mt-5">Register</h1>

                <form className="mt-5" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input className="form-control" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <input className="form-control" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    </div>
                    <Link to={"/login"}>I already have an account</Link> <br />
                    <button className="btn btn-success mt-3" type="submit">Register</button>


                </form>
            </div>

        </>
    )
};

export default Register;
