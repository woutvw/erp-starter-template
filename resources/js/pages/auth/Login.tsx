import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const { login } = useAuth();

    const navigate = useNavigate();

    function submit(e: React.FormEvent){
        e.preventDefault();

        login(email, password, rememberMe)
            .then(() => {
                navigate('/');
            });
    }

    return (
        <form className="max-w-full w-lg p-4" onSubmit={submit}>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input focus:outline-none w-full"/>
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input focus:outline-none  w-full"/>
            </fieldset>
            <div className="my-4 flex justify-between">
                <label className="label">
                    <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="toggle" />
                    Remember me
                </label>
                <Link to="/recover-password" className="link">Forgot password?</Link>
            </div>
            <button type="submit" className="btn btn-primary w-full">Login</button>
            <div className="flex justify-end mt-4">
                <Link to="/register" className="link">Create an account</Link>
            </div>
        </form>
    )
}