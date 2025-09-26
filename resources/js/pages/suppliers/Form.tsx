import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import ApiErrors from "../../types/apiErrors";
import Supplier from "../../types/supplier";

interface SupplierFormProps {
    supplier?: Supplier
    errors: ApiErrors
    onSave: (client: Omit<Supplier, 'id'>) => void
}

export default function SupplierForm({ supplier, errors, onSave }: SupplierFormProps){
    const [name, setName] = useState('');

    const {t} = useTranslation();

    useEffect(() => {
        if(supplier){
            setName(supplier.name);
        }
    }, [supplier])

    function submit(e: React.FormEvent){
        e.preventDefault();

        onSave({
            name: name
        })
    }

    return (
        <form className="card bg-base-100 p-4" onSubmit={submit}>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('Name')}*</legend>
                <input value={name} onChange={e => setName(e.target.value)} className="input focus:outline-none w-full"/>
                { errors.name ? <p className="label text-error">{errors.name[0]}</p> : <></>}
            </fieldset>
            <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">{t('Save')}</button>
            </div>
        </form>
    )
}