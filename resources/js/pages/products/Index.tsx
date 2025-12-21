import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "../../components/Icon";
import Product from "../../types/product";
import DataTable from "../../components/DataTable";
import ProductStockIndicator from "../../components/ProductStockIndicator";

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
            <DataTable uri="api/products" createLink="/products/create" createText="Add product" onDataUpdate={(products) => setProducts(products)}>
                <thead>
                        <tr>
                            <th></th>
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
                            <tr key={product.id} onClick={() => { navigate('/products/' + product.id) }} className="hover:bg-base-300 cursor-pointer">
                                <td>
                                    <ProductStockIndicator product={product}/>
                                </td>
                                <td>{product.sku}</td>
                                <td>{product.name}</td>
                                <td>{product.supplier.name}</td>
                                <td>€ {product.sale_price}</td>
                                <td>{product.quantity}</td>
                                <td className="flex justify-center">
                                    <Link onClick={e => {e.stopPropagation()}} to={'/products/'+product.id+'/edit'} className="hover:text-primary">
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