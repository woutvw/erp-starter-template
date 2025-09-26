import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import OrderForm from "./Form";
import ApiErrors from "../../types/apiErrors";

export default function OrderCreate(){
    const [errors, setErrors] = useState<ApiErrors>({});

    const navigate = useNavigate();
    const {t} = useTranslation();

    function submit(newOrder: any){
        api.post('api/orders', newOrder)
            .then(response => {
                const order = response.data.data;
                navigate('/orders/'+order.id)
            })
            .catch(err => {
                setErrors(err.response.data.errors)
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
            <OrderForm errors={errors} onSave={submit}/>
        </>
    )
}