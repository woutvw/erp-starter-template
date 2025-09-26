import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import ApiErrors from "../../types/apiErrors";
import ProductForm from "./Form";
import Product from "../../types/product";

export default function ProductUpdate(){
    const { id } = useParams();

    const [product, setProduct] = useState<Product>();
    const [errors, setErrors] = useState<ApiErrors>({});

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        api.get('api/products/'+id)
            .then(response => {
                const product = response.data.data;

                setProduct(product);
            })
            .catch(err => {
                navigate(-1)
            })
    },[]);

    function submit(newProduct: any){
        api.put('api/products/'+id, newProduct)
            .then(response => {
                const supplier = response.data.data;
                navigate('/products/'+supplier.id)
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
                    <li><Link to="/products">{t('Products')}</Link></li>
                    <li><Link to={"/products/"+id}>{id}</Link></li>
                    <li>{t('Update')}</li>
                </ul>
            </div>
            <ProductForm product={product} errors={errors} onSave={submit}/>
        </>
    )
}