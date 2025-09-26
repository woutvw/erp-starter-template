import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import ProductForm from "./Form";
import ApiErrors from "../../types/apiErrors";

export default function ProductCreate(){
    const [errors, setErrors] = useState<ApiErrors>({});

    const navigate = useNavigate();
    const {t} = useTranslation();

    function submit(newProduct: any){
        api.post('api/products', newProduct)
            .then(response => {
                const product = response.data.data;
                navigate('/products/'+product.id)
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
                    <li><Link to="/products">{t('Products')}</Link></li>
                    <li>{t('Create')}</li>
                </ul>
            </div>
            <ProductForm errors={errors} onSave={submit}/>
        </>
    )
}