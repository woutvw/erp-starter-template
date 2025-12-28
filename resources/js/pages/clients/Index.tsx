import { useState } from "react"
import Client from "../../types/client";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "../../components/Icon";
import DataTable from "../../components/DataTable";
import api from "../../api/axios";

export default function ClientList() {
    const [clients, setClients] = useState<Client[]>([]);

    const { t } = useTranslation();
    const navigate = useNavigate();

    function removeClient(client: Client){
        api.delete('/api/clients/'+client.id)
            .then(() => {
                setClients([ ...clients.filter(oldClient => oldClient.id !== client.id) ]);
            })
    }

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li>{t('Clients')}</li>
                </ul>
            </div>
            <DataTable uri="api/clients" createLink="/clients/create" createText="Create client" onDataUpdate={(clients) => setClients(clients)}>
                <thead>
                    <tr>
                        <th>{t('Name')}</th>
                        <th>{t('Email')}</th>
                        <th>{t('Phone')}</th>
                        <th>{t('Address')}</th>
                        <th>{t('City')}</th>
                        <th>{t('Postal code')}</th>
                        <th>{t('VAT')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id} onClick={() => { navigate('/clients/' + client.id) }} className="hover:bg-base-300 cursor-pointer">
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.address}</td>
                            <td>{client.city}</td>
                            <td>{client.postal_code}</td>
                            <td>{client.vat}</td>
                            <td className="flex justify-center">
                                <Link onClick={e => {e.stopPropagation()}} to={'/clients/'+client.id+'/edit'} className="hover:text-primary">
                                    <Icon name="pencil" className="w-5"/>
                                </Link>
                                <button onClick={e => {e.stopPropagation(); removeClient(client)}} className="hover:text-error cursor-pointer">
                                    <Icon name="bin" className="w-5"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </DataTable>
        </>
    )
}