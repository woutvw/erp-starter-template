import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useTranslation } from "react-i18next";
import SupplierCard from "../../components/SupplierCard";
import Category from "../../types/category";

export default function CategoryView() {
    const { id } = useParams();
    const [category, setCategory] = useState<Category>();

    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        api.get('api/categories/' + id)
            .then(response => {
                setCategory(response.data.data);
            })
            .catch(err => {
                navigate(-1)
            })
    }, []);

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li><Link to="/categories">{t('Categories')}</Link></li>
                    <li>{category?.name}</li>
                </ul>
            </div>
            <div className="card w-full bg-base-100 shadow-sm">
                <div className="card-body">
                    {
                        category ? (
                            <h2 className="card-title">{category.name}</h2>
                        ): (
                            <h2 className="card-title skeleton rounded-full h-6 w-50 mb-0.5"></h2>
                        )
                    }
                </div>
            </div>
        </>
    )
}