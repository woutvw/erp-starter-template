import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useTranslation } from "react-i18next";
import Supplier from "../../types/supplier";
import SupplierCard from "../../components/SupplierCard";

export default function SupplierView(){
    const { id } = useParams();
    const [ supplier, setSupplier ] = useState<Supplier>();

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        api.get('/api/suppliers/'+id)
            .then(response => {
                setSupplier(response.data.data);
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
                    <li><Link to="/suppliers">{t('Suppliers')}</Link></li>
                    <li>{supplier?.name}</li>
                </ul>
            </div>
            <SupplierCard supplier={supplier}/>
        </>
    )
}