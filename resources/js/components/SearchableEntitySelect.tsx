import { useEffect, useState } from "react"
import api from "../api/axios";

interface EntitySelectProps<T> {
    uri: string
    label: string
    value: number|undefined
    onChange: (entity: T) => void
}

export default function SearchableEntitySelect<T>({uri, label, value, onChange}: EntitySelectProps<T>){
    const [ data, setData ] = useState<T[]>([]);

    useEffect(() => {
        api.get(uri)
            .then(response => {
                const data = response.data.data;
                setData(data);
            })
    },[])

    return (
        <select className="select focus:outline-none w-full" value={value} onChange={onChange}>
            <option disabled={true}>{label}</option>
            {data.map(record => (
                <option key={record.id} value={record.id}>{record.name}</option>
            ))}
        </select>
    )
}