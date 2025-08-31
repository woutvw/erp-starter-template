import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import EntitySelect from "../../components/EntitySelect";

export default function ProductCreate(){
    const [sku, setSku] = useState('');
    const [name, setName] = useState('');
    const [supplier, setSupplier] = useState<number|undefined>();
    const [descripiton, setDescription] = useState('');
    const [salePrice, setSalePrice] = useState(0);
    const [purchasePrice, setPurchasePrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const navigate = useNavigate();
    const {t} = useTranslation();

    function submit(e: React.FormEvent){
        e.preventDefault();

        api.post('api/products', {
                sku: sku,
                name: name,
                supplier_id: supplier,
                description: descripiton,
                sale_price: salePrice,
                purchase_price: purchasePrice,
                quantity: quantity
            })
            .then(response => {
                const product = response.data.data;
                navigate('/products/'+product.id)
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
                    <legend className="fieldset-legend">{t('SKU')}*</legend>
                    <input value={sku} onChange={e => setSku(e.target.value)} className="input focus:outline-none w-full"/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Name')}*</legend>
                    <input value={name} onChange={e => setName(e.target.value)} className="input focus:outline-none w-full"/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Supplier')}*</legend>
                    <EntitySelect label="Select a supplier" value={supplier} onChange={e => setSupplier(Number(e.target.value))}/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Description')}</legend>
                    <input value={descripiton} onChange={e => setDescription(e.target.value)} className="input focus:outline-none w-full"/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Sale price')}</legend>
                    <input type="number" value={salePrice} onChange={e => setSalePrice(Number(e.target.value))} className="input focus:outline-none w-full"/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Purchase price')}</legend>
                    <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} className="input focus:outline-none w-full"/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Quantity')}</legend>
                    <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="input focus:outline-none w-full"/>
                </fieldset>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">{t('Save')}</button>
                </div>
            </form>
        </>
    )
}