import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import SearchableEntitySelect from "../../components/SearchableEntitySelect";
import Client from "../../types/client";

export default function OrderCreate(){
    const [client, setClient] = useState<Client>()
    const [clientId, setClientId] = useState(0);

    const navigate = useNavigate();
    const {t} = useTranslation();

    function submit(e: React.FormEvent){
        e.preventDefault();

        api.post('api/orders', {
                client_id: clientId,
            })
            .then(response => {
                const order = response.data.data;
                navigate('/orders/'+order.id)
            })
    }

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li><Link to="/orders">{t('Orders')}</Link></li>
                    <li>{t('Create')}</li>
                </ul>
            </div>
            <form className="card bg-base-100 p-4" onSubmit={submit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Name')}*</legend>
                    <SearchableEntitySelect<Client> uri="/api/clients" label="Select a client" value={clientId} onChange={(client) => setClient(client)}/>
                </fieldset>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">{t('Save')}</button>
                </div>
            </form>
        </>
    )
}