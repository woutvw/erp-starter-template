import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import ClientForm from "./Form";
import Client from "../../types/client";

export default function ClientCreate(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();
    const {t} = useTranslation();

    function submit(newClient: Client){
        api.post('/api/clients',newClient)
            .then((response) => {
                const client = response.data.data;
                console.log(client);
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
            <ClientForm onSave={submit}/>
        </>
    )
}