import React, { useEffect, useState } from "react"
import api from "../api/axios";
import Client from "../types/client";
import useDebounce from "../hooks/useDebounce";

interface SearchableClientSelectProps {
    client: Client|undefined
    onChange: (client: Client) => void
}

export default function SearchableClientSelect({client, onChange}: SearchableClientSelectProps){
    const [ clients, setClients ] = useState<Client[]>([]);

    const [ search, setSearch ] = useState('');
    const debouncedSearch = useDebounce(search, 400);

    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        if(client) setSearch(client.name);
    },[client])

    useEffect(() => {
        api.get('/api/clients', {
            params: {
                search: debouncedSearch
            }
        })
            .then(response => {
                const data = response.data.data;
                setClients(data);
            })
    },[debouncedSearch])

    function handleFocus(e: React.FocusEvent<HTMLInputElement>){
        if(search){
            // TODO: select all chars in the input
        }
        setOpen(true);
    }

    function handleBlur(){
        setTimeout(() => {
            setOpen(false);
        },100)
    }

    function Options(){
        return (
            <div className="rounded bg-white border absolute w-full mt-1 max-h-40 overflow-auto z-10">
                {clients.map((client) => (
                    <div key={client.id} className="p-2 hover:bg-base-200 cursor-pointer" onClick={() => onChange(client)}>
                        <p>{client?.name}</p>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="relative">
            <input value={search} onChange={(e) => setSearch(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} className="input select focus:outline-none w-full"/>
            { open && <Options/> }
        </div>
    )
}