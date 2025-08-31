import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "../../components/Icon";
import useDebounce from "../../hooks/useDebounce";
import api from "../../api/axios";
import Product from "../../types/product";
import DataTable from "../../components/DataTable";

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    const navigate = useNavigate();
    const { t } = useTranslation();


    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li>{t('Products')}</li>
                </ul>
            </div>
            <DataTable uri="api/products" createLink="products/create" createText="Add product" onDataUpdate={(products) => setProducts(products)}>
                <thead>
                        <tr>
                            <th>{t('SKU')}</th>
                            <th>{t('Name')}</th>
                            <th>{t('Supplier')}</th>
                            <th>{t('Price')}</th>
                            <th>{t('Quantity')}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} onClick={() => { navigate('/product/' + product.id) }} className="hover:bg-base-300 cursor-pointer">
                                <td>{product.sku}</td>
                                <td>{product.name}</td>
                                <td>{product.supplier.name}</td>
                                <td>€ {product.sale_price}</td>
                                <td>{product.quantity}</td>
                                <td>
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