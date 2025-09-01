import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";

export default function SupplierCreate(){
    const [name, setName] = useState('');

    const navigate = useNavigate();
    const {t} = useTranslation();

    function submit(e: React.FormEvent){
        e.preventDefault();

        api.post('api/suppliers', {
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
                    <li><Link to="/products">{t('Products')}</Link></li>
                    <li>{t('Create')}</li>
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