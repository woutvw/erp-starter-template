import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import ClientForm from "./Form";
import Client from "../../types/client";
import ApiErrors from "../../types/apiErrors";

export default function ClientCreate(){
    const [errors, setErrors] = useState<ApiErrors>({});

    const navigate = useNavigate();
    const {t} = useTranslation();

    function submit(newClient: Omit<Client, "id">){
        api.post('/api/clients',newClient)
            .then((response) => {
                const client = response.data.data;
                navigate('/clients/'+client.id);
            })
            .catch(err => {
                setErrors(err.response.data.errors);
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
            <ClientForm errors={errors} onSave={submit}/>
        </>
    )
}