import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function submit(e: React.FormEvent){
        e.preventDefault();

        console.log(email, password);
    }

    return (
        <form className="max-w-full w-lg p-4">
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Name</legend>
                <input value={name} onChange={e => setName(e.target.value)} className="input focus:outline-none w-full"/>
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input value={email} onChange={e => setEmail(e.target.value)}  className="input focus:outline-none w-full"/>
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input value={password} onChange={e => setPassword(e.target.value)}  type="password" className="input focus:outline-none  w-full"/>
            </fieldset>
            <button className="btn btn-primary w-full mt-4">Register</button>
            <div className="flex justify-end mt-4">
                <Link to="/login" className="link">I already have an account</Link>
            </div>
        </form>
    )
}