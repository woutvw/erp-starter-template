import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "../../components/Icon";
import DataTable from "../../components/DataTable";
import Category from "../../types/category";

export default function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);

    const navigate = useNavigate();
    const { t } = useTranslation();


    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li>{t('Categories')}</li>
                </ul>
            </div>
            <DataTable uri="api/categories" createLink="/categories/create" createText="Add category" onDataUpdate={(categories) => setCategories(categories)}>
                <thead>
                        <tr>
                            <th>{t('Name')}</th>
                            <th className="w-20"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id} onClick={() => { navigate('/categories/' + category.id) }} className="hover:bg-base-300 cursor-pointer">
                                <td>{category.name}</td>
                                <td className="flex justify-center">
                                    <Link onClick={e => {e.stopPropagation()}} to={'/categories/'+category.id+'/edit'} className="hover:text-primary">
                                        <Icon name="pencil" className="w-5"/>
                                    </Link>
                                    <button className="hover:text-error">
                                        <Icon name="bin" className="w-5"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </DataTable>
        </>
    )
}