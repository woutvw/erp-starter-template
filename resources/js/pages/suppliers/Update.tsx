import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";

export default function SupplierUpdate(){
    const { id } = useParams();

    const [name, setName] = useState('');

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        api.get('api/suppliers/'+id)
            .then(response => {
                const supplier = response.data.data;

                setName(supplier.name);
            })
            .catch(err => {
                navigate(-1)
            })
    },[]);

    function submit(e: React.FormEvent){
        e.preventDefault();

        api.put('api/suppliers/'+id, {
                name: name,
            })
            .then(response => {
                const supplier = response.data.data;
                navigate('/suppliers/'+supplier.id)
            })
    }

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li><Link to="/suppliers">{t('Suppliers')}</Link></li>
                    <li><Link to={"/suppliers/"+id}>{t('Suppliers')}</Link></li>
                    <li>{t('Update')}</li>
                </ul>
            </div>
            <form className="card bg-base-100 p-4" onSubmit={submit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Name')}*</legend>
                    <input value={name} onChange={e => setName(e.target.value)} className="input focus:outline-none w-full"/>
                </fieldset>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">{t('Save')}</button>
                </div>
            </form>
        </>
    )
}