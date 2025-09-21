import Client from "../types/client";

interface ClientCardProps{
    client?: Client
}

export default function ClientCard({ client }: ClientCardProps){
    if(client) return (
        <div className="card w-full bg-base-100 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{client.name}</h2>
                <p className="text-base-content/50">{client.address}, {client.postal_code} {client.city}</p>
                <p><a href={'mailto:'+client.email} className="link link-primary">{client.email}</a></p>
                <p><a href={'tel:'+client.phone} className="link link-primary">{client.phone}</a></p>
            </div>
        </div>
    )

    return (
        <div className="card w-full bg-base-100 shadow-sm">
            <div className="card-body">
                <h2 className="card-title skeleton rounded-full h-6 w-50 pb-0.5"></h2>
                <p className="card-title skeleton rounded-full mt-2.5 h-4 w-96"></p>
                <p className="card-title skeleton rounded-full mt-1 h-4 w-52"></p>
                <p className="card-title skeleton rounded-full mt-1 h-4 w-44"></p>
            </div>
        </div>
    )
}