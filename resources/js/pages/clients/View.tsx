import { Link, useNavigate, useParams } from "react-router-dom"
import Client from "../../types/client";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import ClientCard from "../../components/ClientCard";

export default function ClientView(){
    const { id } = useParams();
    const [ client, setClient ] = useState<Client>();

    const navigate = useNavigate();

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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/clients">Clients</Link></li>
                    <li>{client?.name}</li>
                </ul>
            </div>
            <ClientCard client={client}/>
        </>
    )
}