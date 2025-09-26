import { Link, useNavigate, useParams } from "react-router-dom"
import Client from "../../types/client";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import ClientCard from "../../components/ClientCard";
import { useTranslation } from "react-i18next";

export default function ClientView(){
    const { id } = useParams();
    const [ client, setClient ] = useState<Client>();

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        api.get('/api/clients/'+id)
            .then(response => {
                setClient(response.data.data);
            })
            .catch(err => {
                navigate(-1)
            })
    },[]);

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li><Link to="/clients">{t('Clients')}</Link></li>
                    <li>{client?.name}</li>
                </ul>
            </div>
            <ClientCard client={client}/>
        </>
    )
}