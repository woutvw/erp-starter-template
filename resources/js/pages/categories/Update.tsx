import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import SupplierForm from "./Form";
import Supplier from "../../types/supplier";
import ApiErrors from "../../types/apiErrors";
import Category from "../../types/category";
import CategoryFrom from "./Form";

export default function CategoryUpdate(){
    const { id } = useParams();

    const [category, setCategory] = useState<Category>();
    const [errors, setErrors] = useState<ApiErrors>({});

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        api.get('api/categories/'+id)
            .then(response => {
                const category = response.data.data;

                setCategory(category);
            })
            .catch(err => {
                navigate(-1)
            })
    },[]);

    function submit(newCategory: Omit<Category, 'id'>){
        api.put('api/categories/'+id, newCategory)
            .then(response => {
                const category = response.data.data;
                navigate('/categories/'+category.id)
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
                    <li><Link to="/categories">{t('Categories')}</Link></li>
                    <li><Link to={"/categories/"+id}>{id}</Link></li>
                    <li>{t('Update')}</li>
                </ul>
            </div>
            <CategoryFrom category={category} errors={errors} onSave={submit}/>
        </>
    )
}