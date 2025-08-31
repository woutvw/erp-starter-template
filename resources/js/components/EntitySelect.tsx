import { useEffect, useState } from "react"
import Supplier from "../types/supplier";
import api from "../api/axios";

interface EntitySelectProps {
    label: string
    value: number|undefined
    onChange: React.ChangeEventHandler<HTMLSelectElement>
}

export default function EntitySelect({label, value, onChange}: EntitySelectProps){
    const [ suppliers, setSuppliers ] = useState<Supplier[]>([]);

    useEffect(() => {
        api.get('api/suppliers')
            .then(response => {
                const suppliers = response.data.data;
                setSuppliers(suppliers);
            })
    },[])

    return (
        <select className="select focus:outline-none w-full" value={value} onChange={onChange}>
            <option disabled={true}>{label}</option>
            {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
            ))}
        </select>
    )
}