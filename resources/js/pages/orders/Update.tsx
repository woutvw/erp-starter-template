import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import Client from "../../types/client";
import OrderProduct from "../../types/orderProduct";
import SearchableClientSelect from "../../components/SearchableClientSelect";
import OrderProductModal from "./OrderProductModal";

export default function OrderUpdate(){
    const { id } = useParams();

    const [modalOpen, setModalOpen] = useState(false)

    const [client, setClient] = useState<Client>()
    const [products, setProducts] = useState<OrderProduct[]>([]);

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        api.get('api/orders/'+id)
            .then(response => {
                const order = response.data.data;

                setClient(order.client);
                setProducts(order.products);
            })
            .catch(err => {
                navigate(-1)
            })
    },[]);


    function submit(e: React.FormEvent){
        e.preventDefault();

        api.put('api/orders/'+id, {
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
                    <table className="table">
                        <thead>
                            <tr>
                                <th>{t('Name')}</th>
                                <th>{t('Price')}</th>
                                <th>{t('Quantity')}</th>
                                <th>{t('Total')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, idx) => (
                                <tr key={idx}>
                                    <td>{product.name}</td>
                                    <td>€ {product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>€ {product.price * product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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