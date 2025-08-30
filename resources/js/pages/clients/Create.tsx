import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "../../api/clientApi";

export default function ClientCreate(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    function submit(e: React.FormEvent){
        e.preventDefault();

        createClient({
                name: name,
                email: email,
                phone: phone,
                address: address
            })
            .then((client) => {
                console.log(client);
            })
    }

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/clients">Clients</Link></li>
                    <li>Create</li>
                </ul>
            </div>
            <form className="card bg-base-100 p-4" onSubmit={submit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Name*</legend>
                    <input value={name} onChange={e => setName(e.target.value)} className="input focus:outline-none w-full"/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email</legend>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="input focus:outline-none w-full"/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Phone</legend>
                    <input value={phone} onChange={e => setPhone(e.target.value)} className="input focus:outline-none w-full"/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Address</legend>
                    <input value={address} onChange={e => setAddress(e.target.value)} className="input focus:outline-none w-full"/>
                </fieldset>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </>
    )
}