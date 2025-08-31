import { useEffect, useState } from "react"
import { getClients } from "../../api/clientApi";
import Client from "../../types/client";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "../../components/Icon";
import useDebounce from "../../hooks/useDebounce";

export default function ClientList() {
    const [clients, setClients] = useState<Client[]>([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    const debouncedSearch = useDebounce(search, 400);

    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        fetchClients(1);
    }, [debouncedSearch])

    function fetchClients(page: number){
        getClients(debouncedSearch, page)
            .then(({clients, meta}) => {
                setClients(clients);
                setCurrentPage(meta.current_page);
                setLastPage(meta.last_page);
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
            <div className="mb-2 flex justify-between">
                <input className="input focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                <td>
                                    <button className="hover:text-error">
                                        <Icon name="bin" className="w-5"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end">
                <div className="join mt-2">
                    <button className="join-item btn" disabled={currentPage === 1} onClick={() => fetchClients(currentPage - 1)}>«</button>
                    <button className="join-item btn">{t('Page')} {currentPage}</button>
                    <button className="join-item btn" disabled={currentPage === lastPage} onClick={() => fetchClients(currentPage + 1)}>»</button>
                </div>
            </div>
        </>
    )
}