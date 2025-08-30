import { useEffect, useState } from "react"
import { getClients } from "../../api/clientApi";
import Client from "../../types/client";
import { Link } from "react-router-dom";

export default function ClientList() {
    const [clients, setClients] = useState<Client[]>([]);

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
                    <li><Link to="/">Home</Link></li>
                    <li>Clients</li>
                </ul>
            </div>
            <div className="mb-2 flex justify-between">
                <input className="input"/>
                <Link to="/clients/create" className="btn btn-primary">Create client</Link>
            </div>
            <div className="rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Postal code</th>
                            <th>VAT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.phone}</td>
                                <td>{client.address}</td>
                                <td>{client.city}</td>
                                <td>{client.postal_code}</td>
                                <td>{client.vat}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}