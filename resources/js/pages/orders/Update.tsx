import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import Client from "../../types/client";
import OrderProduct from "../../types/orderProduct";
import Order from "../../types/order";
import OrderForm from "./Form";
import ApiErrors from "../../types/apiErrors";

export default function OrderUpdate(){
    const { id } = useParams();

    const [order, setOrder] = useState<Order>();
    const [errors, setErrors] = useState<ApiErrors>({});

    const [modalOpen, setModalOpen] = useState(false)

    const [client, setClient] = useState<Client>()
    const [products, setProducts] = useState<OrderProduct[]>([]);

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        api.get('/api/orders/'+id)
            .then(response => {
                const order = response.data.data;

                setOrder(order);
            })
            .catch(err => {
                navigate(-1)
            })
    },[]);


    function submit(newOrder: any){
        api.put('/api/orders/'+id, newOrder)
            .then(response => {
                const order = response.data.data;
                navigate('/orders/'+order.id)
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            })
    }

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li><Link to="/orders">{t('Orders')}</Link></li>
                    <li><Link to={"/orders/"+id}>{id}</Link></li>
                    <li>{t('Edit')}</li>
                </ul>
            </div>
            <OrderForm order={order} errors={errors} onSave={submit}/>
        </>
    )
}