import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import api from "../../api/axios";
import Order from "../../types/order";
import ClientCard from "../../components/ClientCard";
import { useTranslation } from "react-i18next";
import ProductsTable from "./ProductsTable";

export default function OrderView(){
    const { id } = useParams();
    const [ order, setOrder ] = useState<Order>();

    const {t} = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/api/orders/'+id)
            .then(response => {
                setOrder(response.data.data);
            })
            .catch(err => {
                navigate(-1)
            })
    },[]);

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li><Link to="/orders">{t('Orders')}</Link></li>
                    <li>{id}</li>
                </ul>
            </div>
            <ClientCard client={order?.client}/>
            <div className="card w-full bg-base-100 shadow-sm mt-2">
                <ProductsTable products={order?.products}/>
            </div>
        </>
    )
}