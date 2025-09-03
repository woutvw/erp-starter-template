import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";

export default function ClientCreate(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();
    const {t} = useTranslation();

    function submit(e: React.FormEvent){
        e.preventDefault();

        api.post('/api/clients',{
                name: name,
                    email: email,
                    phone: phone,
                    address: address
            })
            .then((response) => {
                const client = response.data.data;
                navigate('/clients/'+client.id);
            })
    }

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li><Link to="/clients">{t('Clients')}</Link></li>
                    <li>{t('Create')}</li>
                </ul>
            </div>
            <form className="card bg-base-100 p-4" onSubmit={submit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Name')}*</legend>
                    <input value={name} onChange={e => setName(e.target.value)} className="input focus:outline-none w-full"/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Email')}</legend>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="input focus:outline-none w-full"/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Phone')}</legend>
                    <input value={phone} onChange={e => setPhone(e.target.value)} className="input focus:outline-none w-full"/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Address')}</legend>
                    <input value={address} onChange={e => setAddress(e.target.value)} className="input focus:outline-none w-full"/>
                </fieldset>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">{t('Save')}</button>
                </div>
            </form>
        </>
    )
}