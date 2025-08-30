import { Link, redirect, useLoaderData, useNavigate, useParams } from "react-router-dom"
import Client from "../../types/client";
import { useEffect, useState } from "react";
import { getClient } from "../../api/clientApi";

export default function ClientView(){
    const { id } = useParams();
    const [ client, setClient ] = useState<Client>();

    const navigate = useNavigate();

    useEffect(() => {
        getClient(Number(id))
            .then(client => {
                setClient(client);
            })
            .catch(err => {
                navigate(-1)
            })
    },[]);

    if(!client) return <p>Loading</p>

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/clients">Clients</Link></li>
                    <li>{client.name}</li>
                </ul>
            </div>
        </>
    )
}