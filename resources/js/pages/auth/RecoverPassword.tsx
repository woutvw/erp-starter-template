import { useState } from "react"
import { Link } from "react-router-dom";

export default function RecoverPassword(){
    const [email, setEmail] = useState('');

    function submit(e: React.FormEvent){
        e.preventDefault();

        console.log(email);
    }

    return (
        <form className="max-w-full w-lg p-4" onSubmit={submit}>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input focus:outline-none w-full"/>
            </fieldset>
            <button type="submit" className="btn btn-primary w-full mt-4">Recover</button>
            <div className="flex justify-end mt-4">
                <Link to="/login" className="link">Login</Link>
            </div>
        </form>
    )
}