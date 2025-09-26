import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClientForm from "./Form";
import Client from "../../types/client";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ClientUpdate(){
    const { id } = useParams();

    const [client, setClient] = useState<Client>()

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        api.get('api/clients/'+id)
            .then(response => {
                const client = response.data.data;

                setClient(client);
            })
            .catch(err => {
                navigate(-1)
            })
    },[]);

    function submit(newClient: Client){
        api.put('api/clients/'+id, newClient)
            .then(response => {
                const client = response.data.data;
                navigate('/clients/'+client.id)
            })
    }

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li><Link to="/clients">{t('Clients')}</Link></li>
                    <li><Link to={"/clients/"+id}>{id}</Link></li>
                    <li>{t('Edit')}</li>
                </ul>
            </div>
            <ClientForm client={client} onSave={submit}/>
        </>
    )
}