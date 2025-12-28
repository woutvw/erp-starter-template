import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import ApiErrors from "../../types/apiErrors";
import CategoryFrom from "./Form";
import Category from "../../types/category";

export default function CategoryCreate(){
    const [errors, setErrors] = useState<ApiErrors>({})

    const navigate = useNavigate();
    const {t} = useTranslation();

    function submit(newCategory: Omit<Category, "id">){
        api.post('/api/categories', newCategory)
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
                    <li>{t('Create')}</li>
                </ul>
            </div>
            <CategoryFrom errors={errors} onSave={submit}/>
        </>
    )
}