import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import Client from "../../types/client";
import SearchableClientSelect from "../../components/SearchableClientSelect";
import OrderProduct from "../../types/orderProduct";
import OrderProductModal from "./OrderProductModal";
import ProductsTable from "./ProductsTable";

export default function OrderCreate(){
    const [modalOpen, setModalOpen] = useState(false)

    const [client, setClient] = useState<Client>()
    const [products, setProducts] = useState<OrderProduct[]>([]);

    const navigate = useNavigate();
    const {t} = useTranslation();

    function submit(e: React.FormEvent){
        e.preventDefault();

        api.post('api/orders', {
                client_id: client?.id,
                products: products
            })
            .then(response => {
                const order = response.data.data;
                navigate('/orders/'+order.id)
            })
    }

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li><Link to="/orders">{t('Orders')}</Link></li>
                    <li>{t('Create')}</li>
                </ul>
            </div>
            <form className="card bg-base-100 p-4" onSubmit={submit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Client')}*</legend>
                    <SearchableClientSelect client={client} onChange={(client) => setClient(client)}/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Products')}*</legend>
                    <ProductsTable products={products}/>
                    <button type="button" className="btn" onClick={() => setModalOpen(true)}>{t('Add product')}</button>
                </fieldset>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">{t('Save')}</button>
                </div>
            </form>
            <OrderProductModal modalOpen={modalOpen} onCloseModal={() => setModalOpen(false)} onSaveProduct={product => setProducts([...products, product])}/>
        </>
    )
}