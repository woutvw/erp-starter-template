import { useEffect, useState } from "react"
import Client from "../../types/client"
import { useTranslation } from "react-i18next";
import ApiErrors from "../../types/apiErrors";

interface ClientFormProps {
    client?: Client
    errors: ApiErrors
    onSave: (client: Omit<Client, 'id'>) => void
}

export default function ClientForm({ client, errors, onSave }: ClientFormProps){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const {t} = useTranslation();

    useEffect(() => {
        if(client){
            setName(client.name);
            setEmail(client.email || '');
            setPhone(client.phone || '');
            setAddress(client.address || '');
        }
    }, [client])

    function submit(e: React.FormEvent){
        e.preventDefault();

        onSave({
            name: name,
            email: email,
            phone: phone,
            address: address
        })
    }

    return (
        <form className="card bg-base-100 p-4" onSubmit={submit}>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('Name')}*</legend>
                <input value={name} onChange={e => setName(e.target.value)} className="input focus:outline-none w-full"/>
                { errors.name ? <p className="label text-error">{errors.name[0]}</p> : <></>}
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('Email')}</legend>
                <input value={email} onChange={e => setEmail(e.target.value)} className="input focus:outline-none w-full"/>
                { errors.email ? <p className="label text-error">{errors.email[0]}</p> : <></>}
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('Phone')}</legend>
                <input value={phone} onChange={e => setPhone(e.target.value)} className="input focus:outline-none w-full"/>
                { errors.phone ? <p className="label text-error">{errors.phone[0]}</p> : <></>}
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('Address')}</legend>
                <input value={address} onChange={e => setAddress(e.target.value)} className="input focus:outline-none w-full"/>
                { errors.address ? <p className="label text-error">{errors.address[0]}</p> : <></>}
            </fieldset>
            <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">{t('Save')}</button>
            </div>
        </form>
    )
}