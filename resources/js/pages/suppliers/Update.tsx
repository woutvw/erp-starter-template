import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import SupplierForm from "./Form";
import Supplier from "../../types/supplier";
import ApiErrors from "../../types/apiErrors";

export default function SupplierUpdate(){
    const { id } = useParams();

    const [supplier, setSupplier] = useState<Supplier>();
    const [errors, setErrors] = useState<ApiErrors>({});

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        api.get('/api/suppliers/'+id)
            .then(response => {
                const supplier = response.data.data;

                setSupplier(supplier);
            })
            .catch(err => {
                navigate(-1)
            })
    },[]);

    function submit(newSupplier: Omit<Supplier, 'id'>){
        api.put('/api/suppliers/'+id, newSupplier)
            .then(response => {
                const supplier = response.data.data;
                navigate('/suppliers/'+supplier.id)
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
                    <li><Link to="/suppliers">{t('Suppliers')}</Link></li>
                    <li><Link to={"/suppliers/"+id}>{id}</Link></li>
                    <li>{t('Update')}</li>
                </ul>
            </div>
            <SupplierForm supplier={supplier} errors={errors} onSave={submit}/>
        </>
    )
}