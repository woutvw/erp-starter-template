import { useEffect, useState } from "react"
import { getClients } from "../../api/clientApi";
import Client from "../../types/client";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ClientList() {
    const [clients, setClients] = useState<Client[]>([]);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        getClients()
            .then((clients) => {
                setClients(clients);
            })
    }, [])

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li>{t('Clients')}</li>
                </ul>
            </div>
            <div className="mb-2 flex justify-between">
                <input className="input focus:outline-none" />
                <Link to="/clients/create" className="btn btn-primary">{t('Create client')}</Link>
            </div>
            <div className="rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
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
                                <td>Remove</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}