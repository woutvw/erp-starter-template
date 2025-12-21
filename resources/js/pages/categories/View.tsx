import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useTranslation } from "react-i18next";
import Category from "../../types/category";
import DataTable from "../../components/DataTable";
import Product from "../../types/product";
import ProductStockIndicator from "../../components/ProductStockIndicator";

export default function CategoryView() {
    const { id } = useParams();
    const [category, setCategory] = useState<Category>();
    const [products, setProducts] = useState<Product[]>([]);

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
            <div className="card w-full bg-base-100 shadow-sm mb-2">
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
            <DataTable uri={'api/products?category_id=' + id} onDataUpdate={(products) => setProducts(products)}>
                <thead>
                    <tr>
                        <th></th>
                        <th>{t('SKU')}</th>
                        <th>{t('Name')}</th>
                        <th>{t('Supplier')}</th>
                        <th>{t('Price')}</th>
                        <th>{t('Quantity')}</th>
                    </tr>
                </thead>
                <tbody>
                    {category && products.map(product => (
                        <tr key={product.id} onClick={() => { navigate('/products/' + product.id) }} className="cursor-pointer hover:bg-base-300">
                            <td>
                                <ProductStockIndicator product={product}/>
                            </td>
                            <td>{product.sku}</td>
                            <td>{product.name}</td>
                            <td>{product.supplier.name}</td>
                            <td>€ {product.sale_price}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </DataTable>
        </>
    )
}