import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import api from "../../api/axios";
import Product from "../../types/product";
import { useTranslation } from "react-i18next";

export default function ProductView(){
    const { id } = useParams();
    const [ product, setProduct ] = useState<Product>();

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        api.get('api/products/'+id)
            .then(response => {
                setProduct(response.data.data);
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
                    <li><Link to="/products">{t('Products')}</Link></li>
                    <li>{product?.sku}</li>
                </ul>
            </div>
        </>
    )
}