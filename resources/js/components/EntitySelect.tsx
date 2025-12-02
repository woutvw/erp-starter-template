import { useEffect, useState } from "react"
import api from "../api/axios";

interface EntitySelectProps {
    uri: string
    label: string
    value: number|undefined
    onChange: React.ChangeEventHandler<HTMLSelectElement>
}

export default function EntitySelect({uri, label, value, onChange}: EntitySelectProps){
    const [ records, setRecords ] = useState<any[]>([]);

    useEffect(() => {
        api.get(uri)
            .then(response => {
                setRecords(response.data.data);
            })
    },[])

    return (
        <select className="select focus:outline-none w-full" value={value ?? ''} onChange={onChange}>
            <option value="" disabled={true}>{label}</option>
            {records.map(record => (
                <option key={record.id} value={record.id}>{record.name}</option>
            ))}
        </select>
    )
}